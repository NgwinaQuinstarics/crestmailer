import { RefreshCw, CheckCircle } from "lucide-react";
import Sidebar from "./sidebar";

const mails = [
  { name: "John Doe", email: "john.doe@example.com", subject: "Welcome to our platform!", date: "Oct 24, 2023 10:30 AM" },
  { name: "Jane Smith", email: "jane.smith@example.com", subject: "Your account is ready", date: "Oct 23, 2023 02:15 PM" },
  { name: "Michael Wright", email: "m.wright@example.com", subject: "Update on your recent inquiry", date: "Oct 22, 2023 09:45 AM" },
  { name: "Emily Lawson", email: "emily.lawson@example.com", subject: "Weekly Newsletter - Issue #42", date: "Oct 20, 2023 04:00 PM" },
 
];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function SentMails() {
  return (
    <div className="flex-1 bg-slate-50 p-8">
      <div className="border-2 border-blue-400 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-dashed border-blue-300 bg-white">
          <h1 className="text-xl font-bold text-slate-800">Sent Mails</h1>
          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashed border-blue-200">
                <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">Recipient Name</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">Recipient Email</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">Subject</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">Date Sent</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {mails.map((mail, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-100 text-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                        {initials(mail.name)}
                      </div>
                      <span className="text-slate-700 font-medium">{mail.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{mail.email}</td>
                  <td className="px-6 py-4 text-slate-600">{mail.subject}</td>
                  <td className="px-6 py-4 text-slate-500">{mail.date}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-blue-500 text-xs font-medium">
                      <CheckCircle size={13} />
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}