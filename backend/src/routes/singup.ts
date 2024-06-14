import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode,sign,verify } from "hono/jwt";

const app = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT: string
    }
}>;

app.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        DATABASE_URL : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    try {
        const user = await prisma.user.create({
            data: {
                email : body.Email,
                password : body.Password
            }
        })
        const jwt = await sign({ id: user.id }, c.env?.JWT);
        return c.json({jwt});
    } catch(err){
        console.error("Not able to Signup !!");
        throw err;
    }
})