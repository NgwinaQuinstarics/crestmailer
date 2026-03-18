export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8">

      <h1 className="text-2xl font-semibold text-gray-800">
        Collected Contacts
      </h1>

      <div className="flex items-center gap-6">

        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
          AD
        </div>

        <button className="border px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          Log Out
        </button>

      </div>
    </header>
  );
}