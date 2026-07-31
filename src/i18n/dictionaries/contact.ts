import type { Locale } from '../locales';

export interface ContactDictionary {
  eyebrow: string;
  title: string;
  copyEmailAriaLabel: string;
  copyLabel: string;
  locationSuffix: string;
  socialsTitle: string;
  fields: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectOptions: readonly string[];
    message: string;
    messagePlaceholder: string;
    honeypotLabel: string;
  };
  submit: string;
  mailtoNote: string;
  validation: {
    nameRequired: string;
    nameTooShort: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
    messageTooShort: string;
  };
  status: {
    reviewFields: string;
    submittedNoEndpoint: string;
    openingMailClient: string;
    sending: string;
    sendFailedFallback: string;
    toastSuccess: string;
  };
}

export const contactDictionary: Record<Locale, ContactDictionary> = {
  'pt-BR': {
    eyebrow: 'Contato',
    title: 'Vamos conversar sobre o seu próximo projeto',
    copyEmailAriaLabel: 'Copiar o e-mail {email}',
    copyLabel: 'Copiar',
    locationSuffix: '— disponível para trabalho remoto',
    socialsTitle: 'Ou me encontre em',
    fields: {
      name: 'Nome',
      namePlaceholder: 'Como devo te chamar?',
      email: 'E-mail',
      emailPlaceholder: 'voce@empresa.com',
      subject: 'Assunto',
      subjectOptions: ['Oportunidade de trabalho', 'Projeto freelance', 'Parceria', 'Outro'],
      message: 'Mensagem',
      messagePlaceholder: 'Conte um pouco sobre o contexto, o desafio e o prazo.',
      honeypotLabel: 'Não preencha este campo',
    },
    submit: 'Enviar mensagem',
    mailtoNote: 'O envio abre o seu cliente de e-mail. Prefere escrever direto?',
    validation: {
      nameRequired: 'Informe o seu nome.',
      nameTooShort: 'O nome está muito curto.',
      emailRequired: 'Informe o seu e-mail para que eu possa responder.',
      emailInvalid: 'Esse e-mail não parece válido.',
      messageRequired: 'Escreva uma mensagem.',
      messageTooShort: 'Conte um pouco mais — pelo menos 20 caracteres.',
    },
    status: {
      reviewFields: 'Revise os campos destacados antes de enviar.',
      submittedNoEndpoint: 'Mensagem enviada. Obrigado!',
      openingMailClient: 'Abrindo o seu cliente de e-mail…',
      sending: 'Enviando…',
      sendFailedFallback: 'Não consegui enviar agora. Escreva direto para tibolamakley1@gmail.com.',
      toastSuccess: 'Obrigado pelo contato! Responderei assim que possível.',
    },
  },
  en: {
    eyebrow: 'Contact',
    title: "Let's talk about your next project",
    copyEmailAriaLabel: 'Copy the email {email}',
    copyLabel: 'Copy',
    locationSuffix: '— available for remote work',
    socialsTitle: 'Or find me on',
    fields: {
      name: 'Name',
      namePlaceholder: 'What should I call you?',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      subject: 'Subject',
      subjectOptions: ['Job opportunity', 'Freelance project', 'Partnership', 'Other'],
      message: 'Message',
      messagePlaceholder: 'Tell me a bit about the context, the challenge and the timeline.',
      honeypotLabel: "Don't fill this field in",
    },
    submit: 'Send message',
    mailtoNote: 'Sending opens your mail client. Prefer to write directly?',
    validation: {
      nameRequired: 'Please enter your name.',
      nameTooShort: 'That name looks too short.',
      emailRequired: 'Please enter your email so I can reply.',
      emailInvalid: "That email doesn't look valid.",
      messageRequired: 'Please write a message.',
      messageTooShort: 'Tell me a bit more — at least 20 characters.',
    },
    status: {
      reviewFields: 'Please review the highlighted fields before sending.',
      submittedNoEndpoint: 'Message sent. Thank you!',
      openingMailClient: 'Opening your mail client…',
      sending: 'Sending…',
      sendFailedFallback: "Couldn't send it right now. Please write directly to tibolamakley1@gmail.com.",
      toastSuccess: "Thanks for reaching out! I'll get back to you as soon as I can.",
    },
  },
};
