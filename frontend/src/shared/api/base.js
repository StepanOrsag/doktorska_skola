const API_BASE_URL = "http://localhost:8080/api";

export const apiClient = async (endpoint, options = {}) => {
  const { body, ...customConfig } = options;
  const headers = { "Content-Type": "application/json" };
  
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 403) throw new Error("Nemáte oprávnění k této akci.");
    const errorData = await response.text().catch(() => "Chyba serveru");
    throw new Error(errorData || "Chyba při komunikaci se serverem.");
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};
