import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { eventService } from "../../../entities/event";
import "./NewEventPage.css";

function NewEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setType] = useState("SEMINAR");
  const [capacity, setCapacity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const userJson = localStorage.getItem("user");
  const currentUser = userJson ? JSON.parse(userJson) : null;

  if (currentUser?.role !== 'ORGANIZATOR') {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await eventService.create(currentUser.id, {
        title, description, eventType, capacity: parseInt(capacity), startTime, endTime, date
      });
      alert("Úspěch: " + message);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="new-event-wrapper">
      <div className="navlink-container">
        <NavLink to="/" className="nav-link">PŘEHLED AKCÍ</NavLink>
        <h1> &gt; NOVÁ AKCE</h1>
      </div>
      <div className="new-event-form-container">
        <form onSubmit={handleSubmit}>
          <label>Název akce:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>Popis akce:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          <label>Typ akce:</label>
          <select value={eventType} onChange={(e) => setType(e.target.value)}>
            <option value="SEMINAR">Seminář</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="CONFERENCE">Konference</option>
          </select>
          <label>Datum akce:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <label>Začátek akce:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          <label>Konec akce:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          <label>Kapacita:</label>
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
          <input type="submit" value="VYTVOŘIT AKCI" />
        </form>
      </div>
    </div>
  );
}

export default NewEventPage;
