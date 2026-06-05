import { NavLink } from "react-router-dom";
import { useEvents, EventCard } from "../../../entities/event";
import "./EventsPage.css";

function EventsPage() {
  const current_user_id = 2;
  const { events, participants, isLoading, error, handleRegister, handleUnregister } = useEvents(current_user_id);

  if (isLoading) return <div style={{ padding: "20px" }}>Načítám akce...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div className="events-page-wrapper">
      <div className="top-container">
        <h1>&gt; PŘEHLED AKCÍ</h1>
        <NavLink to="/nova-akce" className="btn btn-primary">PŘIDAT AKCI</NavLink>
      </div>

      <div className="events-list">
        {events.map((event) => {
          const eventParticipants = participants[event.id] || [];
          const isRegistered = eventParticipants.some((reg) => reg.user.id === current_user_id);

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
