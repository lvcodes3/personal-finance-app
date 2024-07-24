import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { FinancialRecordProvider } from "./contexts/financialRecordContext";

import Dashboard from "./pages/dashboard";
import Landing from "./pages/landing";

import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="text-white bg-slate-800">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordProvider>
                <Dashboard />
              </FinancialRecordProvider>
            }
          />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
