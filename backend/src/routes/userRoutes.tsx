import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

  type Bindings = {
    DATABASE_URL : string
    JWT: string;
  };

const user = new Hono<{
    Bindings : Bindings
}>();


user.post('/signup', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const user = await prisma.user.create({
            data: {
                Name : body.username,
                Password : body.Password,
                Email : body.Email
            }
        })
        const jwt = await sign({ id: user.id }, c.env?.JWT);
        return c.json({jwt});
    } catch(err){
        console.error("Not able to Signup !!");
        throw err;
    }
})

user.post('/signin',async (c) => {
    
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findUnique({
            where : {
                Email : body.Email
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

export default user;