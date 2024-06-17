import { zodBlog, zodPutBlog } from "@prayagtushar/mediumclone";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/utils/jwt/jwt";

type Variables = {
    userId: string;
    Title: string;
    Content: string;
    Description?: string;
};

type Bindings = {
    DATABASE_URL: string;
    JWT: string;
};

export const blog = new Hono<{
    Variables: Variables;
    Bindings: Bindings;
}>();


blog.use('/*', async (c, next) => {

    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT) as {id : string}
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
});

blog.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())


    const body = await c.req.json();
    const {success} = zodBlog.safeParse(body);
    if(!success)
        return c.json({error : "Invalid Input"})
    const userId = c.get("userId");
    try {
        const blogPost = await prisma.post.create({
            data: {
                Title: body.Title,
                Content: body.Content,
                AuthorId: userId,
                ...(body.Description && { Description: body.Description })
            }
        });
    
        return c.json({
            id: blogPost.id
        });
    } catch (error) {
        throw error
        console.error("Not able to create post")
    }
});

blog.get('/bulk', async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findFirst({});
        return c.json(blogs);
    } catch (err) {
        console.error("Error fetching blogs:", err);
        c.status(500);
        return c.json({ error: "Internal Server Error" });
    }
});


blog.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    
    const id = c.req.param('id');
    try {
        const foundBlog = await prisma.post.findFirst({
            where: {
                id: id
            }
        });

        return c.json({foundBlog});

    } catch (error) {
        c.status(500);
        console.error(error);
        return c.json({ error: "Internal Server Error" });
    }
});

blog.put('/', async (c) => {
    const userId = c.get('userId');
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const {success} = zodPutBlog.safeParse(body);
    if(!success)
        return c.json({error : "Invalid Input"})
    try {
        await prisma.post.update({
            where: {
                id: body.id,
                AuthorId: userId
            },
            data: {
                Title: body.Title,
                Content: body.Content,
            }
        });

        return c.text('Post Updated');
    } catch (error) {
        c.status(500);
        console.error(error);
        return c.json({ error: "Internal Server Error" });
    }
});

export default blog;