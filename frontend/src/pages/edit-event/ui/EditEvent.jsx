import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { eventService } from "../../../entities/event";
import { EventForm } from "../../../features/event-form";
import { useAuth } from "../../../features/auth";
import { PageWrapper, Breadcrumb } from "../../../shared/ui";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (user?.role !== 'ORGANIZATOR') {
    return <Navigate to="/" replace />;
  }

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
    <PageWrapper>
      <Breadcrumb current="UPRAVIT AKCI" />
      {event && (
        <EventForm 
          initialData={event} 
          onSubmit={handleUpdate} 
          buttonLabel="ULOŽIT ZMĚNY" 
        />
      )}
    </PageWrapper>
  );
}

export default EditEvent;

