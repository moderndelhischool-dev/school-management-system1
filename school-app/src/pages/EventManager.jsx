import AdminCalendar from "./AdminCalendar";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

function EventManager({ darkMode }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      //   className="event-main-card"
      style={{
        background: darkMode ? "#0f172a" : "#ffffff",
        boxShadow: darkMode
          ? "0 20px 50px rgba(0,0,0,0.6)"
          : "0 20px 50px rgba(124,58,237,0.15)",
      }}
    >
      {/* Header */}
      {/* <div className="event-header">
       
      </div> */}

      {/* Layout */}
      <div className="event-content">
        {/* Calendar */}
        <div className="calendar-section">
          <AdminCalendar darkMode={darkMode} />
        </div>

        {/* Right Panel */}
        <div
          className="right-panel"
          style={{
            background: darkMode ? "#1e293b" : "#f9fafb",
            color: darkMode ? "#ffffff" : "#111827",
          }}
        >
          <h6 className="mb-3 fw-bold">Upcoming Events</h6>

          {events.length === 0 && (
            <p style={{ opacity: 0.7 }}>No events available</p>
          )}

          {events.slice(0, 6).map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-dot"></div>
              <div>
                <div className="fw-semibold">{event.title}</div>
                <small style={{ opacity: 0.7 }}>{event.start}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`

        .event-main-card {
          border-radius: 20px;
          padding: 30px;
          transition: 0.3s ease;
        }

        .event-content {
          display: flex;
          gap: 30px;
        }

        .calendar-section {
          flex: 2;
        }

        .right-panel {
          flex: 1;
          padding: 20px;
          border-radius: 18px;
          transition: 0.3s ease;
        }

        .event-item {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 10px;
          border-radius: 12px;
          transition: 0.3s ease;
        }

        .event-item:hover {
          background: rgba(124,58,237,0.15);
          transform: translateX(4px);
        }

        .event-dot {
          width: 10px;
          height: 10px;
          background: #7c3aed;
          border-radius: 50%;
        }

        @media (max-width: 992px) {
          .event-content {
            flex-direction: column;
          }
        }

      `}</style>
    </div>
  );
}

export default EventManager;
