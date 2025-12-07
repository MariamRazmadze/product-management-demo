import { API_BASE_URL } from "../config/env";
import { loadToken } from "./storage";

type RequestOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: HeadersInit;
  token?: string;
};

const DEFAULT_HEADERS: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function getHeaders(customHeaders?: HeadersInit, token?: string): HeadersInit {
  const authToken = token || loadToken();
  return {
    ...DEFAULT_HEADERS,
    ...(customHeaders || {}),
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };
}

export async function apiRequest<T>({
  path,
  method = "GET",
  body,
  headers,
  token,
}: RequestOptions): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method,
    headers: getHeaders(headers, token),
    ...(body && { body: JSON.stringify(body) }),
  });

  let data;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorMsg =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}
