/**
 * useBackendHealth — polls GET /api/v1/health every 30 s.
 * Returns one of: "checking" | "online" | "offline"
 */
import { useState, useEffect } from "react";

export function useBackendHealth() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    async function ping() {
      try {
        const res = await fetch("/health", {
          headers: { "ngrok-skip-browser-warning": "true" },
          signal: AbortSignal.timeout(5000),
        });
        if (!cancelled) setStatus(res.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setStatus("offline");
      }
    }

    ping();
    const id = setInterval(ping, 30_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return status;
}
