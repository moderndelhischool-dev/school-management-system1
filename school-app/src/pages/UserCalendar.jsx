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

function UserCalendar({ darkMode }) {
  const [events, setEvents] = useState([]);

  /* 🔥 Realtime events from Firebase */
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
        return "#dc2626";
      case "Holiday":
        return "#16a34a";
      case "Function":
        return "#2563eb";
      case "Meeting":
        return "#d97706";
      default:
        return "#64748b";
    }
  };

  return (
    <div
      style={{
        background: darkMode
          ? "#1f2937"
          : "linear-gradient(135deg, #ecfdf5, #d1fae5)",
        padding: "22px",
        borderRadius: "18px",
        boxShadow: darkMode
          ? "0 8px 25px rgba(0,0,0,0.5)"
          : "0 8px 25px rgba(16,185,129,0.15)",
        color: darkMode ? "#f3f4f6" : "#065f46",
        transition: "all 0.3s ease",
      }}
    >
      <h6 className="mb-3 fw-semibold">📅 School Calendar</h6>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        height={280}
        fixedWeekCount={false}
        dayMaxEvents={1}
        events={events.map((e) => ({
          ...e,
          backgroundColor: getEventColor(e.type),
          borderColor: "transparent",
          textColor: "#ffffff",
        }))}
        eventContent={(arg) => (
          <div style={{ fontSize: "11px", padding: "3px" }}>
            <div style={{ fontWeight: "600" }}>{arg.event.title}</div>
            <div style={{ fontSize: "10px", opacity: 0.9 }}>
              {arg.event.extendedProps.type}
            </div>
          </div>
        )}
      />

      <style>{`
        .fc {
          font-size: 12px;
        }

        /* Border color */
        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: ${darkMode ? "#374151" : "#bbf7d0"} !important;
        }

        /* Calendar cells */
        .fc .fc-daygrid-day {
          background: ${
            darkMode ? "#1f2937" : "rgba(255,255,255,0.6)"
          } !important;
          backdrop-filter: blur(6px);
          transition: 0.25s ease;
        }

        /* Date numbers */
        .fc .fc-daygrid-day-number {
          color: ${darkMode ? "#f3f4f6" : "#065f46"} !important;
          font-weight: 500;
        }

        /* Month title */
        .fc .fc-toolbar-title {
          color: ${darkMode ? "#f3f4f6" : "#065f46"};
          font-weight: 600;
        }

        /* Today highlight */
        .fc .fc-day-today {
          background: ${
            darkMode ? "#374151" : "rgba(16,185,129,0.15)"
          } !important;
        }

        /* Hover effect */
        .fc-daygrid-day:hover {
          background: ${
            darkMode ? "#374151" : "rgba(16,185,129,0.2)"
          } !important;
          transform: translateY(-2px);
        }

        /* Event styling */
        .fc-event {
          border-radius: 6px;
          transition: 0.2s ease !important;
        }

        .fc-event:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(0,0,0,0.35);
        }
      `}</style>
    </div>
  );
}

export default UserCalendar;
