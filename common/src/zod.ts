import z from 'zod';

export const zodSignUp = z.object({
    Name : z.string(),
    Email : z.string().email(),
    Password : z.string().min(7)
})

export const zodSignIn = z.object({
    Email : z.string().email(),
    Password : z.string().min(7)
})

export const zodBlog = z.object({
    Title :  z.string(),
    Content : z.string(),
    Description : z.string(),
})

export const zodPutBlog = z.object({
    id : z.number(),
    Title :  z.string(),
    Content : z.string(),
    Description : z.string(),
})

// For frontend needs
export type zodSignUp = z.infer<typeof zodSignUp>
export type zodSignIn = z.infer<typeof zodSignIn>
export type zodBlog = z.infer<typeof zodBlog>
export type zodPutBlog = z.infer<typeof zodPutBlog>
