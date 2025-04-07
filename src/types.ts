import { AnyZodObject } from "zod";

export interface Tool<T extends AnyZodObject> {
  name: string;
  description: string;
  parameters: T;
}
