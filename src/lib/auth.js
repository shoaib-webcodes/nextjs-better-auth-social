import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db-social');
// resend is a service for sending emails, you can use it to send verification emails, password reset emails, etc. You can sign up for a free account at https://resend.com and get your API key.
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  // Email verification
  emailVerification: {
   sendVerificationEmail: async ({ user, url }) => {
  console.log("Recipient email:", user?.email);

  if (!user?.email) {
    throw new Error("user.email is missing");
  }

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: user.email,
    subject: "Verify your email",
    html: `<p><a href="${url}">Verify your email</a></p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }
},
    sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 24*3600 // valid for 24 hours or 1 day
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});