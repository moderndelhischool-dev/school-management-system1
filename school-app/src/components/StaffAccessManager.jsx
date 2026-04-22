import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ADMIN_ROLES, normalizeAdminRole, roleLabel } from "../utils/adminRbac";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";

const ROLE_OPTIONS = [
  { id: ADMIN_ROLES.ADMIN, label: "Administrator" },
  { id: ADMIN_ROLES.ACCOUNTANT, label: "Accountant" },
  { id: ADMIN_ROLES.CLERK, label: "Clerk" },
];

function emptyPerms() {
  return {
    students: { view: true, add: true, edit: true, delete: false },
    fees: { history: true, structure: false },
    events: { manage: true },
    requests: { uniform: true, certificate: true },
    staff: { manage: false },
  };
}

function StaffAccessManager({ darkMode }) {
  const [loading, setLoading] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [editRole, setEditRole] = useState(ADMIN_ROLES.CLERK);
  const [perms, setPerms] = useState(emptyPerms());
  const [msg, setMsg] = useState("");
  const [msgTone, setMsgTone] = useState("success");

  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [showCreatePerms, setShowCreatePerms] = useState(true);

  const getSecondaryAuth = () => {
    const name = "staffCreator";
    const existing = getApps().find((a) => a.name === name);
    const app = existing || initializeApp(getApp().options, name);
    return getAuth(app);
  };

  const generateTempPassword = () => {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    let out = "";
    for (let i = 0; i < 12; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
    return `Tmp@${out}`;
  };

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "users"), where("role", "==", "admin")),
      );
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      rows.sort((a, b) => String(a.email || "").localeCompare(String(b.email || "")));
      setAdminUsers(rows);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const setToggle = (path, value) => {
    setPerms((prev) => {
      const next = structuredClone(prev);
      const [group, key] = path.split(".");
      next[group] = next[group] || {};
      next[group][key] = value;
      return next;
    });
  };

  const searchUserByEmail = async () => {
    const email = String(searchEmail || "").trim().toLowerCase();
    if (!email) return;
    setMsg("");
    setFoundUser(null);
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "users"), where("email", "==", email)),
      );
      if (snap.empty) {
        setMsgTone("error");
        setMsg("No user found with this email. Ask them to register/sign-in once first.");
        return;
      }
      const d = snap.docs[0];
      const data = d.data() || {};
      const role = normalizeAdminRole(data.adminRole || data.adminAccess?.role || data.staffRole || "clerk");
      const p = data.adminAccess?.perms && typeof data.adminAccess.perms === "object"
        ? data.adminAccess.perms
        : emptyPerms();

      setFoundUser({ uid: d.id, ...data });
      setEditRole(role);
      setPerms({
        ...emptyPerms(),
        ...p,
        students: { ...emptyPerms().students, ...(p.students || {}) },
        fees: { ...emptyPerms().fees, ...(p.fees || {}) },
        events: { ...emptyPerms().events, ...(p.events || {}) },
        requests: { ...emptyPerms().requests, ...(p.requests || {}) },
        staff: { ...emptyPerms().staff, ...(p.staff || {}) },
      });
      setMsgTone("success");
      setMsg("User found. You can now assign access.");
    } catch (e) {
      console.error(e);
      setMsgTone("error");
      setMsg("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAccess = async () => {
    if (!foundUser?.uid) return;
    setLoading(true);
    setMsg("");
    try {
      await updateDoc(doc(db, "users", foundUser.uid), {
        role: "admin",
        adminRole: editRole,
        adminAccess: {
          role: editRole,
          perms,
        },
        updatedAt: Timestamp.now(),
      });
      setMsgTone("success");
      setMsg("Access updated successfully.");
      await loadAdmins();
    } catch (e) {
      console.error(e);
      setMsgTone("error");
      setMsg("Could not update access. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  const createStaffAccount = async () => {
    const name = String(createName || "").trim();
    const email = String(createEmail || "").trim().toLowerCase();
    const password = String(createPassword || "").trim();
    if (!name || !email || !password) {
      setMsgTone("error");
      setMsg("Name, email and temporary password are required.");
      return;
    }
    if (password.length < 8) {
      setMsgTone("error");
      setMsg("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setMsg("");
    try {
      const secondaryAuth = getSecondaryAuth();
      const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const newUser = cred.user;
      await updateProfile(newUser, { displayName: name });

      // Create / upsert Firestore profile
      await setDoc(
        doc(db, "users", newUser.uid),
        {
          name,
          email,
          role: "admin",
          adminRole: editRole,
          adminAccess: { role: editRole, perms },
          mustChangePassword: true,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );

      setMsgTone("success");
      setMsg(
        `Staff account created: ${email}. Share the temporary password securely and ask them to change it after first sign-in.`,
      );

      // Auto-load into editor
      setFoundUser({ uid: newUser.uid, name, email, role: "admin", adminRole: editRole, adminAccess: { role: editRole, perms } });
      setSearchEmail(email);
      await loadAdmins();
    } catch (e) {
      console.error(e);
      setMsgTone("error");
      setMsg(
        e?.code === "auth/email-already-in-use"
          ? "This email is already registered. Use Search to assign access."
          : "Could not create staff account. Check Firebase Auth / rules.",
      );
    } finally {
      setLoading(false);
    }
  };

  const revokeAdminAccess = async (uid) => {
    if (!uid) return;
    if (!window.confirm("Remove admin access for this user?")) return;
    setLoading(true);
    setMsg("");
    try {
      await updateDoc(doc(db, "users", uid), {
        role: "user",
        adminRole: "",
        adminAccess: {},
        updatedAt: Timestamp.now(),
      });
      setMsgTone("success");
      setMsg("Admin access removed.");
      await loadAdmins();
    } catch (e) {
      console.error(e);
      setMsgTone("error");
      setMsg("Could not remove access. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  const title = useMemo(() => {
    return foundUser?.email ? `Access for ${foundUser.email}` : "Staff & Access";
  }, [foundUser?.email]);

  return (
    <div className="p-2">
      <h4 className="fw-bold mb-3">{title}</h4>

      {msg ? (
        <div className={`alert ${msgTone === "error" ? "alert-danger" : "alert-success"}`}>
          {msg}
        </div>
      ) : null}

      <div className="card p-3 mb-3" style={{ borderRadius: 16 }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <h5 className="mb-0 fw-bold">Create staff account</h5>
          <div className="d-flex gap-2 flex-wrap">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setCreatePassword(generateTempPassword())}
              disabled={loading}
            >
              Generate password
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowCreatePerms((v) => !v)}
              disabled={loading}
            >
              {showCreatePerms ? "Hide access" : "Show access"}
            </button>
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Full name</label>
            <input
              className="form-control"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder="Staff member name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Email</label>
            <input
              className="form-control"
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
              placeholder="staff@example.com"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Temporary password</label>
            <input
              className="form-control font-monospace"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
              placeholder="Min 8 characters"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Staff role</label>
            <select
              className="form-select"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              disabled={loading}
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            <div className="text-muted small mt-1">
              Role sets defaults; customize access below.
            </div>
          </div>
        </div>

        {showCreatePerms ? (
          <>
            <hr className="my-3" />
            <div className="row g-3">
              <div className="col-md-6">
                <div className="fw-bold mb-2">Students</div>
                {[
                  ["students.view", "View"],
                  ["students.add", "Add"],
                  ["students.edit", "Edit"],
                  ["students.delete", "Delete"],
                ].map(([k, label]) => {
                  const [g, key] = k.split(".");
                  return (
                    <div className="form-check" key={`create_${k}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!!perms[g]?.[key]}
                        onChange={(e) => setToggle(k, e.target.checked)}
                        id={`create_perm_${k}`}
                        disabled={loading}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`create_perm_${k}`}
                      >
                        {label}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="col-md-6">
                <div className="fw-bold mb-2">Fees</div>
                {[
                  ["fees.history", "Fee Collection History"],
                  ["fees.structure", "Fee Structure (edit)"],
                ].map(([k, label]) => {
                  const [g, key] = k.split(".");
                  return (
                    <div className="form-check" key={`create_${k}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!!perms[g]?.[key]}
                        onChange={(e) => setToggle(k, e.target.checked)}
                        id={`create_perm_${k}`}
                        disabled={loading}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`create_perm_${k}`}
                      >
                        {label}
                      </label>
                    </div>
                  );
                })}

                <div className="fw-bold mt-3 mb-2">Requests & events</div>
                {[
                  ["events.manage", "Event Management"],
                  ["requests.uniform", "Uniform Requests"],
                  ["requests.certificate", "Certificates"],
                ].map(([k, label]) => {
                  const [g, key] = k.split(".");
                  return (
                    <div className="form-check" key={`create_${k}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!!perms[g]?.[key]}
                        onChange={(e) => setToggle(k, e.target.checked)}
                        id={`create_perm_${k}`}
                        disabled={loading}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`create_perm_${k}`}
                      >
                        {label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </>
        ) : null}

        <div className="d-flex gap-2 align-items-center justify-content-end flex-wrap mt-3">
          
          <button
            type="button"
            className="btn btn-primary"
            onClick={createStaffAccount}
            disabled={loading}
          >
            {loading ? "Creating…" : "Create staff account"}
          </button>
        </div>
      </div>

      <div className="card p-3 mb-3" style={{ borderRadius: 16 }}>
        <div className="row g-2 align-items-end">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Find user by email</label>
            <input
              className="form-control"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="staff@example.com"
            />
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={searchUserByEmail}
              disabled={loading}
            >
              {loading ? "Searching…" : "Search"}
            </button>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setFoundUser(null);
                setMsg("");
              }}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </div>
        
      </div>

      {foundUser ? (
        <div className="card p-3 mb-4" style={{ borderRadius: 16 }}>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="text-muted small">User</div>
              <div className="fw-semibold">{foundUser.name || "—"}</div>
              <div className="text-muted small">{foundUser.email}</div>
              <div className="text-muted small">UID: {foundUser.uid}</div>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Staff role</label>
              <select
                className="form-select"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
              <div className="text-muted small mt-1">
                Role controls defaults; permissions below can be customized.
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={saveAccess}
                disabled={loading}
              >
                {loading ? "Saving…" : "Save access"}
              </button>
            </div>
          </div>

          <hr className="my-3" />

          <div className="row g-3">
            <div className="col-md-6">
              <div className="fw-bold mb-2">Students</div>
              {[
                ["students.view", "View"],
                ["students.add", "Add"],
                ["students.edit", "Edit"],
                ["students.delete", "Delete"],
              ].map(([k, label]) => {
                const [g, key] = k.split(".");
                return (
                  <div className="form-check" key={k}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={!!perms[g]?.[key]}
                      onChange={(e) => setToggle(k, e.target.checked)}
                      id={`perm_${k}`}
                    />
                    <label className="form-check-label" htmlFor={`perm_${k}`}>
                      {label}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="col-md-6">
              <div className="fw-bold mb-2">Fees</div>
              {[
                ["fees.history", "Fee Collection History"],
                ["fees.structure", "Fee Structure (edit)"],
              ].map(([k, label]) => {
                const [g, key] = k.split(".");
                return (
                  <div className="form-check" key={k}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={!!perms[g]?.[key]}
                      onChange={(e) => setToggle(k, e.target.checked)}
                      id={`perm_${k}`}
                    />
                    <label className="form-check-label" htmlFor={`perm_${k}`}>
                      {label}
                    </label>
                  </div>
                );
              })}

              <div className="fw-bold mt-3 mb-2">Requests & events</div>
              {[
                ["events.manage", "Event Management"],
                ["requests.uniform", "Uniform Requests"],
                ["requests.certificate", "Certificates"],
              ].map(([k, label]) => {
                const [g, key] = k.split(".");
                return (
                  <div className="form-check" key={k}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={!!perms[g]?.[key]}
                      onChange={(e) => setToggle(k, e.target.checked)}
                      id={`perm_${k}`}
                    />
                    <label className="form-check-label" htmlFor={`perm_${k}`}>
                      {label}
                    </label>
                  </div>
                );
              })}

              <div className="fw-bold mt-3 mb-2">Staff</div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={!!perms.staff?.manage}
                  onChange={(e) => setToggle("staff.manage", e.target.checked)}
                  id="perm_staff_manage"
                />
                <label className="form-check-label" htmlFor="perm_staff_manage">
                  Manage staff access
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="card p-3" style={{ borderRadius: 16 }}>
        <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <h5 className="mb-0 fw-bold">Current admin users</h5>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={loadAdmins}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        <div className="table-responsive mt-3">
          <table className={`table ${darkMode ? "table-dark" : ""}`}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.email || "—"}</td>
                  <td>{u.name || "—"}</td>
                  <td>{roleLabel(u.adminRole || u.adminAccess?.role || u.role)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      type="button"
                      onClick={() => {
                        setSearchEmail(u.email || "");
                        setFoundUser({ uid: u.id, ...u });
                        setEditRole(normalizeAdminRole(u.adminRole || u.adminAccess?.role || "clerk"));
                        const p = u.adminAccess?.perms || emptyPerms();
                        setPerms({
                          ...emptyPerms(),
                          ...p,
                          students: { ...emptyPerms().students, ...(p.students || {}) },
                          fees: { ...emptyPerms().fees, ...(p.fees || {}) },
                          events: { ...emptyPerms().events, ...(p.events || {}) },
                          requests: { ...emptyPerms().requests, ...(p.requests || {}) },
                          staff: { ...emptyPerms().staff, ...(p.staff || {}) },
                        });
                      }}
                    >
                      Edit access
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => revokeAdminAccess(u.id)}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
              {!adminUsers.length && (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    No admin users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffAccessManager;

