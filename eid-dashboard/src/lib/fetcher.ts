const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  try {
    return await response.json();
  } catch {
    return null;
  }
};