import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink, Navigate } from "react-router-dom";
import { eventService, EventForm } from "../../../entities/event";
import { useAuth } from "../../../entities/user";
import "./EditEvent.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  if (user?.role !== 'ORGANIZATOR') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventService.getById(id);
        setEvent(data);
      } catch (error) {
        alert("Chyba při načítání akce: " + error.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleUpdate = async (eventData) => {
    try {
      const message = await eventService.update(id, eventData);
      alert("Úspěch: " + message);
      navigate(`/akce/${id}`);
    } catch (error) {
      alert("Chyba při ukládání: " + error.message);
    }
  };

  if (loading) return <div className="loading">Načítám data akce...</div>;

  return (
    <div className="new-event-wrapper">
      <div className="navlink-container">
        <NavLink to="/" className="nav-link">PŘEHLED AKCÍ</NavLink>
        <h1> &gt; UPRAVIT AKCI</h1>
      </div>
      {event && (
        <EventForm 
          initialData={event} 
          onSubmit={handleUpdate} 
          buttonLabel="ULOŽIT ZMĚNY" 
        />
      )}
    </div>
  );
}

export default EditEvent;
