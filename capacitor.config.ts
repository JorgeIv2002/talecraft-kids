import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.talecraft.kids",
  appName: "TaleCraft Kids",
  webDir: "public",
  server: {
    // URL en producción de Vercel para streaming de narración y actualizaciones inmediatas
    url: "https://talecraft-kids.vercel.app",
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    backgroundColor: "#FAF7F2",
  },
};

export default config;
