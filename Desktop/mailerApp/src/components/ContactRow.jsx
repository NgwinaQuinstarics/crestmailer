import React from "react";

export default function ContactRow({ name, phone, email }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <tr className="border-t">
      <td className="py-4 px-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <span className="font-medium text-gray-700">{name}</span>
      </td>
      <td className="py-4 text-gray-600">{phone}</td>
      <td className="py-4 text-gray-600">{email}</td>
      <td className="py-4 text-right pr-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Send Email
        </button>
      </td>
    </tr>
  );
}