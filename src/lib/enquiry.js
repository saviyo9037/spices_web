import { ENQUIRY_ENDPOINT, NEWSLETTER_ENDPOINT } from "./site";

/**
 * POSTs JSON to an endpoint. Returns { ok: true } on a 2xx response, or
 * { ok: false, reason } where reason is "not-configured" (no endpoint set) or "failed".
 * Nothing is ever reported as sent unless the server accepted it.
 */
async function postJson(endpoint, payload) {
  if (!endpoint) return { ok: false, reason: "not-configured" };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

/** Bulk enquiry. Body: { name, phone, email, product, quantity, unit, message } */
export function submitEnquiry(payload) {
  return postJson(ENQUIRY_ENDPOINT, payload);
}

/** Newsletter sign-up. Body: { email } */
export function submitNewsletter(payload) {
  return postJson(NEWSLETTER_ENDPOINT, payload);
}
