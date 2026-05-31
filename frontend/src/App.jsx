import { useState, useEffect } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        data.forEach(event => fetchParticipants(event.id));
      })
      .catch(error => console.error("Chyba načítání dat:", error))
  }, [])

  const handleRegister = (eventId) => {
    const userId = 2;

    fetch(`http://localhost:8080/api/registrations/register?eventId=${eventId}&userId=${userId}`, {
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
    const userId =2;

    fetch(`http://localhost:8080/api/registrations/delete?eventId=${eventId}&userId=${userId}`, {
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

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Doktorská škola - Akce</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {events.map(event => {
          
          const currentCount = participants[event.id] ? participants[event.id].length : "0";

          return (
            <div key={event.id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
              <h2 style={{ marginTop: "0", color: "#2c3e50" }}>{event.title}</h2>
              <p>{event.description}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                <span style={{ background: "#e8f4f8", padding: "5px 10px", borderRadius: "15px", fontSize: "0.9em", fontWeight: "bold" }}>
                  Obsazenost: {currentCount} / {event.capacity}
                </span>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => toggleParticipants(event.id)} style={{ padding: "10px 20px", background: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    {expanded[event.id] ? "Sbalit účastníky" : "Zobrazit účastníky"}
                  </button>
                  <button onClick={() => handleRegister(event.id)} style={{ padding: "10px 20px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Přihlásit se
                  </button>
                  <button onClick={() => handleUnregister(event.id)} style={{ padding: "10px 20px", background: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Odhlásit se
                  </button>
                </div>
              </div>

              {expanded[event.id] && (
                <div style={{ marginTop: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "5px", borderLeft: "4px solid #007bff" }}>
                  <h3 style={{ marginTop: "0", fontSize: "1.1em" }}>Seznam přihlášených:</h3>
                  {participants[event.id]?.length === 0 ? (
                    <p style={{ fontStyle: "italic", color: "#666" }}>Zatím není přihlášen žádný student.</p>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {participants[event.id]?.map(reg => (
                        <li key={reg.id} style={{ margin: "5px 0" }}>
                          {reg.user.fullName}
                          {reg.attended && <span style={{ marginLeft: "10px", color: "green", fontWeight: "bold" }}>✓ Přítomen</span>}
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

export default App;