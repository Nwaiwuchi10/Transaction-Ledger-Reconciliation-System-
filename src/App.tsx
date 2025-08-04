import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardBody from "./dashboard/DashboardBody";
import Reconciliation from "./components/ReconcileLedger/PostReconcile";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<DashboardBody />} />
          <Route path="/reconcile" element={<Reconciliation />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
