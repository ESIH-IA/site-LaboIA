import { createHash } from "node:crypto";

import { ClientError } from "@sanity/client";
import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";

export { isSanityWriteConfigured };

export function subscriberId(email: string): string {
  const hash = createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 24);
  return `newsletter-${hash}`;
}

export async function upsertSubscriber(email: string): Promise<void> {
  if (!sanityWriteClient) throw new Error("Sanity write client non configure");
  const id = subscriberId(email);
  const now = new Date().toISOString();

  await sanityWriteClient.createIfNotExists({
    _id: id,
    _type: "newsletterSubscriber",
    email: email.trim().toLowerCase(),
    status: "subscribed",
    subscribedAt: now,
  });

  await sanityWriteClient
    .patch(id)
    .set({ status: "subscribed", subscribedAt: now })
    .unset(["unsubscribedAt"])
    .commit();
}

export async function unsubscribeByEmail(email: string): Promise<void> {
  if (!sanityWriteClient) throw new Error("Sanity write client non configure");
  const id = subscriberId(email);
  const now = new Date().toISOString();

  try {
    await sanityWriteClient
      .patch(id)
      .set({ status: "unsubscribed", unsubscribedAt: now })
      .commit();
  } catch (error) {
    // Email jamais abonne (statusCode 404) : ignore silencieusement, pas de fuite
    // d'info sur qui est abonne (comportement idempotent).
    // Toute autre erreur (token invalide, reseau, rate-limit) est re-levee.
    if (error instanceof ClientError && error.statusCode === 404) {
      return;
    }
    throw error;
  }
}
