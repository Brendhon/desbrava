<h1 align="center">Desbrava</h1>

<p align="center">
  <strong>Seu planejador de viagens pessoal, focado em uma experiência simples e intuitiva.</strong>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg"/>
</p>

---

## 📜 Índice

- [📜 Índice](#-índice)
- [✈️ Sobre o Projeto](#️-sobre-o-projeto)
- [✨ Features](#-features)
  - [Implementadas](#implementadas)
  - [Planejadas](#planejadas)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [👨‍💻 Como Executar](#-como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [1. Configuração do Ambiente](#1-configuração-do-ambiente)
  - [2. Configuração das Variáveis de Ambiente](#2-configuração-das-variáveis-de-ambiente)
  - [3. Configuração do Google OAuth](#3-configuração-do-google-oauth)
  - [4. Executando a Aplicação](#4-executando-a-aplicação)
- [🔐 Autenticação](#-autenticação)
- [🚀 Funcionalidades PWA](#-funcionalidades-pwa)
- [🤝 Como Contribuir](#-como-contribuir)
- [📝 Licença](#-licença)
- [👥 Autor](#-autor)

---

## ✈️ Sobre o Projeto

O **Desbrava** simplifica o planejamento de viagens, oferecendo uma interface centralizada e intuitiva para organizar roteiros. O objetivo é permitir que o usuário crie viagens, adicione pontos de referência e construa seu itinerário com atividades manuais e sugestões inteligentes de locais próximos.

Como **PWA (Progressive Web App)**, o Desbrava pode ser instalado em seu dispositivo, oferecendo funcionalidades offline e uma experiência de aplicativo nativo.

---

## ✨ Features

### Implementadas

- **Autenticação Segura com Google:** Login rápido e seguro utilizando NextAuth.js.
- **Sistema de Formulários:** Componentes reutilizáveis com validação via React Hook Form e Zod.
- **Progressive Web App (PWA):** Aplicação instalável com funcionalidades offline.

### Planejadas

- **Criação e Gerenciamento de Viagens:** Dashboard pessoal para visualizar e organizar todas as suas viagens.
- **Planejamento de Roteiro:** Adição de pontos de referência (hotéis, etc.) e atividades manuais.
- **Sugestões Inteligentes:** Recomendações de restaurantes e pontos turísticos com base na sua localização.
- **Funcionalidades Avançadas:** Paginação, filtros, exportação de roteiros, compartilhamento e notificações push.
- **Melhorias de UX/UI:** Tema claro/escuro e suporte a múltiplos idiomas.

---

## 🚀 Tecnologias Utilizadas

- **Framework:** Next.js 15
- **Linguagem:** TypeScript
- **UI:** React 19, Tailwind CSS, Lucide Icons
- **Backend & Banco de Dados:** Firebase (Authentication, Firestore)
- **Autenticação:** NextAuth.js
- **APIs:** Google Places API
- **Formulários:** React Hook Form com Zod para validação
- **PWA:** Service Workers e Web App Manifest

---

## 👨‍💻 Como Executar

### Pré-requisitos

- Node.js (v22 ou superior)
- Git
- npm

### 1. Configuração do Ambiente

```bash
# Clone o repositório
git clone git@github.com:Brendhon/desbrava.git
cd desbrava

# Instale as dependências
npm install
```

### 2. Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# NextAuth.js
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google Places API
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=

# PWA (Opcional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
```

### 3. Configuração do Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione um existente
3. Ative a API do Google+
4. Vá para "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure as URIs de redirecionamento:
   - `http://localhost:3000/api/auth/callback/google` (desenvolvimento)
   - `https://seu-dominio.com/api/auth/callback/google` (produção)
6. Copie o Client ID e Client Secret para o arquivo `.env.local`

### 4. Executando a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:3000` em seu navegador.

---

## 🔐 Autenticação

O sistema utiliza NextAuth.js com Google OAuth para login seguro:

1. **Página Inicial** → Botão "Entrar com Google"
2. **Autorização Google** → Redirecionamento para dashboard
3. **Dashboard Protegido** → Acesso apenas para usuários autenticados

---

## 🚀 Funcionalidades PWA

- **Instalação:** Adicione à tela inicial como aplicativo nativo
- **Modo Offline:** Acesse suas viagens sem conexão
- **Cache Inteligente:** Recursos armazenados localmente
- **Experiência App-like:** Interface nativa e navegação suave
- **Notificações Push:** Lembretes configuráveis

**iOS:** Use o botão compartilhar e selecione "Adicionar à Tela Inicial"

---

## 🤝 Como Contribuir

1. Faça um **Fork** do projeto
2. Crie uma **Branch** (`git checkout -b feature/sua-feature`)
3. Faça **Commit** das mudanças (`git commit -m 'feat: Minha nova feature'`)
4. Faça **Push** para a Branch (`git push origin feature/sua-feature`)
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)
