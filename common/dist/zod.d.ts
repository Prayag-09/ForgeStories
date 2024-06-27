import z from 'zod';
export declare const zodSignUp: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const zodSignIn: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const zodBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    description?: string | undefined;
}, {
    title: string;
    content: string;
    description?: string | undefined;
}>;
export declare const zodPutBlog: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type zodSignUp = z.infer<typeof zodSignUp>;
export type zodSignIn = z.infer<typeof zodSignIn>;
export type zodBlog = z.infer<typeof zodBlog>;
export type zodPutBlog = z.infer<typeof zodPutBlog>;
