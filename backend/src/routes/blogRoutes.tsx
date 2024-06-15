import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/utils/jwt/jwt";

type Variables = {
    userId : string  
};

type Bindings = {
    DATABASE_URL : string
    JWT: string;
};

const blog = new Hono<{
    Variables : Variables,
    Bindings : Bindings
}>();

blog.use('/', async (c) => {
    const header = c.req.header("authorization") ||  ""
    const user = await verify(header, c.env.JWT) as { id: string };
    if(user){
        c.set("userId", user.id);
        next();
    } else {
        c.status(403);
        return c.json({
            message : "You are logged In"
        })
    }
})

blog.post('/',async  (c) => {
	
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const blogPost = await prisma.blog.create({
        data: {
            Title : body.Title,
            Content : body.Content,
            Description : body.Description,
            AuthorId : 1    
        }
    }) 

    return c.json({
        id : blogPost.id
    })
})

blog.get('/*', async (c,next) => {
    const jwt = c.req.header('Authorization')
    if(!jwt){
        c.status(401);
        return c.json({
            error: "Unauthorized"
        })
    }
    const token = jwt.split(' ')[1];
    try {
            const payload = await verify(token, c.env.JWT) as { id: string };
            c.set('userId', payload.id);
            await next();
        } catch (error) {
            c.status(401);
            return c.json({ error: 'unauthorized' });
        }
})

blog.get('/:id', async (c) => {

	const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

	try {
        const foundBlog = await prisma.blog.findFirst({
            where : {
                id : id
            }
        })
    
        return c.json({
            id : foundBlog.id
        })
    } catch (error) {
        c.status(411);
        console.error(error);
        throw error;
    }
})

blog.put('/',async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const getBlog = await prisma.blog.update({
            where: {
                id : body.id
            },
            data : {
                Title : body.Title,
                Content : body.Content,
            }
        })
    
        return c.json({getBlog});
    } catch (error) {
        c.status(411);
        console.error(error);
        throw error;
    }
})

blog.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany();
    } catch(err) {
        c.status(411);
    }
    

})


export default blog;

function next() {
    throw new Error("Function not implemented.");
}
