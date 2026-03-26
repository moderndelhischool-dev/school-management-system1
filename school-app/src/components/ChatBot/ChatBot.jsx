// import React, { useState, useRef, useEffect } from "react";
// import { FaComments, FaTimes } from "react-icons/fa";

// function ChatBot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       text: "Hi 👋 Welcome to Modern Delhi Public High School! How can I assist you today?",
//       sender: "bot",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setTyping(true);

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: "Thank you for your message. Please explore the website for more details.",
//           sender: "bot",
//         },
//       ]);
//       setTyping(false);
//     }, 700);
//   };

//   return (
//     <>
//       {/* TOGGLE BUTTON */}
//       <div className="chat-toggle" onClick={() => setOpen(!open)}>
//         {open ? <FaTimes /> : <FaComments />}
//       </div>

//       {/* CHAT BOX */}
//       <div className={`chat-box ${open ? "open" : ""}`}>
//         <div className="chat-header">School Assistant 🤖</div>

//         <div className="chat-body">
//           {messages.map((msg, index) => (
//             <div key={index} className={`chat-message ${msg.sender}`}>
//               {msg.text}
//             </div>
//           ))}

//           {typing && (
//             <div className="chat-message bot typing">
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           )}

//           <div ref={chatEndRef} />
//         </div>

//         <div className="chat-footer">
//           <input
//             type="text"
//             placeholder="Ask something..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>

//       <style>{`

// /* ================= NAVBAR MATCHED TEAL ================= */
// :root {
//   --primary-teal: #1F5F7A;
//   --primary-teal-dark: #174A5F;
//   --gold: #D4A24C;
// }

// /* TOGGLE BUTTON */
// .chat-toggle {
//   position: fixed;
//   bottom: 25px;
//   right: 25px;
//   width: 60px;
//   height: 60px;
//   background: linear-gradient(135deg,var(--primary-teal),var(--primary-teal-dark));
//   color: white;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 22px;
//   cursor: pointer;
//   z-index: 9999;
//   transition: 0.3s ease;
//   box-shadow: 0 10px 25px rgba(31,95,122,0.4);
// }

// .chat-toggle:hover {
//   background: var(--gold);
//   color: #0F172A;
//   transform: scale(1.08);
// }

// /* CHAT BOX */
// .chat-box {
//   position: fixed;
//   bottom: 100px;
//   right: 25px;
//   width: 340px;
//   height: 440px;
//   background: #ffffff;
//   border-radius: 18px;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   box-shadow: 0 20px 50px rgba(31,95,122,0.25);
//   z-index: 9999;
//   opacity: 0;
//   transform: translateY(20px) scale(0.95);
//   pointer-events: none;
//   transition: all 0.3s ease;
//   border: 1px solid #E5E7EB;
// }

// .chat-box.open {
//   opacity: 1;
//   transform: translateY(0) scale(1);
//   pointer-events: all;
// }

// /* DARK MODE */
// body.dark-mode .chat-box {
//   background: #0F172A;
//   border: 1px solid #1E293B;
// }

// /* HEADER */
// .chat-header {
//   background: linear-gradient(90deg,var(--primary-teal),var(--primary-teal-dark));
//   color: white;
//   padding: 14px;
//   font-weight: 600;
//   text-align: center;
// }

// /* BODY */
// .chat-body {
//   flex: 1;
//   padding: 12px;
//   overflow-y: auto;
//   background: #F3F4F6;
//   display: flex;
//   flex-direction: column;
// }

// body.dark-mode .chat-body {
//   background: #111827;
// }

// /* MESSAGES */
// .chat-message {
//   margin-bottom: 10px;
//   padding: 8px 14px;
//   border-radius: 14px;
//   max-width: 80%;
//   font-size: 14px;
// }

// /* Bot */
// .chat-message.bot {
//   background: #E5E7EB;
//   color: #1F2937;
//   align-self: flex-start;
// }

// /* User */
// .chat-message.user {
//   background: var(--primary-teal);
//   color: white;
//   align-self: flex-end;
// }

// /* Dark Mode User */
// body.dark-mode .chat-message.user {
//   background: var(--gold);
//   color: #0F172A;
// }

// body.dark-mode .chat-message.bot {
//   background: #1E293B;
//   color: #E2E8F0;
// }

// /* FOOTER */
// .chat-footer {
//   display: flex;
//   border-top: 1px solid #E5E7EB;
// }

// body.dark-mode .chat-footer {
//   border-top: 1px solid #1E293B;
// }

// .chat-footer input {
//   flex: 1;
//   padding: 10px;
//   border: none;
//   outline: none;
//   background: white;
// }

// body.dark-mode .chat-footer input {
//   background: #1E293B;
//   color: white;
// }

// .chat-footer button {
//   background: var(--primary-teal);
//   color: white;
//   border: none;
//   padding: 0 18px;
//   cursor: pointer;
//   transition: 0.3s ease;
// }

// .chat-footer button:hover {
//   background: var(--gold);
//   color: #0F172A;
// }

// /* Typing dots */
// .typing span {
//   display: inline-block;
//   width: 6px;
//   height: 6px;
//   background: #888;
//   border-radius: 50%;
//   margin-right: 4px;
//   animation: blink 1.4s infinite both;
// }

// .typing span:nth-child(2) { animation-delay: 0.2s; }
// .typing span:nth-child(3) { animation-delay: 0.4s; }

// @keyframes blink {
//   0% { opacity: .2; }
//   20% { opacity: 1; }
//   100% { opacity: .2; }
// }

//       `}</style>
//     </>
//   );
// }

// export default ChatBot;
import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you with school information today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Enhanced Smart Response Logic
  const getBotResponse = (userInput) => {
    const msg = userInput.toLowerCase();

    // Admission related (handles typos like 'admiison')
    if (
      msg.includes("admiss") ||
      msg.includes("admiis") ||
      msg.includes("apply") ||
      msg.includes("admission")
    ) {
      return "For admissions, please click the 'Apply Now' button in the Hero section. You can also visit the school office between 9 AM to 1 PM.";
    }

    // Fee related
    if (msg.includes("fee") || msg.includes("pay") || msg.includes("charge")) {
      return "Our fee structure is very affordable. Please visit the 'Fees' page in the menu or contact us at 98551-06665 for the detailed slip.";
    }

    // Contact/Location
    if (
      msg.includes("contact") ||
      msg.includes("call") ||
      msg.includes("location") ||
      msg.includes("where")
    ) {
      return "We are located in Vill. Ajjowal, Hoshiarpur. You can call our administrator at 98551-06665.";
    }

    // Staff/Teachers
    if (
      msg.includes("staff") ||
      msg.includes("teacher") ||
      msg.includes("principal")
    ) {
      return "We have a highly qualified and dedicated staff. You can see our team photo in the 'About' section!";
    }

    // General Greetings
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return "Hi there! I am your School Assistant. Ask me about Admissions, Fees, or Timings.";
    }

    return "I'm not sure I understood that perfectly. Could you please ask about Admissions, Fees, or Contact details? Or call us at 98551-06665.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(input);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {/* TOGGLE BUTTON */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaComments />}
      </div>

      {/* CHAT BOX */}
      <div className={`chat-box ${open ? "open" : ""}`}>
        {/* GOLDEN LINE WITH CURVED ENDS */}
        <div className="chat-gold-line"></div>

        <div className="chat-header">
          <span className="online-dot"></span> School Assistant
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {typing && (
            <div className="chat-message bot typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      </div>

      <style>{`
        :root {
          --school-teal: #1F5F7A;
          --school-gold: #D4A24C;
        }

        .chat-toggle {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 55px;
          height: 55px;
          background: var(--school-teal);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
          z-index: 10000;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          transition: 0.3s;
        }
        .chat-toggle:hover { background: var(--school-gold); transform: scale(1.1); }

        .chat-box {
          position: fixed;
          bottom: 95px;
          right: 25px;
          width: 320px;
          height: 460px;
          background: white;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          z-index: 10000;
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          border: 1px solid #eee;
        }
        .chat-box.open { opacity: 1; transform: translateY(0); pointer-events: all; }

        /* CURVED GOLDEN LINE */
        .chat-gold-line {
          height: 5px;
          background: var(--school-gold);
          width: 90%;
          margin: 6px auto 0;
          border-radius: 10px; /* This makes it curved at ends */
        }

        .chat-header {
          background: transparent;
          color: var(--school-teal);
          padding: 12px;
          font-weight: 700;
          text-align: center;
          font-size: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        .online-dot {
          height: 9px; width: 9px; background: #22c55e; 
          border-radius: 50%; display: inline-block; margin-right: 6px;
        }

        .chat-body {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-message {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13.5px;
          max-width: 85%;
          line-height: 1.5;
        }
        .chat-message.bot {
          background: #f1f5f9;
          color: #334155;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
        }
        .chat-message.user {
          background: var(--school-teal);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }

        .chat-footer {
          display: flex;
          padding: 12px;
          background: #fff;
          border-top: 1px solid #f0f0f0;
        }
        .chat-footer input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 25px;
          outline: none;
          font-size: 13px;
        }
        .send-btn {
          background: var(--school-teal);
          color: white;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-left: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }
        .send-btn:hover { background: var(--school-gold); }

        .typing-dots span {
          width: 5px; height: 5px; background: #94a3b8;
          border-radius: 50%; display: inline-block;
          margin: 0 2px; animation: chatBounce 1.4s infinite ease-in-out;
        }
        @keyframes chatBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
      `}</style>
    </>
  );
}

export default ChatBot;
