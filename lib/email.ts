import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  const { data, error } = await resend.emails.send({
    from: "ScriptEdge <onboarding@resend.dev>",
    to: email,
    subject: "Reset your ScriptEdge password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset your ScriptEdge password</h2>

        <p>We received a request to reset your ScriptEdge password.</p>

        <p>
          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#000;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>
        </p>

        <p>If you didn't request this, you can safely ignore this email.</p>

        <p>— ScriptEdge Team</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error("Failed to send password reset email");
  }

  return data;
}