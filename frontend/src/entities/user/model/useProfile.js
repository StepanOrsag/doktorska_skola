import { useState, useEffect } from "react";
import { userService } from "../api/userService";

export const useProfile = (userId) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const data = await userService.getProfile(userId);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) loadProfile();
  }, [userId]);

  return { user, isLoading, error };
};
