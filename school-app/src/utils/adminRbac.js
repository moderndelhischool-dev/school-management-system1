export const ADMIN_ROLES = /** @type {const} */ ({
  ADMIN: "admin",
  ACCOUNTANT: "accountant",
  CLERK: "clerk",
});

/** @typedef {"admin"|"accountant"|"clerk"} AdminRole */

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
  if (r === ADMIN_ROLES.ACCOUNTANT) return ADMIN_ROLES.ACCOUNTANT;
  if (r === ADMIN_ROLES.CLERK) return ADMIN_ROLES.CLERK;
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
  if (r === ADMIN_ROLES.ACCOUNTANT) {
    return /** @type {AdminPermissions} */ ({
      pages: { dashboard: true, "fees-history": true },
      students: { view: false, add: false, edit: false, delete: false },
      fees: { history: true, structure: false },
      requests: { uniform: false, certificate: false },
      events: { manage: false },
      staff: { manage: false },
    });
  }
  if (r === ADMIN_ROLES.CLERK) {
    return /** @type {AdminPermissions} */ ({
      pages: {
        dashboard: true,
        events: true,
        add: true,
        view: true,
        uniform: true,
        certificate: true,
      },
      students: { view: true, add: true, edit: true, delete: false },
      fees: { history: false, structure: false },
      requests: { uniform: true, certificate: true },
      events: { manage: true },
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

  // explicit pages override
  if (key?.startsWith("page:")) {
    const pageId = key.slice("page:".length);
    const explicit = access.perms?.pages?.[pageId];
    if (explicit === true || explicit === false) return explicit;
    const def = defaults.pages?.[pageId];
    if (def === true || def === false) return def;
    return defaultValue;
  }

  // action keys
  const lookup = (obj, path) =>
    path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);

  const explicit = lookup(access.perms || {}, key);
  if (explicit === true || explicit === false) return explicit;
  const def = lookup(defaults || {}, key);
  if (def === true || def === false) return def;
  return defaultValue;
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

  // Staff access manager (admin only by default)
  if (page === "staff-access") {
    return resolvePermission(access, "staff.manage", access.role === ADMIN_ROLES.ADMIN);
  }

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
  if (r === ADMIN_ROLES.ACCOUNTANT) return "Accountant";
  if (r === ADMIN_ROLES.CLERK) return "Clerk";
  return "Administrator";
}

