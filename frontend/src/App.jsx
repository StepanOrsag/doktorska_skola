import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardView from "./views/DashboardView";
import Events from "./components/Events";
import Profile from "./components/Profile";
import NewEvent from "./components/NewEvent";

function App() {
  const current_user_id = 2;
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashboardView />}>
          <Route index element={<Events />} />
          <Route path="profil" element={<Profile />} />
          <Route path="nova-akce" element={<NewEvent />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;