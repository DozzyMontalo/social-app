import { object, string, optional } from "zod";

export const createPostSchema = object({
  body: object({
    text: string({
      required_error: "Text is required for post",
    }),
    media: optional(string()), // Media is optional
  }),
});

export type CreatePostInput = {
  body: {
    text: string;
    media?: string;
  };
};
