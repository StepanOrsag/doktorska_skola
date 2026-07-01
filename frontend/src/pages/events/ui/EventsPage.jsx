import { NavLink } from "react-router-dom";
import { useEvents, EventCard } from "../../../entities/event";
import { useAuth } from "../../../features/auth";
import { useEventRegistration } from "../../../features/event-registration";
import { PageWrapper } from "../../../shared/ui";
import "./EventsPage.css";

function EventsPage() {
  const { user } = useAuth();

  const { events, participants, isLoading, error, fetchParticipants } = useEvents();
  const { handleRegister, handleUnregister } = useEventRegistration(user.id, {
    onParticipantsChange: fetchParticipants,
  });

  if (isLoading) return <div className="loading">Načítám akce...</div>;
  if (error) return <div className="loading" style={{ color: "red" }}>{error}</div>;

  return (
    <PageWrapper>
      <div className="top-container">
        <h1>&gt; PŘEHLED AKCÍ</h1>
        {user?.role === 'ORGANIZATOR' && (
          <NavLink to="/nova-akce" className="btn btn-primary">PŘIDAT AKCI</NavLink>
        )}
      </div>

      <div className="events-list">
        {events.map((event) => {
          const eventParticipants = participants[event.id] || [];
          const isRegistered = eventParticipants.some((reg) => reg.user.id === user.id);

          return (
            <EventCard
              key={event.id}
              event={event}
              participants={eventParticipants}
              actions={
                <>
                  <NavLink to={`/akce/${event.id}`} className="btn btn-secondary">Detail akce</NavLink>
                {isRegistered ? (
                    <button onClick={() => handleUnregister(event.id)} className="btn btn-danger">Odhlásit se</button>
                  ) : (
                    <button onClick={() => handleRegister(event.id)} className="btn btn-primary">Přihlásit se</button>
                  )}
                </>
              }
            />
          );
        })}
      </div>
    </PageWrapper>
  );
}

export default EventsPage;

