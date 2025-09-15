if (process.env.NEXT_PUBLIC_ENABLE_MSW === "true") {
  if (typeof window === "undefined") {
    // Node environment
    import("../lib/mocks/server").then(({ server }) => {
      server.listen();
    });
  } else {
    // Browser environment
    import("../lib/mocks/browser").then(({ worker }) => {
      worker.start();
    });
  }
}
