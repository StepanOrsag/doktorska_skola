import { useState } from "react";
import { formatDate, formatTime } from "../../../shared/lib/formatters";
import "./EventCard.css";

function EventCard({ event, participants = [], isRegistered, actions }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentCount = participants.length;

  return (
    <div className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>

      <div className="event-header-row">
        <span
          className="event-occupancy"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Skrýt účastníky" : "Zobrazit účastníky"}
        >
          Obsazenost: {currentCount} / {event.capacity}
        </span>

        <span className="event-date">Datum: {formatDate(event.date)}</span>
        <span className="event-time">
          Čas: {formatTime(event.startTime)} - {formatTime(event.endTime)}
        </span>

        <div className="event-actions">
          {actions}
        </div>
      </div>

      {isExpanded && (
        <div className="participants-container">
          <h3 className="participants-title">Seznam přihlášených:</h3>
          {participants.length === 0 ? (
            <p className="participants-empty">Zatím není přihlášen žádný student.</p>
          ) : (
            <ul className="participants-list">
              {participants.map((reg) => (
                <li key={reg.id} className="participant-item">
                  {reg.user.fullName}
                  {reg.attended && <span className="participant-attended">✓ Přítomen</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default EventCard;
