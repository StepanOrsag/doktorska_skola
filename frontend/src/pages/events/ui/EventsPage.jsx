import { NavLink } from "react-router-dom";
import { useEvents, EventCard } from "../../../entities/event";
import { useAuth } from "../../../entities/user";
import "./EventsPage.css";

function EventsPage() {
  const { user } = useAuth();

  const { events, participants, isLoading, error, handleRegister, handleUnregister } = useEvents(user.id);

  if (isLoading) return <div style={{ padding: "20px" }}>Načítám akce...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div className="events-page-wrapper">
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
                isRegistered ? (
                  <button onClick={() => handleUnregister(event.id)} className="btn btn-danger">Odhlásit se</button>
                ) : (
                  <button onClick={() => handleRegister(event.id)} className="btn btn-primary">Přihlásit se</button>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default EventsPage;
