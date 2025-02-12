export const E2E_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  INBUCKET_HOST: "http://127.0.0.1:54324",
  get INBUCKET_API() {
    return `${this.INBUCKET_HOST}/api/v1/mailbox`
  },
} as const
