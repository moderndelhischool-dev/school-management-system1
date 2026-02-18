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
    setFormData((prev) => ({
      ...prev,
      start: info.dateStr,
    }));
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
        background: darkMode ? "#1e293b" : "#ffffff",
        padding: "18px",
        borderRadius: "18px",
        boxShadow: darkMode
          ? "0 8px 25px rgba(0,0,0,0.5)"
          : "0 8px 25px rgba(0,0,0,0.08)",
        color: darkMode ? "white" : "#111827",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>📅 Event Manager</h6>

        <div className="legend">
          <span>
            <i style={{ background: "#16a34a" }}></i> Holiday
          </span>
          <span>
            <i style={{ background: "#dc2626" }}></i> Exam
          </span>
          <span>
            <i style={{ background: "#2563eb" }}></i> Function
          </span>
          <span>
            <i style={{ background: "#d97706" }}></i> Meeting
          </span>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events.map((e) => ({
          ...e,
          backgroundColor: getEventColor(e.type),
          borderColor: "transparent",
          textColor: "#fff",
        }))}
        eventContent={(arg) => (
          <div className="event-card">
            <div className="event-title">{arg.event.title}</div>
            <div className="event-type">{arg.event.extendedProps.type}</div>
            {arg.event.extendedProps.description && (
              <div className="event-desc">
                {arg.event.extendedProps.description}
              </div>
            )}
          </div>
        )}
        dayMaxEvents={false}
        fixedWeekCount={false}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h6>{editId ? "Edit Event" : "Add Event"}</h6>

            <input
              type="text"
              placeholder="Event Title"
              className="form-control mb-2"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="form-control mb-2"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <select
              className="form-control mb-3"
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
                <button className="btn btn-success btn-sm" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* 🔥 DAY HOVER EFFECT */
        .fc-daygrid-day {
          transition: all 0.25s ease;
        }

        .fc-daygrid-day:hover {
          background: ${darkMode ? "#334155" : "#f3f4f6"};
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          cursor: pointer;
        }

        /* 🔥 EVENT HOVER EFFECT */
        .fc-event {
          transition: all 0.25s ease !important;
        }

        .fc-event:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(0,0,0,0.35);
          z-index: 999;
        }

        .event-card {
          padding: 6px;
          border-radius: 8px;
          font-size: 11px;
        }

        .event-title {
          font-weight: 600;
        }

        .event-type {
          font-size: 10px;
          opacity: 0.9;
        }

        .event-desc {
          font-size: 10px;
          margin-top: 3px;
          opacity: 0.85;
        }

        .legend span {
          font-size: 12px;
          margin-left: 12px;
        }

        .legend i {
          display:inline-block;
          width:10px;
          height:10px;
          border-radius:3px;
          margin-right:5px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }

        .modal-box {
          background: ${darkMode ? "#0f172a" : "#ffffff"};
          color: ${darkMode ? "white" : "#111"};
          padding: 20px;
          border-radius: 14px;
          width: 340px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}

export default AdminCalendar;
