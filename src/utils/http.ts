import { ApiSuccessOrError } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type CacheOptions = "force-cache" | "no-store";

type NextOptions = { tags?: string[]; revalidate?: number };

type RequestConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  cache?: CacheOptions;
  next?: NextOptions;
};

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

async function apiRequest<T>(
  url: string,
  requestConfig?: RequestConfig
): Promise<ApiSuccessOrError<T>> {
  const { cache, ...fetchConfig } = requestConfig || {};

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY && {
        "x-api-key": API_KEY,
      }),
    },
    ...fetchConfig,

    ...(typeof cache === "string" && { cache }),
  } as const;

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

export const http = Object.freeze({
  async get<T>(
    url: string,
    { cache, next }: { cache?: CacheOptions; next?: NextOptions } = {}
  ): Promise<ApiSuccessOrError<T>> {
    return apiRequest<T>(url, { cache, next });
  },
  async post<T, D = unknown>(
    url: string,
    data: D,
    { cache, next }: { cache?: CacheOptions; next?: NextOptions } = {}
  ): Promise<ApiSuccessOrError<T>> {
    return apiRequest<T>(url, {
      method: "POST",
      body: JSON.stringify(data),
      cache,
      next,
    });
  },
  async delete<T>(
    url: string,
    { cache, next }: { cache?: CacheOptions; next?: NextOptions } = {}
  ): Promise<ApiSuccessOrError<T>> {
    return apiRequest<T>(url, {
      method: "DELETE",
      cache,
      next,
    });
  },
});
