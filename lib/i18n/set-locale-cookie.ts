/** Persists the user's language choice so the proxy's locale redirect honours it on the next extension-less request. */
export function setLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}
