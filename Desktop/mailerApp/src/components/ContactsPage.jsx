import Sidebar from "./sidebar";
import Header from "./header";
import ContactsTable from "./ContactsTable";

export default function ContactsPage() {

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-10">

        <Header />

        <div className="flex justify-end mb-6">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Export Data
          </button>
        </div>

        <ContactsTable />

      </main>

    </div>
  );
}