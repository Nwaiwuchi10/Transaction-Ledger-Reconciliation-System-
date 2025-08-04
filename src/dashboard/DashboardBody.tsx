import AdminDashboard from "./Dashboard";
import CSVUploadForm from "../components/ledgerUpload/UploadLedger";
import PaginatedTransactions from "../components/FetchLedger/FetchLedger";

const DashboardBody = () => {
  return (
    <AdminDashboard>
      <div>
        <CSVUploadForm />
      </div>
      <div style={{ marginTop: "60px" }}>
        <PaginatedTransactions />
      </div>
    </AdminDashboard>
  );
};

export default DashboardBody;
