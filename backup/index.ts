
import { OAuth2Client } from 'google-auth-library'
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

/*app.post('/google', async (request, reply) => {
  const { idToken } = request.body as any;

  if (!idToken) {
    return reply.status(400).send({ error: 'idToken is required' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID,
    });

    const payload: any = ticket.getPayload();
    const userInfo = {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    return userInfo;
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid token' });
  }
});

/*const nodemailer = require('nodemailer');

// Carrega as credenciais e configurações do .env
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const emailFrom = process.env.EMAIL_FROM;
const emailTo = process.env.EMAIL_TO;

// Configuração do transporte usando o Brevo SMTP
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false, // como a porta 587 geralmente usa STARTTLS, o 'secure' deve ser falso
  auth: {
    user: smtpUser,
    pass: smtpPass
  },
  tls: {
    rejectUnauthorized: false // Use isso se estiver tendo problemas com certificações autoassinadas
  }
});

/*app.get('/send', (request, reply) => {
  transporter.sendMail({
    from: `"Suport mdata😎" <${emailFrom}>`,
    to: emailTo, // destinatário
    subject: 'Receba pivetee', // Assunto
    text: 'aararararararrrrrrr!', // Corpo do e-mail em texto plano
    
    // Você também pode adicionar `html: '<b>Olá mundo!</b>'` para conteúdo HTML
  }, (errors:any, info:any) => {
    if (errors) {
      console.error('Erro ao enviar e-mail:', errors);

      reply.status(500).send({
        status: 'error',
        message: 'Algo deu errado',
        error: errors.message || errors // Retorna a mensagem de erro
      });
    } else {
      reply.status(200).send({
        status: 'ok',
        message: 'E-mail enviado com sucesso',
        info: {
          from: info.envelope.from, 
          to: info.envelope.to 
        }
      });
    }
  });
});*/