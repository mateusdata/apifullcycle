import fastifyExpress from "@fastify/express";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyRawBody from "fastify-raw-body";
import stripe, { Stripe } from "stripe";

export async function stripeRoute(app: FastifyInstance) {
  const endpointSecret = process.env.endpointSecret;

  const stripe = new Stripe(String(process.env.secretKey), {
    apiVersion: '2024-06-20',
  });

  app.post('/create-payment-intent', async (request, reply) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Valor do produto em centavos (R$10,00)
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      reply.send({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  });

  app.get("/publishable-key", (request, reply) => {
    console.log(process?.env?.publishableKey);

    reply.send(process?.env?.publishableKey)

  })




  app.register(fastifyRawBody, {
    global: true,  // Torna o rawBody disponível globalmente
    field: 'rawBody',  // Armazena o corpo bruto no campo `rawBody`
    encoding: 'utf8',  // Codificação padrão
  });
  
  
  app.post('/webhook', async (request, reply) => {
    const sig = request.headers['stripe-signature'] as string;
    const rawBody = request.rawBody as Buffer;

    if (!rawBody) {
      console.log("deu erro aqui")
      console.error('Webhook Error: No webhook payload was provided.');
      return reply.status(400).send('Webhook Error: No webhook payload was provided.');
    }

    let event;

    try {
      // Construa o evento a partir do rawBody e da assinatura
      event = stripe.webhooks.constructEvent(rawBody, sig, String(endpointSecret));
    } catch (err: any) {
      console.error('Webhook Error:', err.message);
      return reply.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Lidar com o evento
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log('PaymentIntent succeeded:', paymentIntentSucceeded);
        break;
      // Lidar com outros tipos de eventos
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Retorne uma resposta 200 para reconhecer o recebimento do evento
    reply.send({ received: true });
  });
}