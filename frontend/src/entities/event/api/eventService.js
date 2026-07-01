import { apiClient } from "../../../shared/api/base";

export const eventService = {
  getAll: () => apiClient("/events"),
  
  create: (userId, eventData) => 
    apiClient(`/events?userId=${userId}`, { body: eventData }),

  getParticipants: (eventId) => 
    apiClient(`/registrations/event/${eventId}`),

  register: (eventId, userId) => 
    apiClient(`/registrations/register?eventId=${eventId}&userId=${userId}`, { method: "POST" }),

  unregister: (eventId, userId) => 
    apiClient(`/registrations/delete?eventId=${eventId}&userId=${userId}`, { method: "DELETE" }),

  getById: (eventId) =>
    apiClient(`/events/${eventId}`),

  update: (eventId, eventData) =>
    apiClient(`/events/${eventId}`, { 
      method: "PUT", 
      body: eventData 
    }),

    delete: (eventId) =>
    apiClient(`/events/${eventId}`, { 
      method: "DELETE" 
    }),
};
