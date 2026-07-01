import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { eventService } from "../../../entities/event";
import { EventForm } from "../../../features/event-form";
import { useAuth } from "../../../features/auth";
import { PageWrapper, Breadcrumb } from "../../../shared/ui";

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
    <PageWrapper>
      <Breadcrumb current="NOVÁ AKCE" />
      <EventForm onSubmit={handleCreate} buttonLabel="VYTVOŘIT AKCI" />
    </PageWrapper>
  );
}

export default NewEventPage;
