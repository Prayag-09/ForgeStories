"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodPutBlog = exports.zodBlog = exports.zodSignIn = exports.zodSignUp = void 0;
const zod_1 = __importDefault(require("zod"));
exports.zodSignUp = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(5),
});
exports.zodSignIn = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(5),
});
exports.zodBlog = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    description: zod_1.default.string().optional()
});
exports.zodPutBlog = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    id: zod_1.default.string(),
});
