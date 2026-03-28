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
//     setFormData((prev) => ({ ...prev, start: info.dateStr }));
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
//         return "#DC2626";
//       case "Holiday":
//         return "#D4A24C";
//       case "Function":
//         return "#0F4C6C";
//       case "Meeting":
//         return "#1B5E84";
//       default:
//         return "#64748B";
//     }
//   };

//   return (
//     <div
//       className="calendar-card"
//       style={{
//         background: darkMode
//           ? "linear-gradient(135deg,#0f172a,#1e293b)"
//           : "linear-gradient(135deg,#ffffff,#F8FAFC)",
//         color: darkMode ? "#f1f5f9" : "#0F4C6C",
//       }}
//     >
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h6 className="fw-semibold">📅 Event Manager</h6>

//         <div className="legend">
//           <span>
//             <i style={{ background: "#D4A24C" }}></i> Holiday
//           </span>
//           <span>
//             <i style={{ background: "#DC2626" }}></i> Exam
//           </span>
//           <span>
//             <i style={{ background: "#0F4C6C" }}></i> Function
//           </span>
//           <span>
//             <i style={{ background: "#1B5E84" }}></i> Meeting
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
//           <div
//             className="modal-box"
//             style={{
//               background: darkMode ? "#1e293b" : "#ffffff",
//               color: darkMode ? "#f1f5f9" : "#111827",
//             }}
//           >
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
//                 <button className="btn btn-save btn-sm" onClick={handleSave}>
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`

// .calendar-card {
//   padding:22px;
//   border-radius:22px;
//   box-shadow:0 20px 50px rgba(0,0,0,0.15);
//   transition:0.3s ease;
// }

// body.dark-mode .calendar-card {
//   box-shadow:0 20px 50px rgba(0,0,0,0.6);
// }

// /* Calendar Toolbar */
// .fc-toolbar-title {
//   font-weight:700;
// }

// .fc-button {
//   background:linear-gradient(135deg,#0F4C6C,#1B5E84);
//   border:none;
//   border-radius:8px;
// }

// .fc-button:hover {
//   opacity:0.9;
// }

// body.dark-mode .fc-button {
//   background:linear-gradient(135deg,#1e293b,#334155);
// }

// /* Today */
// .fc-day-today {
//   background:rgba(212,162,76,0.2) !important;
//   border-radius:10px;
// }

// /* Events */
// .fc-event {
//   border-radius:8px;
//   font-size:12px;
//   padding:4px 6px;
// }

// /* Legend */
// .legend span {
//   font-size:12px;
//   margin-left:14px;
// }

// .legend i {
//   display:inline-block;
//   width:12px;
//   height:12px;
//   border-radius:4px;
//   margin-right:6px;
// }

// /* Modal */
// .modal-overlay {
//   position:fixed;
//   inset:0;
//   background:rgba(0,0,0,0.7);
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   z-index:2000;
// }

// .modal-box {
//   padding:24px;
//   border-radius:18px;
//   width:380px;
//   box-shadow:0 25px 60px rgba(0,0,0,0.3);
// }

// /* Input */
// body.dark-mode .custom-input {
//   background:#334155;
//   color:white;
//   border:1px solid #475569;
// }

// .custom-input:focus {
//   border-color:#D4A24C !important;
//   box-shadow:0 0 10px rgba(212,162,76,0.3);
// }

// .btn-save {
//   background:linear-gradient(135deg,#0F4C6C,#1B5E84);
//   color:white;
//   border:none;
// }

// .btn-save:hover {
//   opacity:0.9;
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
    setFormData({ title: "", description: "", start: "", type: "Holiday" });
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
      className={`calendar-card ${darkMode ? "dark-mode-popped" : ""}`}
      style={{
        background: darkMode
          ? "#1a2e3f"
          : "linear-gradient(135deg,#ffffff,#F8FAFC)",
        color: darkMode ? "#f1f5f9" : "#0F4C6C",
        padding: "22px",
        borderRadius: "22px",
        transition: "0.3s ease",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold m-0">🗓️ Event Manager</h6>
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
        dayHeaderFormat={{ weekday: "long" }}
        height="660px"
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
            className="modal-box pop-animation"
            style={{
              background: darkMode ? "#1a2e3f" : "#ffffff",
              color: darkMode ? "#f1f5f9" : "#111827",
              boxShadow: darkMode
                ? "0 30px 70px rgba(0,0,0,0.6)"
                : "0 25px 60px rgba(0,0,0,0.2)",
              border: darkMode ? "1px solid #334155" : "none",
            }}
          >
            <h6 className="fw-bold mb-4">
              {editId ? "Update Event" : "Add New Event"}
            </h6>

            <input
              type="text"
              placeholder="Event Title"
              className="form-control mb-3 custom-input"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Event Description"
              className="form-control mb-3 custom-input"
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <select
              className="form-control mb-4 custom-input"
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

            <div className="d-flex justify-content-between align-items-center">
              {editId && (
                <button
                  className="btn btn-danger btn-sm px-3"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
              <div className="ms-auto d-flex gap-2">
                <button
                  className="btn btn-secondary btn-sm px-3"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`btn-sm px-4 shadow-sm ${darkMode ? "btn-save-dark" : "btn-save-light"}`}
                  onClick={handleSave}
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* MODAL POPUP SMOOTHNESS */
        .pop-animation { animation: modalPop 0.25s ease-out; }
        @keyframes modalPop {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .dark-mode-popped {
          box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }

        /* TOOLBAR & ARROW GAPS */
        .fc-toolbar-chunk { display: flex; align-items: center; gap: 10px; }
        .fc-prev-button, .fc-next-button { margin-right: 4px !important; }

        /* CONDITIONAL STYLING */
        ${
          darkMode
            ? `
          /* DARK MODE ONLY */
          .fc-button { 
            background: #243b4d !important; 
            border: 1px solid #334155 !important; 
            color: white !important; 
            font-weight: 600 !important;
          }
          .fc-button:hover { background: #2d4558 !important; }
          .fc-button-active { background: #3b82f6 !important; border: none !important; }
          
          .fc-theme-standard td, .fc-theme-standard th, .fc-scrollgrid { 
            border: 1px solid rgba(255,255,255,0.1) !important; 
          }
          .fc .fc-scrollgrid { border-left-width: 1px !important; }
          
          .fc-col-header-cell { background: rgba(0,0,0,0.2) !important; }
          .fc-col-header-cell-cushion { color: #94a3b8 !important; text-decoration: none !important; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; }
          .fc-daygrid-day-number { color: #cbd5e1 !important; text-decoration: none !important; font-weight: 600; padding: 10px !important; }
          .fc-toolbar-title { color: white !important; font-weight: 700 !important; }

          /* DARK MODE INPUT TEXT VISIBILITY */
          .custom-input { 
            background: #243b4d !important; 
            color: #ffffff !important; 
            border: 1px solid #334155 !important; 
            border-radius: 10px !important;
          }
          .custom-input::placeholder { color: #94a3b8 !important; }
          .custom-input:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.2) !important; }

          /* DARK SAVE BUTTON (Light Mode Colors for Premium Look) */
          .btn-save-dark { 
            background: linear-gradient(135deg,#0F4C6C,#1B5E84) !important; 
            color: white !important; border: none; border-radius: 10px; font-weight: 600; 
          }
        `
            : `
          /* LIGHT MODE ORIGINAL */
          .fc-button { background: linear-gradient(135deg,#0F4C6C,#1B5E84); border:none; border-radius:8px; }
          .fc-col-header-cell-cushion, .fc-daygrid-day-number { text-decoration: none !important; color: #0F4C6C !important; }
          .btn-save-light { background: linear-gradient(135deg,#0F4C6C,#1B5E84); color: white; border: none; border-radius: 8px; font-weight: 600; }
          .custom-input { background: #f8fafc; border: 1px solid #e2e8f0; color: #1e293b; border-radius: 10px; }
        `
        }

        /* COMMON SETTINGS */
        .modal-overlay { 
          position: fixed; inset: 0; background: rgba(0,0,0,0.8); 
          display: flex; justify-content: center; align-items: center; 
          z-index: 10000; backdrop-filter: blur(8px); 
        }
        .modal-box { padding: 35px; border-radius: 24px; width: 420px; }
        .legend span { font-size: 11px; margin-left: 14px; font-weight: 700; }
        .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; }
        .fc-day-today { background: rgba(59, 130, 246, 0.15) !important; }
        .fc-event { border-radius: 6px; font-size: 11px; padding: 3px 6px; border: none !important; }
      `}</style>
    </div>
  );
}

export default AdminCalendar;
