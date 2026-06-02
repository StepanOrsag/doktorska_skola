import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function DashboardView() {
  const current_user_id = 2;
  return (
  <>
    <Header currentUserId={current_user_id} />

    <div id = "main">
      <Sidebar />

      <div className="content-area">
        <Outlet />
      </div>
    </div>
  </>
  );
}

export default DashboardView;