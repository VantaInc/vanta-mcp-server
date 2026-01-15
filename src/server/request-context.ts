import { AsyncLocalStorage } from "node:async_hooks";

interface RequestContext {
  vantaToken: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();
