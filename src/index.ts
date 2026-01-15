#!/usr/bin/env node

import { createHttpServer } from "./server/http.js";

const PORT = parseInt(process.env.PORT ?? "3000", 10);
const ISSUER_URL = process.env.ISSUER_URL ?? `http://localhost:${String(PORT)}`;
const VANTA_AUTH_SERVER =
  process.env.VANTA_AUTH_SERVER ?? "https://app.vanta.com";

function main(): void {
  const app = createHttpServer({
    issuerUrl: ISSUER_URL,
    vantaAuthServer: VANTA_AUTH_SERVER,
  });

  app.listen(PORT, () => {
    console.error(`Vanta MCP Server running on port ${String(PORT)}`);
    console.error(
      `Resource metadata: ${ISSUER_URL}/.well-known/oauth-protected-resource`,
    );
  });
}

process.on("SIGINT", () => {
  console.error("Shutting down Vanta MCP Server...");
  process.exit(0);
});

main();
