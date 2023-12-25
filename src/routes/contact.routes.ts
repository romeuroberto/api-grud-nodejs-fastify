import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecase";
import { Contact, ContactCreate } from "../interfaces/contacts.interface";
import { authmiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.addHook("preHandler", authmiddleware);
  fastify.post<{ Body: ContactCreate }>("/", async (req, reply) => {
    const { name, email, phone } = req.body;
    const emailUser = req.headers["email"];
    try {
      const data = await contactUseCase.create({
        name,
        email,
        phone,
        userEmail: emailUser,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/", async (req, reply) => {
    const emailUser = req.headers["email"];
    try {
      const data = await contactUseCase.listAllContacts(emailUser);
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.put<{ Body: ContactCreate; Params: { id: string } }>(
    "/:id",
    async (req, reply) => {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      try {
        const data = await contactUseCase.updateContact({
          id,
          name,
          email,
          phone,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.delete<{Params: { id: string }}>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
        const data = await contactUseCase.delete(id);
        return reply.send(data)
        
    } catch (error) {
        reply.send(error);
    }

  })
}
