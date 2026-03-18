import { Send } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";

export default function ComposeMail() {
  const [form, setForm] = useState({ to: "", subject: "", body: "" });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSend = () => {
    console.log("Sending:", form);
  };

  return (
    <div className="flex-1 bg-slate-50 p-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Compose New Email</h1>

      <div className="flex flex-col gap-7 max-w-4xl">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            To (Email Address)
          </label>
          <input
            type="email"
            placeholder="recipient@example.com"
            value={form.to}
            onChange={set("to")}
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter email subject..."
            value={form.subject}
            onChange={set("subject")}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Message Body
          </label>
          <textarea
            rows={9}
            placeholder="Type your message here..."
            value={form.body}
            onChange={set("body")}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
          />
        </div>

        <button
          onClick={handleSend}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-4 rounded-lg transition-colors"
        >
          <Send size={15} />
          Send Email
        </button>
      </div>
    </div>
  );
}