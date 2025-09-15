import { server } from "@/lib/mocks/server";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    get: vi.fn(() => ({ value: "test-token" })),
    set: vi.fn(),
    delete: vi.fn(),
    has: vi.fn(),
    clear: vi.fn(),
  }),
}));

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "warn",
  })
);
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

global.ResizeObserver = class ResizeObserver {
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;

  constructor(
    callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void
  ) {
    this.callback = callback;
  }

  observe() {
    // we are simulating a resize
    this.callback(
      [
        {
          contentRect: { width: 100, height: 100 },
        } as unknown as ResizeObserverEntry,
      ],
      this
    );
  }

  unobserve() {}
  disconnect() {}
};
