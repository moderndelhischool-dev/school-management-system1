// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// function UserCalendar() {
//   const [events, setEvents] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);

//   /* 🔥 Detect theme properly */
//   useEffect(() => {
//     const checkTheme = () => {
//       const savedTheme = localStorage.getItem("theme");
//       setDarkMode(savedTheme === "dark");
//     };

//     checkTheme();

//     window.addEventListener("storage", checkTheme);
//     return () => window.removeEventListener("storage", checkTheme);
//   }, []);

//   /* 🔥 Realtime events */
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
//         return "#dc2626";
//       case "Holiday":
//         return "#16a34a";
//       case "Function":
//         return "#2563eb";
//       case "Meeting":
//         return "#d97706";
//       default:
//         return "#64748b";
//     }
//   };

//   return (
//     <div
//       style={{
//         background: darkMode ? "#1e293b" : "#ffffff",
//         padding: "20px",
//         borderRadius: "18px",
//         boxShadow: darkMode
//           ? "0 8px 25px rgba(0,0,0,0.4)"
//           : "0 8px 25px rgba(0,0,0,0.08)",
//         color: darkMode ? "#f1f5f9" : "#111827",
//         transition: "0.3s ease",
//       }}
//     >
//       <h6 className="mb-3">📅 School Calendar</h6>

//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left: "prev,next",
//           center: "title",
//           right: "",
//         }}
//         height={280}
//         fixedWeekCount={false}
//         dayMaxEvents={1}
//         events={events.map((e) => ({
//           ...e,
//           backgroundColor: getEventColor(e.type),
//           borderColor: "transparent",
//           textColor: "#ffffff",
//         }))}
//         eventContent={(arg) => (
//           <div style={{ fontSize: "11px", padding: "3px" }}>
//             <div style={{ fontWeight: "600" }}>{arg.event.title}</div>
//             <div style={{ fontSize: "10px", opacity: 0.85 }}>
//               {arg.event.extendedProps.type}
//             </div>
//           </div>
//         )}
//       />

//       <style>{`
//         .fc {
//           font-size: 12px;
//         }

//         .fc-theme-standard td,
//         .fc-theme-standard th {
//           border-width: 1px;
//           border-color: ${darkMode ? "#334155" : "#e5e7eb"} !important;
//         }

//         .fc .fc-daygrid-day {
//           background: ${darkMode ? "#1e293b" : "#ffffff"} !important;
//         }

//         .fc .fc-daygrid-day-number {
//           color: ${darkMode ? "#e5e7eb" : "#111827"} !important;
//           font-weight: 500;
//         }

//         .fc .fc-toolbar-title {
//           color: ${darkMode ? "#f1f5f9" : "#111827"};
//         }

//         .fc .fc-day-today {
//           background: ${darkMode ? "#334155" : "#f0fdf4"} !important;
//         }

//         .fc-daygrid-day:hover {
//           background: ${darkMode ? "#334155" : "#f3f4f6"} !important;
//           transition: 0.25s ease;
//           transform: translateY(-2px);
//         }

//         .fc-event {
//           border-radius: 6px;
//           transition: 0.2s ease !important;
//         }

//         .fc-event:hover {
//           transform: scale(1.05);
//           box-shadow: 0 5px 15px rgba(0,0,0,0.3);
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

function UserCalendar() {
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

  const getEventColor = (type) => {
    switch (type) {
      case "Exam":
        return "#ef4444";
      case "Holiday":
        return "#a855f7";
      case "Function":
        return "#9333ea";
      case "Meeting":
        return "#c084fc";
      default:
        return "#64748b";
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg,#4c1d95,#7c3aed)", // 👈 SAME AS SIDEBAR
        borderRadius: "20px",
        padding: "12px",
        boxShadow: "0 10px 35px rgba(0,0,0,0.4)",
        transition: "0.3s ease",
      }}
    >
      <h6 className="fw-semibold mb-3" style={{ color: "#ffffff" }}>
        📅 School Calendar
      </h6>

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
        .fc {
          font-size: 12px;
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: rgba(255,255,255,0.15) !important;
        }

        .fc .fc-daygrid-day {
          background: rgba(0,0,0,0.15) !important;
          transition: 0.25s ease;
          border-radius: 8px;
        }

        .fc .fc-daygrid-day:hover {
          background: rgba(0,0,0,0.25) !important;
          transform: translateY(-3px);
        }

        .fc .fc-daygrid-day-number {
          color: #ffffff !important;
          font-weight: 600;
          text-decoration: none !important;
        }

        .fc .fc-toolbar-title {
          color: #ffffff;
          font-weight: 700;
        }

        .fc .fc-day-today {
          background: rgba(255,255,255,0.15) !important;
          border-radius: 8px;
        }

        .fc-event {
          border-radius: 8px !important;
          font-size: 11px !important;
          padding: 3px 6px !important;
          transition: 0.2s ease !important;
        }

        .fc-event:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(0,0,0,0.4);
        }

        .fc .fc-daygrid-day-frame {
          min-height: 70px !important;
        }
      `}</style>
    </div>
  );
}

export default UserCalendar;
