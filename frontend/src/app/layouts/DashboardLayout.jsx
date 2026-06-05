import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header";
import { Sidebar } from "../../widgets/sidebar";

function DashboardView() {
  const current_user_id = 2;
  return (
    <>
      <Header currentUserId={current_user_id} />
      <div id="main">
        <Sidebar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardView;
