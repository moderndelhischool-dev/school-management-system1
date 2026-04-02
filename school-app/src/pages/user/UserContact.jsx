// import { useState } from "react";

// function UserContact() {
//   const [message, setMessage] = useState("");
//   const [sent, setSent] = useState(false);

//   const handleSubmit = () => {
//     if (!message) return;

//     setSent(true);
//     setMessage("");
//   };

//   return (
//     <div className="contact-overlay">
//       <div className="contact-modal">
//         <h5 className="mb-3 text-purple">📞 Contact Admin</h5>

//         {!sent ? (
//           <>
//             <textarea
//               className="form-control mb-3 custom-textarea"
//               rows="4"
//               placeholder="Write your problem or feedback..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />

//             <button className="btn btn-purple w-100" onClick={handleSubmit}>
//               Send Message
//             </button>
//           </>
//         ) : (
//           <div className="alert alert-success text-center">
//             ✅ Message Sent Successfully!
//           </div>
//         )}
//       </div>

//       <style>{`
//         .contact-overlay {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 70vh;
//           animation: fadeIn 0.3s ease;
//           background: linear-gradient(135deg,#ffffff,#f3e8ff);
//         }

//         body.dark-mode .contact-overlay {
//           background: linear-gradient(135deg,#1e1b4b,#0f172a);
//         }

//         .contact-modal {
//           width: 100%;
//           max-width: 500px;
//           background: linear-gradient(135deg,#ffffff,#ede9fe);
//           padding: 30px;
//           border-radius: 20px;
//           border: 1px solid #ddd6fe;
//           box-shadow: 0 20px 50px rgba(124,58,237,0.25);
//           animation: slideUp 0.4s ease;
//           transition: 0.3s ease;
//         }

//         body.dark-mode .contact-modal {
//           background: linear-gradient(135deg,#1e1b4b,#0f172a);
//           color: white;
//           border: 1px solid #312e81;
//         }

//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .btn-purple {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95);
//           color: white;
//           border: none;
//         }

//         .btn-purple:hover {
//           box-shadow: 0 6px 18px rgba(124,58,237,0.4);
//           transform: translateY(-2px);
//         }

//         .custom-textarea:focus {
//           border-color: #7c3aed !important;
//           box-shadow: 0 0 8px rgba(124,58,237,0.4);
//         }

//         @keyframes slideUp {
//           from { transform: translateY(40px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default UserContact;
import { useState } from "react";

function UserContact() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!message) return;

    setSent(true);
    setMessage("");
  };

  return (
    <div className="contact-overlay">
      <div className="contact-modal">
        <h5 className="mb-3 section-title">Contact administration</h5>

        {!sent ? (
          <>
            <textarea
              className="form-control mb-3 custom-textarea"
              rows="4"
              placeholder="Describe your enquiry or feedback…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="btn-primary-custom w-100" onClick={handleSubmit}>
              Send message
            </button>
          </>
        ) : (
          <div className="alert alert-success text-center">
            Your message has been sent.
          </div>
        )}
      </div>

      <style>{`

/* OVERLAY */
.contact-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  animation: fadeIn 0.3s ease;
  background: linear-gradient(135deg,#E6EEF4,#F4F6F8);
}

/* DARK MODE OVERLAY */
body.dark-mode .contact-overlay {
  background: linear-gradient(135deg,#0A2E42,#0F172A);
}

/* MODAL */
.contact-modal {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 20px 50px rgba(15,76,108,0.25);
  animation: slideUp 0.4s ease;
  transition: 0.3s ease;
}

/* DARK MODE MODAL */
body.dark-mode .contact-modal {
  background: #1B2A35;
  color: white;
  border: 1px solid #243644;
}

/* TITLE */
.section-title {
  color: #0F4C6C;
  font-weight: 700;
}

body.dark-mode .section-title {
  color: #D4A24C;
}

/* TEXTAREA */
.custom-textarea {
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 12px;
  transition: 0.3s ease;
}

.custom-textarea:focus {
  border-color: #0F4C6C !important;
  box-shadow: 0 0 8px rgba(15,76,108,0.35);
}

/* PRIMARY BUTTON */
.btn-primary-custom {
  background: linear-gradient(135deg,#0F4C6C,#1B5E84);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  transition: 0.3s ease;
  font-weight: 600;
}

.btn-primary-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
  transform: translateY(-2px);
}

/* ANIMATIONS */
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

      `}</style>
    </div>
  );
}

export default UserContact;
