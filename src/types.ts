import { z } from "zod";

export interface Tool<T extends z.ZodType> {
  name: string;
  description: string;
  parameters: T;
}
