import z from 'zod';

export const zodSignUp = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
})

export const zodSignIn = z.object({
    email: z.string().email(),
    password: z.string().min(5),
})

export const zodBlog = z.object({
    title: z.string(),
    content: z.string(),
    description : z.string().optional()
})

export const zodPutBlog = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string(),
})

// For frontend needs
export type zodSignUp = z.infer<typeof zodSignUp>
export type zodSignIn = z.infer<typeof zodSignIn>
export type zodBlog = z.infer<typeof zodBlog>
export type zodPutBlog = z.infer<typeof zodPutBlog>
