import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
require("dotenv").config();

const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate())

const app = new Hono()

// app.use('/api/v1/user',userRoutes);
// app.use('/api/v1/blog',blogRoutes);



export default app;
