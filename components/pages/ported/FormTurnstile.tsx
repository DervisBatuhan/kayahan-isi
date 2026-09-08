"use client";

import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile for the public forms. When `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
 * is not set (local dev), it renders nothing and `ready` is always true — the
 * server also skips verification when its secret is unset.
 */
export function useTurnstile() {
  const ref = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState<string | null>(null);
  const enabled = Boolean(SITE_KEY);

  const widget = enabled ? (
    <div className="up-turnstile">
      <Turnstile
        ref={ref}
        siteKey={SITE_KEY as string}
        onSuccess={setToken}
        onExpire={() => setToken(null)}
        onError={() => setToken(null)}
        options={{ theme: "light", size: "flexible" }}
      />
    </div>
  ) : null;

  return {
    widget,
    enabled,
    token: token ?? undefined,
    /** true when Turnstile is off, or a fresh token is available */
    ready: !enabled || Boolean(token),
    /** call after a submit — Turnstile tokens are single-use */
    reset: () => {
      ref.current?.reset();
      setToken(null);
    },
  };
}
