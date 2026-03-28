import AdminCalendar from "./AdminCalendar";
import { useState, useEffect, useMemo } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function EventManager({ darkMode }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 🔥 MASTER CLEANUP: Database se purane events ko permanently delete karne ke liye
    const performDatabaseCleanup = async () => {
      try {
        const today = new Date();
        // Current month ki 1st date (March 1, 2026) ka timestamp
        const startOfCurrentMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
        ).getTime();

        const querySnapshot = await getDocs(collection(db, "events"));

        querySnapshot.forEach(async (d) => {
          const eventData = d.data();
          const eventDate = new Date(eventData.start).getTime();

          // 🚨 Agar event ki date current month se pehle ki hai (e.g. Feb), toh delete kar do
          if (eventDate < startOfCurrentMonth) {
            await deleteDoc(doc(db, "events", d.id));
            console.log(`Deleted Outdated Event: ${eventData.title}`);
          }
        });
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    };

    // Pehle cleanup chalao
    performDatabaseCleanup();

    // Phir live events load karo (Snapshot se calendar aur list dono update honge)
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  /* ✅ Side List mein sirf filtered (current/future) events dikhane ke liye */
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const startOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    ).getTime();

    return [...events]
      .filter((e) => new Date(e.start).getTime() >= startOfCurrentMonth)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 10);
  }, [events]);

  return (
    <div
      className="event-main-wrapper"
      style={{
        background: darkMode
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "linear-gradient(135deg,#ffffff,#F4F6F8)",
        borderRadius: "22px",
        padding: "20px",
        boxShadow: darkMode
          ? "0 25px 60px rgba(0,0,0,0.5)"
          : "0 25px 60px rgba(15,76,108,0.12)",
      }}
    >
      <div className="event-content">
        {/* 📅 CALENDAR SECTION (Database se delete hote hi ye gayab ho jayenge) */}
        <div className="calendar-section">
          <AdminCalendar darkMode={darkMode} />
        </div>

        {/* 📋 LIST PANEL */}
        <div
          className="right-panel"
          style={{
            background: darkMode ? "#111827" : "#ffffff",
            color: darkMode ? "#f1f5f9" : "#0F4C6C",
            border: darkMode ? "1px solid #334155" : "1px solid #E5E7EB",
            borderRadius: "18px",
            padding: "20px",
            minWidth: "330px",
          }}
        >
          <h6 className="mb-4 fw-bold d-flex align-items-center gap-2">
            <span style={{ color: "#D4A24C", fontSize: "1.2rem" }}>🗓️</span>{" "}
            Current Month Events
          </h6>

          <div className="event-list-container">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-5 opacity-50">
                <p>No events for March 2026</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="event-item-card fade-in mb-3">
                  <div className="event-info">
                    <div className="event-title-row">
                      <div className="event-indicator"></div>
                      <span className="fw-semibold">{event.title}</span>
                    </div>
                    <div className="event-meta">
                      <small className="opacity-75">
                        📅{" "}
                        {new Date(event.start).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .event-content { display: flex; gap: 25px; }
        .calendar-section { flex: 2; }
        .right-panel { flex: 1; max-height: 600px; overflow-y: auto; }

        .event-item-card {
          background: ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,76,108,0.05)"};
          padding: 14px 16px;
          border-radius: 12px;
          border-left: 5px solid #D4A24C;
          transition: 0.3s ease;
        }

        .event-item-card:hover {
          transform: translateX(8px);
          background: ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(15,76,108,0.1)"};
        }

        .event-title-row { display: flex; align-items: center; gap: 10px; }
        .event-indicator { width: 8px; height: 8px; border-radius: 50%; background: #D4A24C; }
        .event-meta { margin-left: 18px; font-size: 0.82rem; margin-top: 2px; }

        .fade-in { animation: slideIn 0.4s ease-out forwards; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(15px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 992px) {
          .event-content { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

export default EventManager;
