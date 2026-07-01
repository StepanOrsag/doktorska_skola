import { eventService } from "../../../entities/event";

export const useEventRegistration = (currentUserId, { onParticipantsChange } = {}) => {
  const handleRegister = async (eventId) => {
    try {
      const message = await eventService.register(eventId, currentUserId);
      alert(message);
      if (onParticipantsChange) onParticipantsChange(eventId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      const message = await eventService.unregister(eventId, currentUserId);
      alert(message);
      if (onParticipantsChange) onParticipantsChange(eventId);
    } catch (err) {
      alert(err.message);
    }
  };

  return { handleRegister, handleUnregister };
};
