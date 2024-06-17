import z from 'zod';
export declare const zodSignUp: z.ZodObject<{
    Name: z.ZodString;
    Email: z.ZodString;
    Password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    Name: string;
    Email: string;
    Password: string;
}, {
    Name: string;
    Email: string;
    Password: string;
}>;
export declare const zodSignIn: z.ZodObject<{
    Email: z.ZodString;
    Password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    Email: string;
    Password: string;
}, {
    Email: string;
    Password: string;
}>;
export declare const zodBlog: z.ZodObject<{
    Title: z.ZodString;
    Content: z.ZodString;
    Description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    Title: string;
    Content: string;
    Description: string;
}, {
    Title: string;
    Content: string;
    Description: string;
}>;
export declare const zodPutBlog: z.ZodObject<{
    id: z.ZodNumber;
    Title: z.ZodString;
    Content: z.ZodString;
    Description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    Title: string;
    Content: string;
    Description: string;
    id: number;
}, {
    Title: string;
    Content: string;
    Description: string;
    id: number;
}>;
export type zodSignUp = z.infer<typeof zodSignUp>;
export type zodSignIn = z.infer<typeof zodSignIn>;
export type zodBlog = z.infer<typeof zodBlog>;
export type zodPutBlog = z.infer<typeof zodPutBlog>;
