import { useEffect, useRef, useState } from "react";
import {
  Send,
  Sparkles,
  User,
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Mic,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BOT_DELAY = 600;

const OPTIONS = {
  Resume: [
    "Create Resume",
    "ATS Resume",
    "Modern Templates",
    "Download PDF",
  ],

  Portfolio: [
    "Create Portfolio",
    "Portfolio Templates",
    "Customize Portfolio",
  ],

  Presentation: [
    "Create PPT",
    "Export PPT",
    "Themes",
  ],

  Account: [
    "Login Issue",
    "Payment Issue",
    "Subscription",
  ],
};

export default function ChatBox() {
  const navigate = useNavigate();

  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [step, setStep] = useState("MAIN");
  const [input, setInput] = useState("");

  // =========================
  // SCROLL TO TOP WHEN PAGE LOAD
  // =========================
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // =========================
  // ADD BOT MESSAGE
  // =========================
  const addBot = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // =========================
  // ADD USER MESSAGE
  // =========================
  const addUser = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // =========================
  // AUTO SCROLL CHAT
  // =========================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, options]);

  // =========================
  // INITIAL BOT MESSAGE
  // =========================
  useEffect(() => {
    const timer1 = setTimeout(() => {
      addBot("👋 Welcome to Touch Simply AI");

      const timer2 = setTimeout(() => {
        addBot("How can I help you today?");

        setOptions([
          "Resume",
          "Portfolio",
          "Presentation",
          "Account",
          "Other",
        ]);
      }, BOT_DELAY);

      return () => clearTimeout(timer2);
    }, BOT_DELAY);

    return () => clearTimeout(timer1);
  }, []);

  // =========================
  // HANDLE OPTIONS
  // =========================
  const handleOption = (option) => {
    addUser(option);

    setOptions([]);

    setTimeout(() => {
      // MAIN MENU
      if (step === "MAIN") {
        if (option === "Other") {
          addBot("Please type your question below.");

          setStep("INPUT");
        } else {
          addBot(`Select ${option} option`);

          setOptions(OPTIONS[option]);

          setStep(option);
        }
      }

      // SUB OPTIONS
      else {
        let reply =
          `✨ ${option} feature is available in Touch Simply.`;

        // CUSTOM REPLIES
        if (option === "Create Resume") {
          reply =
            "You can create professional ATS friendly resumes easily.";
        }

        if (option === "Create Portfolio") {
          reply =
            "Portfolio builder helps you create modern portfolio websites.";
        }

        if (option === "Create PPT") {
          reply =
            "Presentation builder supports beautiful slides with export options.";
        }

        if (option === "Download PDF") {
          reply =
            "You can export your resume as high quality PDF instantly.";
        }

        addBot(reply);

        setTimeout(() => {
          addBot("Anything else?");

          setOptions([
            "Resume",
            "Portfolio",
            "Presentation",
            "Account",
            "Other",
          ]);

          setStep("MAIN");
        }, BOT_DELAY);
      }
    }, BOT_DELAY);
  };

  // =========================
  // SEND CUSTOM MESSAGE
  // =========================
  const sendMessage = () => {
    if (!input.trim()) return;

    addUser(input);

    const text = input.toLowerCase();

    setInput("");

    setTimeout(() => {
      if (text.includes("resume")) {
        addBot(
          "You can create ATS friendly resumes using modern templates."
        );
      } else if (text.includes("portfolio")) {
        addBot(
          "You can build beautiful portfolios very easily."
        );
      } else if (text.includes("presentation")) {
        addBot(
          "Presentation builder supports PPT and PDF export."
        );
      } else if (text.includes("payment")) {
        addBot(
          "Please check your payment/subscription section."
        );
      } else if (text.includes("template")) {
        addBot(
          "We provide modern, creative and ATS optimized templates."
        );
      } else {
        addBot(
          "Our support team will help you shortly 🚀"
        );
      }

      setTimeout(() => {
        addBot("Anything else?");

        setOptions([
          "Resume",
          "Portfolio",
          "Presentation",
          "Account",
          "Other",
        ]);

        setStep("MAIN");
      }, BOT_DELAY);
    }, BOT_DELAY);
  };

  return (
    <div className="h-screen w-full bg-[#efeae2] flex flex-col overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-20">

        <div className="flex items-center gap-3">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-white/10 p-2 rounded-full transition"
          >
            <ArrowLeft size={20} />
          </button>

          {/* LOGO */}
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles size={20} />
          </div>

          {/* TITLE */}
          <div>
            <h2 className="font-semibold text-[15px]">
              Touch Simply AI
            </h2>

            <p className="text-xs text-green-200">
              online
            </p>
          </div>
        </div>

        {/* MENU */}
        <button className="hover:bg-white/10 p-2 rounded-full transition">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* ================= CHAT BODY ================= */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[82%] px-4 py-2 rounded-2xl shadow text-sm relative ${
                msg.from === "user"
                  ? "bg-[#dcf8c6] rounded-br-sm"
                  : "bg-white rounded-bl-sm"
              }`}
            >
              <div className="flex items-start gap-2">

                {/* ICON */}
                {msg.from === "bot" ? (
                  <Sparkles
                    size={15}
                    className="text-purple-600 mt-1"
                  />
                ) : (
                  <User
                    size={15}
                    className="text-gray-600 mt-1"
                  />
                )}

                {/* TEXT */}
                <div>
                  <p className="text-gray-800">
                    {msg.text}
                  </p>

                  <p className="text-[10px] text-gray-500 text-right mt-1">
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ================= OPTIONS ================= */}
        {options.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">

            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOption(opt)}
                className="bg-white border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-green-50 hover:border-green-400 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ================= INPUT AREA ================= */}
      <div className="bg-[#f0f2f5] px-3 py-2 flex items-center gap-2 sticky bottom-0">

        {/* ATTACH */}
        <button className="text-gray-500 hover:text-gray-700">
          <Paperclip size={22} />
        </button>

        {/* INPUT */}
        <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 shadow-sm">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
            placeholder="Type a message"
            className="flex-1 outline-none text-sm bg-transparent"
          />
        </div>

        {/* SEND BUTTON */}
        <button
          onClick={sendMessage}
          className="bg-[#075E54] text-white p-3 rounded-full hover:scale-105 transition"
        >
          {input ? (
            <Send size={18} />
          ) : (
            <Mic size={18} />
          )}
        </button>
      </div>
    </div>
  );
}