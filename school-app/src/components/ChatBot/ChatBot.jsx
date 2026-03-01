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

//   // 🎯 Knowledge Base
//   const knowledgeBase = {
//     about: [
//       "Modern Delhi Public High School focuses on academic excellence and character development.",
//       "Our school is dedicated to providing quality education with modern facilities.",
//       "We aim to build future leaders through discipline, innovation, and strong academics.",
//     ],
//     admission: [
//       "Admissions are open. Please click on the Apply Now button on the homepage.",
//       "You can apply by filling out the admission form available on our website.",
//       "Our admission process is simple and fully online.",
//     ],
//     contact: [
//       "You can find our contact details in the Contact section.",
//       "Visit the Contact page for phone and email information.",
//       "All official contact details are listed on our website.",
//     ],
//     classes: [
//       "We provide education from primary to senior secondary level.",
//       "Our academic programs cover all major school levels.",
//       "We offer structured learning from junior to higher secondary classes.",
//     ],
//     facilities: [
//       "Our campus includes smart classrooms, science labs, and sports facilities.",
//       "Students enjoy modern infrastructure and extracurricular activities.",
//       "We provide a safe and well-equipped learning environment.",
//     ],
//     default: [
//       "Thank you for your question. Please explore our website sections for more details.",
//       "I recommend checking the relevant section on our website.",
//       "For detailed information, please contact the school administration.",
//     ],
//   };

//   // 🎯 Intelligent Analyzer
//   const analyzeQuestion = (text) => {
//     const msg = text.toLowerCase();

//     if (
//       msg.includes("modern delhi") ||
//       msg.includes("school") ||
//       msg.includes("about") ||
//       msg.includes("tell me about")
//     )
//       return "about";

//     if (msg.includes("admission") || msg.includes("apply")) return "admission";

//     if (
//       msg.includes("contact") ||
//       msg.includes("phone") ||
//       msg.includes("email")
//     )
//       return "contact";

//     if (
//       msg.includes("class") ||
//       msg.includes("course") ||
//       msg.includes("study")
//     )
//       return "classes";

//     if (
//       msg.includes("facility") ||
//       msg.includes("campus") ||
//       msg.includes("lab")
//     )
//       return "facilities";

//     return "default";
//   };

//   const getRandomResponse = (category) => {
//     const responses = knowledgeBase[category];
//     return responses[Math.floor(Math.random() * responses.length)];
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setTyping(true);

//     const category = analyzeQuestion(input);
//     const reply = getRandomResponse(category);

//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
//       setTyping(false);
//     }, 700);
//   };

//   return (
//     <>
//       <div
//         className={`chat-toggle ${open ? "active" : ""}`}
//         onClick={() => setOpen(!open)}
//       >
//         {open ? <FaTimes /> : <FaComments />}
//       </div>

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
//         .chat-toggle {
//           position: fixed;
//           bottom: 25px;
//           right: 25px;
//           width: 60px;
//           height: 60px;
//           background: #5b21b6;
//           color: white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 22px;
//           cursor: pointer;
//           z-index: 9999;
//           transition: 0.3s;
//         }

//         .chat-toggle:hover {
//           background: #7c3aed;
//           transform: scale(1.1);
//         }

//         .chat-box {
//           position: fixed;
//           bottom: 100px;
//           right: 25px;
//           width: 340px;
//           height: 440px;
//           background: white;
//           border-radius: 18px;
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.35);
//           z-index: 9999;
//           opacity: 0;
//           transform: translateY(20px) scale(0.95);
//           pointer-events: none;
//           transition: all 0.3s ease;
//         }

//         .chat-box.open {
//           opacity: 1;
//           transform: translateY(0) scale(1);
//           pointer-events: all;
//         }

//         .chat-header {
//           background: #5b21b6;
//           color: white;
//           padding: 14px;
//           font-weight: 600;
//           text-align: center;
//         }

//         .chat-body {
//           flex: 1;
//           padding: 12px;
//           overflow-y: auto;
//           background: #f3f4f6;
//           display: flex;
//           flex-direction: column;
//         }

//         .chat-message {
//           margin-bottom: 10px;
//           padding: 8px 14px;
//           border-radius: 14px;
//           max-width: 80%;
//           font-size: 14px;
//           animation: fadeIn 0.3s ease;
//         }

//         .chat-message.bot {
//           background: #e5e7eb;
//           align-self: flex-start;
//         }

//         .chat-message.user {
//           background: #5b21b6;
//           color: white;
//           align-self: flex-end;
//         }

//         .typing span {
//           display: inline-block;
//           width: 6px;
//           height: 6px;
//           background: #888;
//           border-radius: 50%;
//           margin-right: 4px;
//           animation: blink 1.4s infinite both;
//         }

//         .typing span:nth-child(2) { animation-delay: 0.2s; }
//         .typing span:nth-child(3) { animation-delay: 0.4s; }

//         @keyframes blink {
//           0% { opacity: .2; }
//           20% { opacity: 1; }
//           100% { opacity: .2; }
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .chat-footer {
//           display: flex;
//           border-top: 1px solid #ddd;
//         }

//         .chat-footer input {
//           flex: 1;
//           padding: 10px;
//           border: none;
//           outline: none;
//         }

//         .chat-footer button {
//           background: #5b21b6;
//           color: white;
//           border: none;
//           padding: 0 18px;
//           cursor: pointer;
//         }

//         .chat-footer button:hover {
//           background: #7c3aed;
//         }
//       `}</style>
//     </>
//   );
// }

// export default ChatBot;
import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi 👋 Welcome to Modern Delhi Public High School! How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. Please explore the website for more details.",
          sender: "bot",
        },
      ]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      {/* TOGGLE BUTTON */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaComments />}
      </div>

      {/* CHAT BOX */}
      <div className={`chat-box ${open ? "open" : ""}`}>
        <div className="chat-header">School Assistant 🤖</div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {typing && (
            <div className="chat-message bot typing">
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
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      <style>{`

/* ================= NAVBAR MATCHED TEAL ================= */
:root {
  --primary-teal: #1F5F7A;
  --primary-teal-dark: #174A5F;
  --gold: #D4A24C;
}

/* TOGGLE BUTTON */
.chat-toggle {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg,var(--primary-teal),var(--primary-teal-dark));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  z-index: 9999;
  transition: 0.3s ease;
  box-shadow: 0 10px 25px rgba(31,95,122,0.4);
}

.chat-toggle:hover {
  background: var(--gold);
  color: #0F172A;
  transform: scale(1.08);
}

/* CHAT BOX */
.chat-box {
  position: fixed;
  bottom: 100px;
  right: 25px;
  width: 340px;
  height: 440px;
  background: #ffffff;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(31,95,122,0.25);
  z-index: 9999;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  pointer-events: none;
  transition: all 0.3s ease;
  border: 1px solid #E5E7EB;
}

.chat-box.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: all;
}

/* DARK MODE */
body.dark-mode .chat-box {
  background: #0F172A;
  border: 1px solid #1E293B;
}

/* HEADER */
.chat-header {
  background: linear-gradient(90deg,var(--primary-teal),var(--primary-teal-dark));
  color: white;
  padding: 14px;
  font-weight: 600;
  text-align: center;
}

/* BODY */
.chat-body {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  background: #F3F4F6;
  display: flex;
  flex-direction: column;
}

body.dark-mode .chat-body {
  background: #111827;
}

/* MESSAGES */
.chat-message {
  margin-bottom: 10px;
  padding: 8px 14px;
  border-radius: 14px;
  max-width: 80%;
  font-size: 14px;
}

/* Bot */
.chat-message.bot {
  background: #E5E7EB;
  color: #1F2937;
  align-self: flex-start;
}

/* User */
.chat-message.user {
  background: var(--primary-teal);
  color: white;
  align-self: flex-end;
}

/* Dark Mode User */
body.dark-mode .chat-message.user {
  background: var(--gold);
  color: #0F172A;
}

body.dark-mode .chat-message.bot {
  background: #1E293B;
  color: #E2E8F0;
}

/* FOOTER */
.chat-footer {
  display: flex;
  border-top: 1px solid #E5E7EB;
}

body.dark-mode .chat-footer {
  border-top: 1px solid #1E293B;
}

.chat-footer input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  background: white;
}

body.dark-mode .chat-footer input {
  background: #1E293B;
  color: white;
}

.chat-footer button {
  background: var(--primary-teal);
  color: white;
  border: none;
  padding: 0 18px;
  cursor: pointer;
  transition: 0.3s ease;
}

.chat-footer button:hover {
  background: var(--gold);
  color: #0F172A;
}

/* Typing dots */
.typing span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #888;
  border-radius: 50%;
  margin-right: 4px;
  animation: blink 1.4s infinite both;
}

.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
}

      `}</style>
    </>
  );
}

export default ChatBot;
