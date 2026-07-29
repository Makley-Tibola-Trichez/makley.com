export {};

declare global {
  interface Window {
    posthog?: {
      init(projectToken: string, config: Record<string, unknown>): void;
      capture(event: string, properties?: Record<string, unknown>): void;
    };
  }
}
