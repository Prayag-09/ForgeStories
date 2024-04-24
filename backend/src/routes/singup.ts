import { Hono } from "hono";

const app = new Hono();

app.post('/signup',(c) => {
    return c.text("This is Sign Up page");
})