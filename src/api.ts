type BaseApiUrl =
  | "https://api.vanta.com"
  | "https://api.eu.vanta.com"
  | "https://api.aus.vanta.com";

export function baseApiUrl(): BaseApiUrl {
  if (process.env.REGION) {
    if (process.env.REGION === "eu") {
      return "https://api.eu.vanta.com";
    } else if (process.env.REGION === "aus") {
      return "https://api.aus.vanta.com";
    } else if (process.env.REGION === "us") {
      return "https://api.vanta.com";
    }
    throw new Error(`Invalid region: ${process.env.REGION}`);
  }
  return "https://api.vanta.com";
}
