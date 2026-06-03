import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Events.css";

function Events() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [expanded, setExpanded] = useState({});

    const current_user_id = 2;

    useEffect(() => {
        fetch("http://localhost:8080/api/events")
        .then(response => {
          if (!response.ok) {
            throw new Error("Chyba při komunikaci se serverem.");
          }
          return response.json();
        })
        .then(data => {
          setEvents(data);
          setIsLoading(false);
          data.forEach(event => fetchParticipants(event.id));
        })
        .catch(error => {
          console.error("Chyba při načítání akcí:", error);
          setError("Akce se nepodařilo načíst, zkontroluje připojení k serveru.");
          setIsLoading(false);
        });
    }, []);

    const handleRegister = (eventId) => {
        fetch(`http://localhost:8080/api/registrations/register?eventId=${eventId}&userId=${current_user_id}`, {
        method: "POST",
        })
        .then(response => response.text())
        .then(message => {
        alert(message);
        fetchParticipants(eventId);
        })
        .catch(error => {
        console.error("Chyba při registraci:", error);
        alert("Došlo k chybě při komunikaci se serverem.");
        });
    };

    const handleUnregister = (eventId) => {
        fetch(`http://localhost:8080/api/registrations/delete?eventId=${eventId}&userId=${current_user_id}`, {
        method: "DELETE",
        })
        .then(response => response.text())
        .then(message => {
        alert(message);
            fetchParticipants(eventId);
        })
        .catch(error => {
        console.error("Chyba při odhlašování:", error);
        alert("Došlo k chybě při komunikaci se serverem.")
        })
    };

    const fetchParticipants = (eventId) => {
        fetch(`http://localhost:8080/api/registrations/event/${eventId}`)
        .then(response => response.json())
        .then(data => {
            setParticipants(prev => ({...prev, [eventId]: data}));
        })
        .catch(error => console.error("Chyba načítání účastníků:", error));
    };

    const toggleParticipants = (eventId) => {
        setExpanded(prev => ({...prev, [eventId]: !prev[eventId]}));
    };

    if (isLoading) {
        return <div style={{ padding: "20px" }}>Načítám akce...</div>;
    }

    if (error) {
        return <div style={{ padding: "20px", color: "red" }}>Akce se nepodařilo načíst.</div>;
    }

    return (
    <div>
      <div className="events-wrapper">
        <div className = "top-container">
          <h1>&gt; PŘEHLED AKCÍ</h1>
          <button className= "btn btn-primary"><NavLink to="/nova-akce" id="navlink">PŘIDAT AKCI</NavLink></button>
        </div>
        {events.map(event => {
          
          const currentCount = participants[event.id] ? participants[event.id].length : "0";
          const isRegistered = participants[event.id]?.some(reg => reg.user.id === current_user_id);

          return (
            <div key={event.id} className="event-card">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              
              <div className="event-header-row">
                
                <span className="event-occupancy">
                  Obsazenost: {currentCount} / {event.capacity}
                </span>

                <div className="event-actions">
                  <button onClick={() => toggleParticipants(event.id)} className="btn btn-secondary">
                    {expanded[event.id] ? "Sbalit účastníky" : "Zobrazit účastníky"}
                  </button>
                  {isRegistered ? (
                    <button onClick={() => handleUnregister(event.id)} className="btn btn-danger">
                    Odhlásit se
                  </button>
                  ) : (
                    <button onClick={() => handleRegister(event.id)} className="btn btn-primary">
                    Přihlásit se
                  </button>
                  )}
                </div>
              </div>

              {expanded[event.id] && (
                <div className = "participants-container">
                  <h3 className="participants-title">Seznam přihlášených:</h3>
                  {participants[event.id]?.length === 0 ? (
                    <p className="participants-empty">Zatím není přihlášen žádný student.</p>
                  ) : (
                    <ul className="participants-list">
                      {participants[event.id]?.map(reg => (
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
        })}
      </div>
      </div>
    );
}

export default Events;