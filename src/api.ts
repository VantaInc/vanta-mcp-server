type BaseApiUrl =
  | "https://api.staging.vanta.com"
  | "https://api.eu.vanta.com"
  | "https://api.aus.vanta.com";

export function baseApiUrl(): string {
  // HACK: force MCP to run against local Vanta API.
  return "http://127.0.0.1:10290";
  if (process.env.REGION) {
    if (process.env.REGION === "eu") {
      return "https://api.eu.vanta.com";
    } else if (process.env.REGION === "aus") {
      return "https://api.aus.vanta.com";
    } else if (process.env.REGION === "us") {
      return "https://api.staging.vanta.com";
    }
    throw new Error(`Invalid region: ${process.env.REGION}`);
  }
  return "https://api.staging.vanta.com";
}
