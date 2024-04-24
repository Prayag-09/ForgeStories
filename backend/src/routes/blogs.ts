import { Hono } from "hono";

const app = new Hono();

app.post('/blog',(c) => {
    return c.text("This is blogging page !!");
})

app.put('/blog', (c) => {
    return c.text("Put your blogs here");
})

app.get('/blog/:id',(c) =>{
    const id = c.   req.param('id');
    console.log(id);
    return c.text("Get Blog");
})

app.get('/blog',(c) =>{
    return c.text("Get Blog");
})

export default app;