import { Mail, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contacts = [
  { name: "John Doe", phone: "+1 (555) 123-4567", email: "john.doe@example.com" },
  { name: "John Doe", phone: "+1 (555) 123-4567", email: "john.doe@example.com" },
  { name: "John Doe", phone: "+1 (555) 123-4567", email: "john.doe@example.com" },
  { name: "Jane Smith", phone: "+1 (555) 987-6543", email: "jane.smith@example.com" },
  { name: "Jane Smith", phone: "+1 (555) 987-6543", email: "jane.smith@example.com" },
  { name: "Jane Smith", phone: "+1 (555) 987-6543", email: "jane.smith@example.com" },
  { name: "Michael Wright", phone: "+1 (555) 555-0192", email: "m.wright@example.com" },
  { name: "Michael Wright", phone: "+1 (555) 555-0192", email: "m.wright@example.com" },

];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = {
  JD: "bg-blue-100 text-blue-500",
  JS: "bg-violet-100 text-violet-500",
  MW: "bg-indigo-200 text-indigo-600",
};

export default function Contacts() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-slate-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Collected Contacts</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
          <Download size={14} />
          Export Data
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-500 uppercase tracking-wider">UserName</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-500 uppercase tracking-wider">Phone Number</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-500 uppercase tracking-wider">Email Address</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-blue-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => {
              const key = initials(c.name);
              const color = avatarColors[key] ?? "bg-slate-100 text-slate-500";
              return (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>
                        {key}
                      </div>
                      <span className="text-slate-700 font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">{c.phone}</td>
                  <td className="px-6 py-3.5 text-slate-500">{c.email}</td>
                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => navigate("/send")}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-md transition-colors"
                    >
                      <Mail size={12} />
                      Send Email
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}