import { object, string, TypeOf } from "zod";

export const createCommentSchema = object({
  body: object({
    text: string({
      required_error: "Text is required for comment",
    }),
  }),
});


export type CreateCommentInput = {
  body: {
    text: string;
  };
};

