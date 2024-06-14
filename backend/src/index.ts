import { Hono } from 'hono';
import { decode,sign,verify } from "hono/jwt";

type Variables = {
    message: string;
    userId?: string;
  };
  
  type Bindings = {
    JWT: string;
  };
  
  const app = new Hono<{ Variables: Variables; Bindings: Bindings }>();;

app.post('/api/v1/signup', (c) => {
	return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})


app.get('/api/v1/blog/*', async (c,next) => {
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

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('Getting blog route')
})

app.post('/api/v1/blog', (c) => {
	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
