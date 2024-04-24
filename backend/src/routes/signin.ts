import { Hono } from "hono";

const app = new Hono();

app.post('/signin',(c) => {
    return c.text("This is Sign In page");
})