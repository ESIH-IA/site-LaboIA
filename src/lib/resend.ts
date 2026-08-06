type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

type SendEmailResult = { ok: true } | { ok: false; error: string };

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.MESSAGING_URL_RESEND_API_KEY;
  const domain = process.env.MESSAGING_URL_RESEND_EMAIL_DOMAIN;

  if (!apiKey || !domain) {
    return { ok: false, error: "not_configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `LaCDIA <notifications.lacdia@${domain}>`,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("[resend] echec envoi email:", response.status, errText);
    return { ok: false, error: `http_${response.status}` };
  }

  return { ok: true };
}
