import { vi } from "vitest";
import { FetchLike } from "../src/index.js";

export type CapturedRequest = {
  url: string;
  init?: RequestInit;
};

export function createMockFetch(body: unknown = { ok: true }, status = 200) {
  const calls: CapturedRequest[] = [];
  const fetchMock: FetchLike = vi.fn(async (input, init) => {
    calls.push({ url: String(input), init });
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json", "x-request-id": "req-1" },
    });
  });

  return { fetchMock, calls };
}
