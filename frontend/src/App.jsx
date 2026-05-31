import { useState, useEffect } from "react";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error("Chyba načítání dat:", error))
  }, [])

  const handleRegister = (eventId) => {
    const userId = 3;

    fetch(`http://localhost:8080/api/registrations/register?eventId=${eventId}&userId=${userId}`, {
      method: "POST",
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
      })
      .catch(error => {
        console.error("Chyba při registraci", error);
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
    })
    .catch(error => {
      console.error("Chyba při odhlašování", error);
      alert("Došlo k chybě při komunikaci se serverem.")
    })
  }

  return (
    <div style = {{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style = {{ textAlign: "center" }}>Doktorská škola - Akce</h1>

      <div style = {{ display: "flex", flexDirection: "column", gap: "15px"}}>
        {events.map(event => (
          <div key = {event.id} style= {{border: "1px solid #ccc", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"}}>
            <h2 style = {{ marginTop: "0", color: "#2c3e50", }}>{event.title}</h2>
            <p>{event.description}</p>
            <div style = {{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <span style= {{background: "#e8f4f8", padding: "5px 10px", borderRadius: "15px", fontSize: "0.9em"}}>
                Kapacita: {event.capacity}
              </span>
              <button
                  onClick={() => handleUnregister(event.id)}
                  style = {{ padding: "10px 20px", background: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}>
                Odhlásit se
              </button>
              <button 
                  onClick={() => handleRegister(event.id)}
                  style = {{ padding: "10px 20px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}>
                Přihlásit se
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;