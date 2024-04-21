// globals.d.ts
namespace NodeJS {
  interface ProcessEnv {
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    DATABASE_URL: string;
    RESEND_FROM_MAIL: string;
    RESEND_API_KEY: string;
  }
}
