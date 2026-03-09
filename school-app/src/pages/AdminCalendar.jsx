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
