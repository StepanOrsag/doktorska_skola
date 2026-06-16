import { useState, useEffect } from "react";
import "./EventForm.css";

function EventForm({ initialData, onSubmit, buttonLabel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [eventType, setType] = useState(initialData?.eventType || "SEMINAR");
  const [capacity, setCapacity] = useState(initialData?.capacity || "");
  const [startTime, setStartTime] = useState(initialData?.startTime || "");
  const [endTime, setEndTime] = useState(initialData?.endTime || "");
  const [date, setDate] = useState(initialData?.date || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setType(initialData.eventType || "SEMINAR");
      setCapacity(initialData.capacity || "");
      setStartTime(initialData.startTime || "");
      setEndTime(initialData.endTime || "");
      setDate(initialData.date || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      eventType,
      capacity: parseInt(capacity),
      startTime,
      endTime,
      date
    });
  };

  return (
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
        
        <input type="submit" value={buttonLabel} />
      </form>
    </div>
  );
}

export default EventForm;
