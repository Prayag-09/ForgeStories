"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodPutBlog = exports.zodBlog = exports.zodSignIn = exports.zodSignUp = void 0;
const zod_1 = __importDefault(require("zod"));
exports.zodSignUp = zod_1.default.object({
    Name: zod_1.default.string(),
    Email: zod_1.default.string().email(),
    Password: zod_1.default.string().min(7)
});
exports.zodSignIn = zod_1.default.object({
    Email: zod_1.default.string().email(),
    Password: zod_1.default.string().min(7)
});
exports.zodBlog = zod_1.default.object({
    Title: zod_1.default.string(),
    Content: zod_1.default.string(),
    Description: zod_1.default.string(),
});
exports.zodPutBlog = zod_1.default.object({
    id: zod_1.default.number(),
    Title: zod_1.default.string(),
    Content: zod_1.default.string(),
    Description: zod_1.default.string(),
});
