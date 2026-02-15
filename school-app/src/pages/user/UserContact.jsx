import { useState } from "react";

function UserContact() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!message) return;

    // 🔥 Later you can send to Firebase
    setSent(true);
    setMessage("");
  };

  return (
    <div className="contact-overlay">
      <div className="contact-modal">
        <h5 className="mb-3">📞 Contact Admin</h5>

        {!sent ? (
          <>
            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Write your problem or feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="btn btn-success w-100" onClick={handleSubmit}>
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
        }

        .contact-modal {
          width: 100%;
          max-width: 500px;
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          animation: slideUp 0.4s ease;
        }

        body.dark-mode .contact-modal {
          background: #1e1e1e;
          color: white;
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
