import { Navigate } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { eventService, EventForm } from "../../../entities/event";
import { useAuth } from "../../../entities/user";
import "./NewEventPage.css";

function NewEventPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.role !== 'ORGANIZATOR') {
    return <Navigate to="/" replace />;
  }

  const handleCreate = async (eventData) => {
    try {
      const message = await eventService.create(user.id, eventData);
      alert("Úspěch: " + message);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="new-event-wrapper">
      <div className="navlink-container">
        <NavLink to="/" className="nav-link">PŘEHLED AKCÍ</NavLink>
        <h1> &gt; NOVÁ AKCE</h1>
      </div>
      <EventForm onSubmit={handleCreate} buttonLabel="VYTVOŘIT AKCI" />
    </div>
  );
}

export default NewEventPage;
