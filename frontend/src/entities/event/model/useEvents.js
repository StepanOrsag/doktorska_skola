import { useState, useEffect } from "react";
import { eventService } from "../api/eventService";

export const useEvents = (currentUserId) => {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParticipants = async (eventId) => {
    try {
      const data = await eventService.getParticipants(eventId);
      setParticipants((prev) => ({ ...prev, [eventId]: data }));
    } catch (err) {
      console.error(err);
    }
  };

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getAll();
      setEvents(data);
      data.forEach((event) => fetchParticipants(event.id));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const message = await eventService.register(eventId, currentUserId);
      alert(message);
      fetchParticipants(eventId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      const message = await eventService.unregister(eventId, currentUserId);
      alert(message);
      fetchParticipants(eventId);
    } catch (err) {
      alert(err.message);
    }
  };

  return {
    events,
    participants,
    isLoading,
    error,
    handleRegister,
    handleUnregister,
    refreshEvents: loadEvents,
  };
};
