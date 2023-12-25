import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify({ logger: true });
const serverPort = 3100

app.register(userRoutes, {
    prefix: '/users',
})
app.register(contactRoutes, {
    prefix: '/contacts',
})

app.listen(
    {
        port: serverPort
    }, 
    () => console.log(`Server is running on port ${serverPort}`),
);