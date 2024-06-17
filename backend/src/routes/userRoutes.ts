import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { zodSignIn } from "@prayagtushar/mediumclone";
import { zodSignUp } from "@prayagtushar/mediumclone";

  type Bindings = {
    DATABASE_URL : string
    JWT: string;
  };

export const user = new Hono<{
    Bindings : Bindings
}>();

user.post('/signup', async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = zodSignUp.safeParse(body);
  if(!success)
      return c.json({error : "Invalid Input"})
    try {

        const newUser = await prisma.user.create({
          data: {
            Name: body.Name,
            Password: body.Password,
            Email: body.Email
          }
        });
    
        const token = await sign({ id: newUser.id }, c.env.JWT);
    
        return c.json({ token });
      } catch (err) {
        console.error("Not able to Signup !!", err);
        c.status(500);
        return c.json({ error: "Internal Server Error" });
      }
    });

user.post('/signin',async (c) => {
    
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const {success} = zodSignIn.safeParse(body);
  if(!success)
      return c.json({error : "Invalid Input"})
    try {
        const user = await prisma.user.findUnique({
            where : {
                Email: body.Email,
                Password: body.Password
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