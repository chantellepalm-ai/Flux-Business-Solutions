// Extend the Env interface with additional secrets
declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;
    ADMIN_EMAIL?: string;
  }
}
