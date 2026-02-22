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
        <h5 className="mb-3 text-purple">📞 Contact Admin</h5>

        {!sent ? (
          <>
            <textarea
              className="form-control mb-3 custom-textarea"
              rows="4"
              placeholder="Write your problem or feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="btn btn-purple w-100" onClick={handleSubmit}>
              Send Message
            </button>
          </>
        ) : (
          <div className="alert alert-success text-center">
            ✅ Message Sent Successfully!
          </div>
        )}
      </div>

      <style>{`
        .contact-overlay {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 70vh;
          animation: fadeIn 0.3s ease;
          background: linear-gradient(135deg,#ffffff,#f3e8ff);
        }

        body.dark-mode .contact-overlay {
          background: linear-gradient(135deg,#1e1b4b,#0f172a);
        }

        .contact-modal {
          width: 100%;
          max-width: 500px;
          background: linear-gradient(135deg,#ffffff,#ede9fe);
          padding: 30px;
          border-radius: 20px;
          border: 1px solid #ddd6fe;
          box-shadow: 0 20px 50px rgba(124,58,237,0.25);
          animation: slideUp 0.4s ease;
          transition: 0.3s ease;
        }

        body.dark-mode .contact-modal {
          background: linear-gradient(135deg,#1e1b4b,#0f172a);
          color: white;
          border: 1px solid #312e81;
        }

        .text-purple {
          color: #7c3aed !important;
        }

        .btn-purple {
          background: linear-gradient(135deg,#7c3aed,#4c1d95);
          color: white;
          border: none;
        }

        .btn-purple:hover {
          box-shadow: 0 6px 18px rgba(124,58,237,0.4);
          transform: translateY(-2px);
        }

        .custom-textarea:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 8px rgba(124,58,237,0.4);
        }

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
