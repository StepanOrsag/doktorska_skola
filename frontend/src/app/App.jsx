import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { EventsPage } from "../pages/events";
import { ProfilePage } from "../pages/profile";
import { NewEventPage } from "../pages/new-event";
import { LoginPage } from "../pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<EventsPage />} />
          <Route path="profil" element={<ProfilePage />} />
          <Route path="nova-akce" element={<NewEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
