"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        text: (0, zod_1.string)({
            required_error: "Text is required for post",
        }),
        media: (0, zod_1.optional)((0, zod_1.string)()), // Media is optional
    }),
});
