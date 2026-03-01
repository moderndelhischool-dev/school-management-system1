// import AdminCalendar from "./AdminCalendar";
// import { useState, useEffect } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// function EventManager({ darkMode }) {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setEvents(data);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div
//       //   className="event-main-card"
//       style={{
//         background: darkMode ? "#0f172a" : "#ffffff",
//         boxShadow: darkMode
//           ? "0 20px 50px rgba(0,0,0,0.6)"
//           : "0 20px 50px rgba(124,58,237,0.15)",
//       }}
//     >
//       {/* Header */}
//       {/* <div className="event-header">

//       </div> */}

//       {/* Layout */}
//       <div className="event-content">
//         {/* Calendar */}
//         <div className="calendar-section">
//           <AdminCalendar darkMode={darkMode} />
//         </div>

//         {/* Right Panel */}
//         <div
//           className="right-panel"
//           style={{
//             background: darkMode ? "#1e293b" : "#f9fafb",
//             color: darkMode ? "#ffffff" : "#111827",
//           }}
//         >
//           <h6 className="mb-3 fw-bold">Upcoming Events</h6>

//           {events.length === 0 && (
//             <p style={{ opacity: 0.7 }}>No events available</p>
//           )}

//           {events.slice(0, 6).map((event) => (
//             <div key={event.id} className="event-item">
//               <div className="event-dot"></div>
//               <div>
//                 <div className="fw-semibold">{event.title}</div>
//                 <small style={{ opacity: 0.7 }}>{event.start}</small>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`

//         .event-main-card {
//           border-radius: 20px;
//           padding: 30px;
//           transition: 0.3s ease;
//         }

//         .event-content {
//           display: flex;
//           gap: 30px;
//         }

//         .calendar-section {
//           flex: 2;
//         }

//         .right-panel {
//           flex: 1;
//           padding: 20px;
//           border-radius: 18px;
//           transition: 0.3s ease;
//         }

//         .event-item {
//           display: flex;
//           gap: 10px;
//           align-items: center;
//           padding: 10px;
//           border-radius: 12px;
//           transition: 0.3s ease;
//         }

//         .event-item:hover {
//           background: rgba(124,58,237,0.15);
//           transform: translateX(4px);
//         }

//         .event-dot {
//           width: 10px;
//           height: 10px;
//           background: #7c3aed;
//           border-radius: 50%;
//         }

//         @media (max-width: 992px) {
//           .event-content {
//             flex-direction: column;
//           }
//         }

//       `}</style>
//     </div>
//   );
// }

// export default EventManager;
import AdminCalendar from "./AdminCalendar";
import { useState, useEffect, useMemo } from "react";
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

  /* ✅ Only future events sorted by date */
  const upcomingEvents = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);

    return events
      .filter((e) => new Date(e.start).getTime() >= today)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 6);
  }, [events]);

  return (
    <div
      // className="event-main-card"
      style={{
        background: darkMode
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "linear-gradient(135deg,#ffffff,#F4F6F8)",
        boxShadow: darkMode
          ? "0 25px 60px rgba(0,0,0,0.6)"
          : "0 25px 60px rgba(15,76,108,0.15)",
      }}
    >
      <div className="event-content">
        {/* Calendar */}
        <div className="calendar-section">
          <AdminCalendar darkMode={darkMode} />
        </div>

        {/* Right Panel */}
        <div
          className="right-panel"
          style={{
            background: darkMode ? "#1e293b" : "#ffffff",
            color: darkMode ? "#f1f5f9" : "#0F4C6C",
            border: darkMode ? "1px solid #334155" : "1px solid #E5E7EB",
          }}
        >
          <h6 className="mb-3 fw-bold panel-title">📅 Upcoming Events</h6>

          {upcomingEvents.length === 0 && (
            <p className="no-event-text">No upcoming events</p>
          )}

          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-item fade-in">
              <div className="event-dot"></div>
              <div>
                <div className="fw-semibold">{event.title}</div>
                <small className="event-date">
                  {new Date(event.start).toLocaleDateString("en-IN")}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`

/* ===== MAIN CARD ===== */
.event-main-card {
  border-radius:22px;
  padding:28px;
  transition:0.3s ease;
}

/* ===== LAYOUT ===== */
.event-content {
  display:flex;
  gap:30px;
}

.calendar-section {
  flex:2;
}

.right-panel {
  flex:1;
  padding:22px;
  border-radius:18px;
  transition:0.3s ease;
}

.right-panel:hover {
  transform:translateY(-4px);
}

/* ===== TITLE ===== */
.panel-title {
  color:#0F4C6C;
}

body.dark-mode .panel-title {
  color:#D4A24C;
}

/* ===== NO EVENT ===== */
.no-event-text {
  opacity:0.7;
}

body.dark-mode .no-event-text {
  opacity:0.6;
}

/* ===== EVENT ITEM ===== */
.event-item {
  display:flex;
  gap:12px;
  align-items:center;
  padding:12px;
  border-radius:14px;
  transition:0.3s ease;
}

.event-item:hover {
  background:rgba(212,162,76,0.12);
  transform:translateX(6px);
}

/* ===== SMOOTH FADE ANIMATION ===== */
.fade-in {
  animation:fadeSlide 0.4s ease;
}

@keyframes fadeSlide {
  from { opacity:0; transform:translateY(8px); }
  to { opacity:1; transform:translateY(0); }
}

/* ===== DOT ===== */
.event-dot {
  width:10px;
  height:10px;
  background:#D4A24C;
  border-radius:50%;
  box-shadow:0 0 10px rgba(212,162,76,0.6);
}

/* ===== DATE ===== */
.event-date {
  opacity:0.7;
}

body.dark-mode .event-date {
  opacity:0.8;
}

/* ===== RESPONSIVE ===== */
@media (max-width:992px){
  .event-content{
    flex-direction:column;
  }
}

`}</style>
    </div>
  );
}

export default EventManager;
