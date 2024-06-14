import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const app = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT : string
    }
}>;

app.post('/signin',async (c) => {
    
    const prisma = await PrismaClient({
        DATABASE_URL : c.env
        .DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const user = await prisma.user.findUnique({
            where : {
                email : body.Email
            }
        })
        
        if(!user){
            c.status(403);
            return c.json({ Error : " User not found"})
        }

        const jwt = await sign({
            id : user.id,
        } , c.env?.JWT)
        return c.json({jwt})

    } catch(err) {
        console.error("Error while signing in");
        throw err;
    }
})