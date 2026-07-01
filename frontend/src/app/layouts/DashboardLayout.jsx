import { Outlet, Navigate } from "react-router-dom";
import { Header } from "../../widgets/header";
import { Sidebar } from "../../widgets/sidebar";
import { useAuth } from "../../features/auth";

function DashboardView() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <>
      <Header/>
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
