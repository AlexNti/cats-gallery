import { ApiSuccessOrError } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string {
  const fullUrl = `${API_BASE_URL}/${API_VERSION}${endpoint}`;
  const url = new URL(fullUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

async function apiRequest<T>(url: string): Promise<ApiSuccessOrError<T>> {
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        status: response.status,
        ok: response.ok,
        error: {
          message: data.message || "Request failed",
        },
      };
    }

    return {
      data,
      status: response.status,
      ok: response.ok,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      ok: false,
      error: {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
    };
  }
}

export const http = {
  async get<T>(url: string): Promise<ApiSuccessOrError<T>> {
    return apiRequest<T>(url);
  },
};
