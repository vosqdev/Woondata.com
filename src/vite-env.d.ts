/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SITE_MODE?: string;
  readonly APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
