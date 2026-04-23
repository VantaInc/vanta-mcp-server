import fs from "node:fs";
import { BASE_API_URL } from "./api.js";
import { z } from "zod";

const VANTA_API_SCOPE = "vanta-api.all:read";

interface OAuthCredentials {
  client_id: string;
  client_secret: string;
}

interface TokenInfo {
  token: string;
  expiresAt: number;
}

let currentToken: TokenInfo | null = null;

const TokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

/**
 * Loads OAuth credentials, preferring environment variables over a credentials file.
 *
 * Resolution order:
 * 1. VANTA_MCP_CLIENT_ID + VANTA_MCP_CLIENT_SECRET environment variables (both required)
 * 2. Credentials file at the path specified by VANTA_ENV_FILE
 *
 * @throws {Error} If no credentials can be resolved, the file cannot be read, or validation fails.
 * @returns {OAuthCredentials} The loaded and validated credentials.
 */
function loadCredentials(): OAuthCredentials {
  const clientIdFromEnv = process.env.VANTA_MCP_CLIENT_ID;
  const clientSecretFromEnv = process.env.VANTA_MCP_CLIENT_SECRET;

  if (clientIdFromEnv && clientSecretFromEnv) {
    return {
      client_id: clientIdFromEnv,
      client_secret: clientSecretFromEnv,
    };
  }

  if (clientIdFromEnv !== undefined || clientSecretFromEnv !== undefined) {
    console.error(
      "Warning: Only one of VANTA_MCP_CLIENT_ID or VANTA_MCP_CLIENT_SECRET is set. Both are required to use environment variable credentials. Falling back to file-based credentials.",
    );
  }

  const envFile = process.env.VANTA_ENV_FILE;
  if (!envFile) {
    throw new Error(
      "No credentials configured. Either set both VANTA_MCP_CLIENT_ID and VANTA_MCP_CLIENT_SECRET environment variables, or set VANTA_ENV_FILE to point to a credentials file.",
    );
  }

  const CredentialsSchema = z.object({
    client_id: z.string(),
    client_secret: z.string(),
  });

  try {
    const data = fs.readFileSync(envFile, "utf8");
    const parsed = CredentialsSchema.parse(JSON.parse(data));
    return parsed;
  } catch (error) {
    throw new Error(
      `Failed to load credentials from ${envFile}: ${String(error)}`,
    );
  }
}

/**
 * Fetches a new OAuth token from the Vanta API using client credentials.
 * Validates the response using a Zod schema.
 * @throws {Error} If the fetch fails or the response is invalid.
 * @returns {Promise<TokenInfo>} The token and its expiration time.
 */
async function fetchNewToken(): Promise<TokenInfo> {
  const credentials = loadCredentials();

  const response = await fetch(`${BASE_API_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      grant_type: "client_credentials",
      scope: VANTA_API_SCOPE,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OAuth token request failed: ${response.status.toString()} ${response.statusText} - ${errorText}`,
    );
  }

  const tokenResponse = TokenResponseSchema.parse(await response.json());

  const expiresAt = Date.now() + tokenResponse.expires_in * 1000 - 60000; // Subtract 1 minute buffer

  return {
    token: tokenResponse.access_token,
    expiresAt,
  };
}

/**
 * Checks if the provided token is expired based on its expiration timestamp.
 * @param {TokenInfo} tokenInfo - The token information to check.
 * @returns {boolean} True if the token is expired, false otherwise.
 */
function isTokenExpired(tokenInfo: TokenInfo): boolean {
  return Date.now() >= tokenInfo.expiresAt;
}

/**
 * Retrieves a valid OAuth token, refreshing it if necessary.
 * @returns {Promise<string>} The valid OAuth token.
 */
export async function getValidToken(): Promise<string> {
  if (!currentToken || isTokenExpired(currentToken)) {
    currentToken = await fetchNewToken();
  }

  return currentToken.token;
}

/**
 * Forces a refresh of the OAuth token, retrieving a new one from the API.
 * @returns {Promise<string>} The new OAuth token.
 */
export async function refreshToken(): Promise<string> {
  currentToken = await fetchNewToken();
  return currentToken.token;
}

/**
 * Initializes the OAuth token by ensuring a valid token is available.
 */
export async function initializeToken(): Promise<void> {
  await getValidToken();
}
