import { AnyZodObject } from "zod";

export interface Tool<T extends AnyZodObject = AnyZodObject> {
  name: string;
  description: string;
  parameters: T;
}
