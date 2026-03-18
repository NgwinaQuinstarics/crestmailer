import { Users, Mail, Send } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-blue-400 p-6 fixed top-20 left-0 h-[calc(100vh-5rem)]">
      
      <nav className="space-y-4">
        
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-violet-500 ${
              isActive
                ? "bg-violet-100 font-medium"
                : "hover:bg-violet-100"
            }`
          }
        >
          <Users size={18} />
          Contacts
        </NavLink>

        <NavLink
          to="/send"
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-violet-500 ${
              isActive
                ? "bg-violet-100 font-medium"
                : "hover:bg-violet-100"
            }`
          }
        >
          <Mail size={18} />
          Mails
        </NavLink>

        <NavLink
          to="/compose"
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-violet-500 ${
              isActive
                ? "bg-violet-100 font-medium"
                : "hover:bg-violet-100"
            }`
          }
        >
          <Send size={18} />
          Send Mail
        </NavLink>

      </nav>
    </aside>
  );
}