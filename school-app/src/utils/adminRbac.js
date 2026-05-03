export const ADMIN_ROLES = /** @type {const} */ ({
  ADMIN: "admin",
  STAFF: "staff",
});

/** @typedef {"admin"|"staff"} AdminRole */

/**
 * @typedef {{
 *  pages?: Partial<Record<string, boolean>>,
 *  students?: { view?: boolean, add?: boolean, edit?: boolean, delete?: boolean },
 *  fees?: { history?: boolean, structure?: boolean },
 *  requests?: { uniform?: boolean, certificate?: boolean },
 *  events?: { manage?: boolean },
 *  staff?: { manage?: boolean },
 * }} AdminPermissions
 *
 * @typedef {{ role: AdminRole, perms?: AdminPermissions }} AdminAccess
 */

/** @type {Record<string, AdminRole>} */
export const DEFAULT_ADMIN_ROLE_BY_EMAIL = {};

/** @type {Record<string, AdminRole>} */
export const DEFAULT_ADMIN_ROLE_BY_UID = {};

export function normalizeAdminRole(role) {
  const r = String(role || "").trim().toLowerCase();
  if (r === ADMIN_ROLES.ADMIN) return ADMIN_ROLES.ADMIN;
  if (r === ADMIN_ROLES.STAFF) return ADMIN_ROLES.STAFF;
  return ADMIN_ROLES.ADMIN;
}

export function normalizeAdminAccess(accessOrRole) {
  if (typeof accessOrRole === "string") {
    return { role: normalizeAdminRole(accessOrRole), perms: {} };
  }
  const role = normalizeAdminRole(accessOrRole?.role);
  const perms = accessOrRole?.perms && typeof accessOrRole.perms === "object" ? accessOrRole.perms : {};
  return { role, perms };
}

function roleDefaults(role) {
  const r = normalizeAdminRole(role);
  if (r === ADMIN_ROLES.STAFF) {
    // Staff is explicit-access: default deny for everything unless granted.
    return /** @type {AdminPermissions} */ ({
      pages: {},
      students: { view: false, add: false, edit: false, delete: false },
      fees: { history: false, structure: false },
      requests: { uniform: false, certificate: false },
      events: { manage: false },
      staff: { manage: false },
    });
  }
  // Admin: allow everything by default
  return /** @type {AdminPermissions} */ ({
    pages: {},
    students: { view: true, add: true, edit: true, delete: true },
    fees: { history: true, structure: true },
    requests: { uniform: true, certificate: true },
    events: { manage: true },
    staff: { manage: true },
  });
}

export function resolvePermission(accessOrRole, key, defaultValue = true) {
  const access = normalizeAdminAccess(accessOrRole);
  const defaults = roleDefaults(access.role);
  const baseDefault = access.role === ADMIN_ROLES.STAFF && defaultValue === true ? false : defaultValue;
  if (access.role === ADMIN_ROLES.ADMIN) return true;

  // explicit pages override
  if (key?.startsWith("page:")) {
    const pageId = key.slice("page:".length);
    const explicit = access.perms?.pages?.[pageId];
    if (explicit === true || explicit === false) return explicit;
    const def = defaults.pages?.[pageId];
    if (def === true || def === false) return def;
    return baseDefault;
  }

  // action keys
  const lookup = (obj, path) =>
    path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);

  // Allow flat alias flags in perms for easier setup screens / backward compatibility.
  // Example: can_student_registration, can_edit_student, etc.
  const flatAliasByKey = {
    "students.add": "can_student_registration",
    "students.edit": "can_edit_student",
    "students.delete": "can_delete_student",
    "fees.structure": "can_add_fee_structure",
    "requests.certificate": "can_upload_certificates",
  };
  const flatAlias = flatAliasByKey[key];
  if (flatAlias) {
    const flatValue = access.perms?.[flatAlias];
    if (flatValue === true || flatValue === false) return flatValue;
  }

  const explicit = lookup(access.perms || {}, key);
  if (explicit === true || explicit === false) return explicit;
  const def = lookup(defaults || {}, key);
  if (def === true || def === false) return def;
  return baseDefault;
}

export function canAdminAction(accessOrRole, domain, action, defaultValue = true) {
  const key = `${domain}.${action}`;
  return resolvePermission(accessOrRole, key, defaultValue);
}

/**
 * Page access control for Admin panel sections.
 * If user is signed in as admin but role is missing, default to ADMIN.
 */
export function canAccessAdminPage(adminRole, pageId) {
  const access = normalizeAdminAccess(adminRole);
  const page = String(pageId || "").trim();

  // Common access
  if (page === "dashboard") return true;

  // Explicit page overrides (optional)
  const explicitPage = resolvePermission(access, `page:${page}`, undefined);
  if (explicitPage === true || explicitPage === false) return explicitPage;

  // Students
  if (page === "add") return resolvePermission(access, "students.add", true);
  if (page === "view") return resolvePermission(access, "students.view", true);

  // Fees
  if (page === "fees-history")
    return resolvePermission(access, "fees.history", true);
  if (page === "fee-structure") return resolvePermission(access, "fees.structure", access.role === ADMIN_ROLES.ADMIN);

  // Requests & events
  if (page === "events") return resolvePermission(access, "events.manage", true);
  if (page === "uniform") return resolvePermission(access, "requests.uniform", true);
  if (page === "certificate") return resolvePermission(access, "requests.certificate", true);

  // Unknown pages: admin-only
  return access.role === ADMIN_ROLES.ADMIN;
}

export function roleLabel(adminRole) {
  const r = normalizeAdminAccess(adminRole).role;
  if (r === ADMIN_ROLES.ADMIN) return "Administrator";
  if (r === ADMIN_ROLES.STAFF) return "Staff";
  return "Administrator";
}

