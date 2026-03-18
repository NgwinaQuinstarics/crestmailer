import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import RegisterForm from "./components/RegisterForm";
import ContactsTable from "./components/ContactsTable";
import ComposeMails from "./components/ComposeMails";
import SendMails from "./components/SendMails";

function App() {
  return (
    <Router>
      <Routes>

        {/* Pages WITHOUT layout */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Pages WITH layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/compose" replace />} />
          <Route path="/contacts" element={<ContactsTable />} />
          <Route path="/compose" element={<ComposeMails />} />
          <Route path="/send" element={<SendMails />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;