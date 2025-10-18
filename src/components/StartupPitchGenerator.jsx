import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Link } from "react-router";

const PitchCraft = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hey founder! I'm PitchCraft — your AI startup partner. Tell me your startup idea, and I’ll craft a name, tagline, pitch, audience, and landing page content for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setInput("");

    try {
      // Create a prompt that adjusts depending on whether it's the first idea or a follow-up
      const isFirstMessage =
        messages.length === 1 && messages[0].role === "assistant";

      const prompt = isFirstMessage
        ? `You are PitchCraft, an AI Startup Partner.
User's startup idea: "${input}"

Generate the following in clear formatted text:
1. **Startup Name & Tagline**
2. **3-line Startup Pitch**
3. **Target Audience**
4. **Landing Page Headline + Subtext**
5. **Call-to-Action Line**

Keep the tone visionary, inspiring, and investor-ready.`
        : input;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          ...messages.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      const reply = response.text; // ✅ Correct method
      const newAiMessage = { role: "assistant", text: reply };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (err) {
      console.error("❌ Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-white to-indigo-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-indigo-100 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">PitchCraft 🤖</h1>
          <p className="text-gray-500 text-sm">Your AI Startup Partner</p>
        </div>  
        <Link
          to="/login"
          className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 shadow-sm"
        >
          Login
        </Link>
      </div>


      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"
              }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm whitespace-pre-wrap leading-relaxed ${msg.role === "assistant"
                  ? "bg-white text-gray-800 border border-gray-200"
                  : "bg-indigo-600 text-white"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-500 px-4 py-2 rounded-2xl shadow-sm animate-pulse">
              PitchCraft is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-200 bg-white/70 backdrop-blur-lg p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your startup idea or ask for improvements..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`ml-3 px-6 py-3 rounded-2xl font-semibold text-white shadow-md transition ${loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PitchCraft;
