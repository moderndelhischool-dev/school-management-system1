// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import {
//   collection,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// function AdminCalendar({ darkMode }) {
//   const [events, setEvents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     start: "",
//     type: "Holiday",
//   });

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

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       description: "",
//       start: "",
//       type: "Holiday",
//     });
//     setEditId(null);
//   };

//   const handleDateClick = (info) => {
//     resetForm();
//     setFormData((prev) => ({
//       ...prev,
//       start: info.dateStr,
//     }));
//     setShowModal(true);
//   };

//   const handleEventClick = (info) => {
//     const event = info.event;

//     setEditId(event.id);
//     setFormData({
//       title: event.title,
//       description: event.extendedProps.description || "",
//       start: event.startStr,
//       type: event.extendedProps.type || "Holiday",
//     });

//     setShowModal(true);
//   };

//   const handleSave = async () => {
//     if (!formData.title) return;

//     if (editId) {
//       await updateDoc(doc(db, "events", editId), formData);
//     } else {
//       await addDoc(collection(db, "events"), formData);
//     }

//     setShowModal(false);
//     resetForm();
//   };

//   const handleDelete = async () => {
//     if (!editId) return;

//     await deleteDoc(doc(db, "events", editId));
//     setShowModal(false);
//     resetForm();
//   };

//   const getEventColor = (type) => {
//     switch (type) {
//       case "Exam":
//         return "#dc2626";
//       case "Holiday":
//         return "#7c3aed";
//       case "Function":
//         return "#6d28d9";
//       case "Meeting":
//         return "#9333ea";
//       default:
//         return "#64748b";
//     }
//   };

//   return (
//     <div
//       style={{
//         background: darkMode ? "#1e1b4b" : "#ffffff",
//         padding: "18px",
//         borderRadius: "18px",
//         boxShadow: darkMode
//           ? "0 8px 25px rgba(0,0,0,0.5)"
//           : "0 8px 25px rgba(124,58,237,0.12)",
//         color: darkMode ? "white" : "#4c1d95",
//       }}
//     >
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h6 className="fw-semibold">📅 Event Manager</h6>

//         <div className="legend">
//           <span>
//             <i style={{ background: "#7c3aed" }}></i> Holiday
//           </span>
//           <span>
//             <i style={{ background: "#dc2626" }}></i> Exam
//           </span>
//           <span>
//             <i style={{ background: "#6d28d9" }}></i> Function
//           </span>
//           <span>
//             <i style={{ background: "#9333ea" }}></i> Meeting
//           </span>
//         </div>
//       </div>

//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "",
//         }}
//         height="auto"
//         dayHeaderClassNames="custom-day-header"
//         dayCellClassNames="custom-day-cell"
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         events={events.map((e) => ({
//           ...e,
//           backgroundColor: getEventColor(e.type),
//           borderColor: "transparent",
//           textColor: "#fff",
//         }))}
//         dayMaxEvents={2}
//         fixedWeekCount={false}
//       />

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h6>{editId ? "Edit Event" : "Add Event"}</h6>

//             <input
//               type="text"
//               placeholder="Event Title"
//               className="form-control mb-2 custom-input"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="Description"
//               className="form-control mb-2 custom-input"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//             />

//             <select
//               className="form-control mb-3 custom-input"
//               value={formData.type}
//               onChange={(e) =>
//                 setFormData({ ...formData, type: e.target.value })
//               }
//             >
//               <option>Holiday</option>
//               <option>Exam</option>
//               <option>Meeting</option>
//               <option>Function</option>
//             </select>

//             <div className="d-flex justify-content-between">
//               {editId && (
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>
//               )}

//               <div className="ms-auto d-flex gap-2">
//                 <button
//                   className="btn btn-secondary btn-sm"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button className="btn btn-purple btn-sm" onClick={handleSave}>
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`

// /* ================= MAIN CALENDAR CONTAINER ================= */
// .fc {
//   background: ${darkMode ? "#1e1b4b" : "#faf5ff"};
//   padding: 18px;
//   border-radius: 18px;
//   box-shadow: 0 10px 30px rgba(124,58,237,0.15);
//   font-family: 'Segoe UI', sans-serif;
// }

// /* Remove all anchor underline */
// .fc a {
//   text-decoration: none !important;
//   color: inherit !important;
// }

// /* ================= HEADER (Month + Arrows) ================= */
// .fc-toolbar-title {
//   font-size: 20px;
//   font-weight: 700;
//   color: ${darkMode ? "#ffffff" : "#4c1d95"};
// }

// .fc-button {
//   background: linear-gradient(135deg,#7c3aed,#4c1d95);
//   border: none;
//   border-radius: 8px;
// }

// .fc-button:hover {
//   background: #6d28d9;
//   box-shadow: 0 6px 18px rgba(124,58,237,0.4);
// }

// /* ================= DAY HEADER (Sun Mon Tue) ================= */
// .fc-col-header-cell {
//   background: ${darkMode ? "#2e1065" : "#ede9fe"};
//   padding: 8px 0;
// }

// .fc-col-header-cell-cushion {
//   font-weight: 600;
//   font-size: 14px;
//   color: ${darkMode ? "#c4b5fd" : "#6d28d9"};
// }

// /* ================= DATE NUMBER ================= */
// .fc-daygrid-day-number {
//   font-weight: 700;
//   font-size: 15px;
//   padding: 6px;
//   color: ${darkMode ? "#ffffff" : "#4c1d95"};
//   text-decoration: none !important;
// }

// /* Remove link look */
// .fc-daygrid-day-number a {
//   text-decoration: none !important;
//   color: inherit !important;
// }

// /* ================= TODAY HIGHLIGHT ================= */
// .fc-day-today {
//   background: ${darkMode ? "#312e81" : "#ddd6fe"} !important;
//   border-radius: 14px;
// }

// /* ================= DAY CELL ================= */
// .fc-daygrid-day {
//   transition: all 0.3s ease;
//   border-radius: 14px;
//   overflow: hidden;
// }

// /* Hover pop effect */
// .fc-daygrid-day:hover {
//   background: ${darkMode ? "#312e81" : "#ede9fe"};
//   transform: translateY(-4px) scale(1.02);
//   box-shadow: 0 12px 30px rgba(124,58,237,0.25);
//   cursor: pointer;
//   z-index: 5;
// }

// /* ================= EVENTS ================= */
// .fc-event {
//   border-radius: 8px;
//   padding: 4px 6px;
//   font-size: 12px;
//   font-weight: 500;
//   transition: all 0.3s ease;
//   border: none;
// }

// .fc-event:hover {
//   transform: scale(1.08);
//   box-shadow: 0 10px 25px rgba(124,58,237,0.5);
//   z-index: 999;
// }

// /* ================= LEGEND ================= */
// .legend span {
//   font-size: 12px;
//   margin-left: 14px;
//   font-weight: 500;
// }

// .legend i {
//   display:inline-block;
//   width:12px;
//   height:12px;
//   border-radius:4px;
//   margin-right:6px;
// }

// /* ================= MODAL ================= */
// .modal-overlay {
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.65);
//   backdrop-filter: blur(6px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 2000;
// }

// .modal-box {
//   background: ${darkMode ? "#0f172a" : "#ffffff"};
//   color: ${darkMode ? "white" : "#111"};
//   padding: 22px;
//   border-radius: 18px;
//   width: 360px;
//   box-shadow: 0 25px 60px rgba(124,58,237,0.4);
//   animation: pop 0.3s ease;
// }

// /* Modal Animation */
// @keyframes pop {
//   from {
//     transform: scale(0.8);
//     opacity: 0;
//   }
//   to {
//     transform: scale(1);
//     opacity: 1;
//   }
// }

// /* ================= BUTTON ================= */
// .btn-purple {
//   background: linear-gradient(135deg,#7c3aed,#4c1d95);
//   color: white;
//   border: none;
// }

// .btn-purple:hover {
//   background: #6d28d9;
//   box-shadow: 0 8px 20px rgba(124,58,237,0.5);
// }

// /* ================= INPUT FOCUS ================= */
// .custom-input:focus {
//   border-color: #7c3aed !important;
//   box-shadow: 0 0 12px rgba(124,58,237,0.4);
// }

// `}</style>
//     </div>
//   );
// }

// export default AdminCalendar;
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function AdminCalendar({ darkMode }) {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    type: "Holiday",
  });

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

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      start: "",
      type: "Holiday",
    });
    setEditId(null);
  };

  const handleDateClick = (info) => {
    resetForm();
    setFormData((prev) => ({ ...prev, start: info.dateStr }));
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const event = info.event;
    setEditId(event.id);
    setFormData({
      title: event.title,
      description: event.extendedProps.description || "",
      start: event.startStr,
      type: event.extendedProps.type || "Holiday",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title) return;

    if (editId) {
      await updateDoc(doc(db, "events", editId), formData);
    } else {
      await addDoc(collection(db, "events"), formData);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!editId) return;
    await deleteDoc(doc(db, "events", editId));
    setShowModal(false);
    resetForm();
  };

  const getEventColor = (type) => {
    switch (type) {
      case "Exam":
        return "#DC2626";
      case "Holiday":
        return "#D4A24C";
      case "Function":
        return "#0F4C6C";
      case "Meeting":
        return "#1B5E84";
      default:
        return "#64748B";
    }
  };

  return (
    <div
      className="calendar-card"
      style={{
        background: darkMode
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "linear-gradient(135deg,#ffffff,#F8FAFC)",
        color: darkMode ? "#f1f5f9" : "#0F4C6C",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold">📅 Event Manager</h6>

        <div className="legend">
          <span>
            <i style={{ background: "#D4A24C" }}></i> Holiday
          </span>
          <span>
            <i style={{ background: "#DC2626" }}></i> Exam
          </span>
          <span>
            <i style={{ background: "#0F4C6C" }}></i> Function
          </span>
          <span>
            <i style={{ background: "#1B5E84" }}></i> Meeting
          </span>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        height="auto"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events.map((e) => ({
          ...e,
          backgroundColor: getEventColor(e.type),
          borderColor: "transparent",
          textColor: "#fff",
        }))}
        dayMaxEvents={2}
        fixedWeekCount={false}
      />

      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-box"
            style={{
              background: darkMode ? "#1e293b" : "#ffffff",
              color: darkMode ? "#f1f5f9" : "#111827",
            }}
          >
            <h6>{editId ? "Edit Event" : "Add Event"}</h6>

            <input
              type="text"
              placeholder="Event Title"
              className="form-control mb-2 custom-input"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="form-control mb-2 custom-input"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <select
              className="form-control mb-3 custom-input"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Holiday</option>
              <option>Exam</option>
              <option>Meeting</option>
              <option>Function</option>
            </select>

            <div className="d-flex justify-content-between">
              {editId && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}

              <div className="ms-auto d-flex gap-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-save btn-sm" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`

.calendar-card {
  padding:22px;
  border-radius:22px;
  box-shadow:0 20px 50px rgba(0,0,0,0.15);
  transition:0.3s ease;
}

body.dark-mode .calendar-card {
  box-shadow:0 20px 50px rgba(0,0,0,0.6);
}

/* Calendar Toolbar */
.fc-toolbar-title {
  font-weight:700;
}

.fc-button {
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  border:none;
  border-radius:8px;
}

.fc-button:hover {
  opacity:0.9;
}

body.dark-mode .fc-button {
  background:linear-gradient(135deg,#1e293b,#334155);
}

/* Today */
.fc-day-today {
  background:rgba(212,162,76,0.2) !important;
  border-radius:10px;
}

/* Events */
.fc-event {
  border-radius:8px;
  font-size:12px;
  padding:4px 6px;
}

/* Legend */
.legend span {
  font-size:12px;
  margin-left:14px;
}

.legend i {
  display:inline-block;
  width:12px;
  height:12px;
  border-radius:4px;
  margin-right:6px;
}

/* Modal */
.modal-overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.7);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:2000;
}

.modal-box {
  padding:24px;
  border-radius:18px;
  width:380px;
  box-shadow:0 25px 60px rgba(0,0,0,0.3);
}

/* Input */
body.dark-mode .custom-input {
  background:#334155;
  color:white;
  border:1px solid #475569;
}

.custom-input:focus {
  border-color:#D4A24C !important;
  box-shadow:0 0 10px rgba(212,162,76,0.3);
}

.btn-save {
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  color:white;
  border:none;
}

.btn-save:hover {
  opacity:0.9;
}

`}</style>
    </div>
  );
}

export default AdminCalendar;
