import * as bcrypt from 'bcryptjs';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

import { env } from '@/configs';
import { db } from '@/db/drizzle';

// your drizzle instance

export const auth = betterAuth({
  appName: 'Nusa',
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  trustedOrigins: env.TRUSTED_ORIGINS,
  plugins: [openAPI()],
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url, token }) => {
  //     // TODO: Send verification email to user
  //   },
  //   sendOnSignUp: true,
  //   sendOnSignIn: true,
  //   autoSignInAfterVerification: true,
  //   expiresIn: 3600, // 1 hour
  // },
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: false,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true,
    // sendResetPassword: async ({ user, url, token }) => {
    //   // TODO: Send reset password email
    // },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
    password: {
      hash: async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
      },
      verify: async ({ hash, password }) => {
        const isValid = await bcrypt.compare(password, hash);
        return isValid;
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  user: {
    modelName: 'user',
    additionalFields: {
      address: {
        type: 'string',
      },
      storeName: {
        type: 'string',
      },
      businessId: {
        type: 'string',
      },
      businessType: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
      province: {
        type: 'string',
      },
      phoneNumber: {
        type: 'string',
      },
    },
    changeEmail: {
      enabled: true,
      // sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
      //   // TODO: Send change email verification
      // },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  cors: {
    origin: env.ALLOWED_ORIGINS,
    credentials: true,
  },
  cookies: {
    sessionToken: {
      name: 'nusa-session',
      options: {
        httpOnly: true,
        sameSite: 'lax', // or "strict" for same-site only
        secure: process.env.NODE_ENV === 'production', // true in production
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      partitioned: true,
    },
  },
  logger: {
    disabled: false,
    level: 'info',
    log: (level, message, ...args) => {
      // Custom logging implementation
      console.log(`[${level}] ${message}`, ...args);
    },
  },
});
