import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt';
import { hashpass, comparepass } from "./hashPassword/hash";
import { zodBlog, zodPutBlog } from "@prayagtushar/mediumclone";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    jwtPayload: string
  }
}>();

blogRouter.use('/*', async (c, next) => { 
  try {
    const authHeader = c.req.header('Authorization') || '';
    const response = await verify(authHeader, c.env.JWT_SECRET);
    if (response) {
      c.set('jwtPayload', response.id );
      await next();
    }
  } catch (error) {
    console.error(error);
    c.status(403);
    return c.json({ message: 'UnAuthorized' });
  }
});

blogRouter.get('/bulk', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    c.status(200)
    return c.json({ blogs });

  } catch (error) {
    c.status(403)
    return c.json({ message: 'Error fetching blogs' });
  }
});

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('jwtPayload');

  try {
    const author = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    const body = await c.req.json()
    const { success } = zodBlog.safeParse(body);
    if(!success){
      c.status(400);
      return c.json({ message: 'Invalid input' });
    }
    let blog;
    try {
      blog = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: userId,
          imagelink: body.imagelink,
          autherName: author?.name || author?.email || 'Anonymous'
        }
      })

    } catch (error) {
      console.error(error);
      c.status(500)
      return c.json({ message: 'Error Creating Blog Post' });
    }
    c.status(200)
    return c.json({ id: blog.id });

  } catch (error) {
    return c.status(403);
  }
});

// Updating Blog
blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json()
    const { success } = zodPutBlog.safeParse(body);
    if(!success){
      c.status(400);
      return c.json({ message: 'Invalid input' });
    }

    const blog = await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
        // imagelink: body.imagelink
      }
    })
    c.status(200)
    return c.json({ id: blog.id });

  } catch (error) {
    return c.status(403); 
  }
})

// Get Blog by ID
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogId = c.req.param('id');
    const blog = await prisma.post.findFirst({
      where: {
        id: blogId
      }
    })
    c.status(200)
    return c.json({ blog });

  } catch (error) {
    c.status(403)
    return c.json({ message: 'Error fetching blog' });
  }
})