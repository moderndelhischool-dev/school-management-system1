import { doc, runTransaction, Timestamp } from "firebase/firestore";

const SESSIONS = "academicSessions";
/** Under `counters/registrationBySession/sessions/{sessionId}` — sequence + year prefix. */
const REG_BY_SESSION = "registrationBySession";
const REG_SESSIONS = "sessions";

const MAX_SEQ_PER_SESSION = 999999;

/**
 * Derive a 4-digit calendar year for this session (registration prefix).
 * Prefer session start date, then session id / name leading digits.
 */
function fallbackYearFromSession(sessionSnap, sessionId) {
  if (sessionSnap?.exists()) {
    const data = sessionSnap.data() || {};
    const ts = data.sessionStartDate;
    if (ts && typeof ts.toDate === "function") {
      return ts.toDate().getFullYear();
    }
    if (ts && typeof ts.seconds === "number") {
      return new Date(ts.seconds * 1000).getFullYear();
    }
    const name = String(data.name || "");
    const mName = name.match(/^(\d{4})/);
    if (mName) return parseInt(mName[1], 10);
  }
  const id = String(sessionId || "");
  const mId = id.match(/^(\d{4})/);
  if (mId) return parseInt(mId[1], 10);
  return new Date().getFullYear();
}

function fourDigitYear(y) {
  const n = Math.floor(Number(y));
  if (!Number.isFinite(n)) return String(new Date().getFullYear()).padStart(4, "0").slice(-4);
  const clamped = Math.min(9999, Math.max(1000, n));
  return String(clamped).padStart(4, "0");
}

/**
 * @param {import("firebase/firestore").Firestore} db
 * @param {{ sessionId: string }} options
 * @returns {Promise<string>}
 */
export async function allocateRegistrationNumber(db, { sessionId }) {
  const sid = String(sessionId || "").trim();
  if (!sid) {
    throw new Error("Active academic session is required to assign a registration number.");
  }

  const sessionRef = doc(db, SESSIONS, sid);
  const counterRef = doc(
    db,
    "counters",
    REG_BY_SESSION,
    REG_SESSIONS,
    sid,
  );

  const now = Timestamp.now();

  return runTransaction(db, async (transaction) => {
    const sessionSnap = await transaction.get(sessionRef);
    if (!sessionSnap.exists()) {
      throw new Error(`Academic session "${sid}" was not found.`);
    }

    const counterSnap = await transaction.get(counterRef);
    let next = 1;
    let yearPrefix;

    if (counterSnap.exists()) {
      const c = counterSnap.data() || {};
      next = Number(c.next);
      if (!Number.isFinite(next) || next < 1) next = 1;
      yearPrefix = fourDigitYear(c.yearPrefix ?? fallbackYearFromSession(sessionSnap, sid));
    } else {
      yearPrefix = fourDigitYear(fallbackYearFromSession(sessionSnap, sid));
    }

    if (next > MAX_SEQ_PER_SESSION) {
      throw new Error("Registration sequence for this session is full.");
    }

    const registrationNo = `${yearPrefix}${String(next).padStart(6, "0")}`;

    transaction.set(
      counterRef,
      {
        next: next + 1,
        yearPrefix,
        academicSessionId: sid,
        updatedAt: now,
      },
      { merge: true },
    );

    return registrationNo;
  });
}
