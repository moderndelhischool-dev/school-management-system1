// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// function UserCalendar() {
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

//   const getEventColor = (type) => {
//     switch (type) {
//       case "Exam":
//         return "#ef4444";
//       case "Holiday":
//         return "#a855f7";
//       case "Function":
//         return "#9333ea";
//       case "Meeting":
//         return "#c084fc";
//       default:
//         return "#64748b";
//     }
//   };

//   return (
//     <div
//       style={{
//         background: "linear-gradient(180deg,#4c1d95,#7c3aed)", // 👈 SAME AS SIDEBAR
//         borderRadius: "20px",
//         padding: "12px",
//         boxShadow: "0 10px 35px rgba(0,0,0,0.4)",
//         transition: "0.3s ease",
//       }}
//     >
//       <h6 className="fw-semibold mb-3" style={{ color: "#ffffff" }}>
//         📅 School Calendar
//       </h6>

//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left: "prev,next",
//           center: "title",
//           right: "",
//         }}
//         height={390}
//         fixedWeekCount={false}
//         dayMaxEvents={1}
//         events={events.map((e) => ({
//           ...e,
//           backgroundColor: getEventColor(e.type),
//           borderColor: "transparent",
//           textColor: "#ffffff",
//         }))}
//       />

//       <style>{`
//         .fc {
//           font-size: 12px;
//         }

//         .fc-theme-standard td,
//         .fc-theme-standard th {
//           border-color: rgba(255,255,255,0.15) !important;
//         }

//         .fc .fc-daygrid-day {
//           background: rgba(0,0,0,0.15) !important;
//           transition: 0.25s ease;
//           border-radius: 8px;
//         }

//         .fc .fc-daygrid-day:hover {
//           background: rgba(0,0,0,0.25) !important;
//           transform: translateY(-3px);
//         }

//         .fc .fc-daygrid-day-number {
//           color: #ffffff !important;
//           font-weight: 600;
//           text-decoration: none !important;
//         }

//         .fc .fc-toolbar-title {
//           color: #ffffff;
//           font-weight: 700;
//         }

//         .fc .fc-day-today {
//           background: rgba(255,255,255,0.15) !important;
//           border-radius: 8px;
//         }

//         .fc-event {
//           border-radius: 8px !important;
//           font-size: 11px !important;
//           padding: 3px 6px !important;
//           transition: 0.2s ease !important;
//         }

//         .fc-event:hover {
//           transform: scale(1.05);
//           box-shadow: 0 6px 18px rgba(0,0,0,0.4);
//         }

//         .fc .fc-daygrid-day-frame {
//           min-height: 70px !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default UserCalendar;
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

function UserCalendar({ darkMode }) {
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

  /* ===== Blue + Dark Gold Event Colors ===== */
  const getEventColor = (type) => {
    switch (type) {
      case "Exam":
        return "#1E3A8A"; // Deep Blue
      case "Holiday":
        return "#D4A24C"; // Dark Gold
      case "Function":
        return "#1D4ED8"; // Bright Blue
      case "Meeting":
        return "#0F172A"; // Navy
      default:
        return "#475569";
    }
  };

  return (
    <div className={`calendar-wrapper ${darkMode ? "dark" : "light"}`}>
      <h6 className="calendar-title">📅 School Calendar</h6>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        height={390}
        fixedWeekCount={false}
        dayMaxEvents={1}
        events={events.map((e) => ({
          ...e,
          backgroundColor: getEventColor(e.type),
          borderColor: "transparent",
          textColor: "#ffffff",
        }))}
      />

      <style>{`

/* ===== WRAPPER ===== */

.calendar-wrapper {
  border-radius:20px;
  padding:16px;
  transition:0.3s ease;
}

/* Light Mode */
.calendar-wrapper.light {
  background:#ffffff;
  box-shadow:0 15px 40px rgba(30,58,138,0.08);
  color:#111827;
}

/* Dark Mode */
.calendar-wrapper.dark {
  background:#0F172A;
  box-shadow:0 15px 40px rgba(0,0,0,0.6);
  color:#E2E8F0;
}

/* ===== TITLE ===== */

.calendar-title {
  font-weight:700;
  margin-bottom:12px;
}

.calendar-wrapper.light .calendar-title {
  color:#1E3A8A;
}

.calendar-wrapper.dark .calendar-title {
  color:#D4A24C;
}

/* ===== FULLCALENDAR BASE ===== */

.fc {
  font-size:12px;
}

/* Grid Borders */

.calendar-wrapper.light .fc-theme-standard td,
.calendar-wrapper.light .fc-theme-standard th {
  border-color:#e5e7eb !important;
}

.calendar-wrapper.dark .fc-theme-standard td,
.calendar-wrapper.dark .fc-theme-standard th {
  border-color:rgba(255,255,255,0.08) !important;
}

/* Day Cell Background */

.calendar-wrapper.light .fc .fc-daygrid-day {
  background:#f9fafb !important;
  border-radius:8px;
}

.calendar-wrapper.dark .fc .fc-daygrid-day {
  background:rgba(255,255,255,0.03) !important;
  border-radius:8px;
}

/* Hover */

.calendar-wrapper.light .fc .fc-daygrid-day:hover {
  background:#e0f2fe !important;
  transform:translateY(-3px);
}

.calendar-wrapper.dark .fc .fc-daygrid-day:hover {
  background:rgba(212,162,76,0.15) !important;
  transform:translateY(-3px);
}

/* Day Numbers */

.calendar-wrapper.light .fc .fc-daygrid-day-number {
  color:#111827 !important;
  font-weight:600;
  text-decoration:none !important;
}

.calendar-wrapper.dark .fc .fc-daygrid-day-number {
  color:#ffffff !important;
  font-weight:600;
  text-decoration:none !important;
}

/* Toolbar Title */

.calendar-wrapper.light .fc .fc-toolbar-title {
  color:#1E3A8A;
  font-weight:700;
}

.calendar-wrapper.dark .fc .fc-toolbar-title {
  color:#D4A24C;
  font-weight:700;
}

/* Today Highlight */

.calendar-wrapper.light .fc .fc-day-today {
  background:#fff7ed !important;
  border:1px solid #D4A24C !important;
  border-radius:8px;
}

.calendar-wrapper.dark .fc .fc-day-today {
  background:rgba(212,162,76,0.2) !important;
  border:1px solid #D4A24C !important;
  border-radius:8px;
}

/* Events */

.fc-event {
  border-radius:8px !important;
  font-size:11px !important;
  padding:3px 6px !important;
  transition:0.2s ease !important;
}

.fc-event:hover {
  transform:scale(1.05);
  box-shadow:0 6px 18px rgba(0,0,0,0.4);
}

/* Cell Height */

.fc .fc-daygrid-day-frame {
  min-height:70px !important;
}

      `}</style>
    </div>
  );
}

export default UserCalendar;
