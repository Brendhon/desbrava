<h1 align="center">
  Desbrava
</h1>

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
- [🎨 Layout e Paleta de Cores](#-layout-e-paleta-de-cores)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🔐 Processo de Autenticação](#-processo-de-autenticação)
  - [Como Funciona o Login](#como-funciona-o-login)
  - [Fluxo de Telas](#fluxo-de-telas)
- [👨‍💻 Como Executar](#-como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [Configuração do Ambiente](#configuração-do-ambiente)
  - [Configuração do Google OAuth](#configuração-do-google-oauth)
  - [Rodando a Aplicação](#rodando-a-aplicação)
- [🤝 Como Contribuir](#-como-contribuir)
- [📝 Licença](#-licença)
- [👥 Autor](#-autor)

---

## ✈️ Sobre o Projeto

O **Desbrava** nasceu da ideia de simplificar o planejamento de viagens. Em vez de planilhas complexas e informações espalhadas, o Desbrava oferece uma interface centralizada, limpa e focada para que você possa organizar seus roteiros de forma intuitiva.

O objetivo é permitir que o usuário crie uma viagem, adicione um ponto de referência e, a partir daí, construa seu itinerário dia a dia, mesclando atividades planejadas manualmente com sugestões inteligentes de locais próximos.

---

## ✨ Features

- [x] **Autenticação Segura com Google:** Login rápido e seguro utilizando NextAuth.js.
- [x] **Sistema de Formulários:** Componentes de input reutilizáveis com validação robusta usando React Hook Form e Zod.
- [ ] **Criação de Viagens:** Fluxo simplificado em etapas para criar uma nova viagem, selecionando o país e as datas.
- [ ] **Dashboard Pessoal:** Visualize todas as suas viagens (passadas, presentes e futuras) em um só lugar.
- [ ] **Detalhes da Viagem:** Página dedicada para cada viagem, servindo como hub central do planejamento.
- [ ] **Adição de Ponto de Referência:** Use o Google Places para definir um endereço principal (hotel, etc.) e obter coordenadas.
- [ ] **Criação de Atividades Manuais:** Adicione qualquer tipo de atividade ao seu roteiro com um sistema de categorização (Transporte, Hospedagem, Alimentação, etc.).
- [ ] **Sugestões de Atividades:** Com base no seu ponto de referência, receba sugestões de restaurantes, pontos turísticos e mais.
- [ ] **Visualização em Calendário:** Veja seu roteiro em um layout de calendário interativo.

---

## 🎨 Layout e Paleta de Cores

O design do Desbrava foi pensado para ser imersivo e confortável, utilizando um tema escuro que remete à exploração e aventura. A paleta de cores "Diário de Explorador" foi escolhida para ser moderna e funcional.

| Nome Sugerido         | HEX Code  | Uso Principal                    |
| :-------------------- | :-------- | :------------------------------- |
| **Azul Meia-Noite**   | `#0D1B2A` | Fundo principal da aplicação.    |
| **Ardósia Escuro**    | `#1B263B` | Fundo para cards e modais.       |
| **Branco Pergaminho** | `#E0E1DD` | Textos principais e títulos.     |
| **Cinza Névoa**       | `#A9B4C2` | Textos secundários e ícones.     |
| **Roxo Real**         | `#8443A4` | Logo, destaques, botões e links. |

---

## 🚀 Tecnologias Utilizadas

- **Next.js:** Framework React para renderização no servidor (SSR) e uma estrutura robusta.
- **React:** Biblioteca para construção da interface de usuário.
- **TypeScript:** Para adicionar tipagem estática e aumentar a segurança do código.
- **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
- **Lucide Icons:** Biblioteca de ícones open-source e customizável.
- **Firebase:** Utilizado como Backend as a Service (BaaS) para:
  - **Authentication:** Gerenciamento de usuários com o provedor do Google.
  - **Firestore:** Banco de dados NoSQL para armazenar dados de viagens e atividades.
- **NextAuth.js:** Solução completa de autenticação para aplicações Next.js.
- **Google Places API:** Para busca e sugestão de locais.
- **React Hook Form:** Biblioteca para gerenciamento eficiente de formulários com validação e performance otimizada.
- **Zod:** Biblioteca TypeScript-first para validação de schemas com inferência de tipos estática.
- **@hookform/resolvers:** Integração oficial entre React Hook Form e bibliotecas de validação como Zod.

## 🔐 Processo de Autenticação

### Como Funciona o Login

O sistema de autenticação do Desbrava utiliza NextAuth.js com Google OAuth para proporcionar uma experiência de login simples e segura:

1. **Página Inicial**: Usuário acessa a aplicação e vê o botão "Entrar com Google"
2. **Autenticação Google**: Ao clicar, é redirecionado para a tela de login do Google
3. **Autorização**: Usuário autoriza o acesso aos dados básicos da conta Google
4. **Redirecionamento**: Após login bem-sucedido, é automaticamente redirecionado para `/dashboard`
5. **Dashboard Protegido**: A rota `/dashboard` só é acessível para usuários autenticados
6. **Sessão Persistente**: A sessão é mantida automaticamente pelo NextAuth.js

### Fluxo de Telas

```

Página Inicial → Login Google → Dashboard (Protegido)
↓ ↓ ↓
Botão "Entrar" → Autorização → Lista de Viagens
↓ ↓ ↓
Dashboard → Nova Viagem → Detalhes da Viagem
↓ ↓ ↓
Dashboard → Configurações da Conta → Logout
↓ ↓ ↓
Detalhes da Viagem → Configurações da Viagem → Edição

```

---

## 👨‍💻 Como Executar

### Pré-requisitos

- Node.js (v22 ou superior)
- Git
- npm

### Configuração do Ambiente

1.  **Clone o repositório:**

    ```bash
    git clone [git@github.com:Brendhon/desbrava.git](git@github.com:Brendhon/desbrava.git)
    cd desbrava
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz e preencha com suas chaves:

    ```env
    # NextAuth.js - Gerado com 'openssl rand -base64 32' no terminal
    NEXTAUTH_SECRET=your-nextauth-secret-key
    NEXTAUTH_URL=http://localhost:3000

    # NextAuth.js - Credenciais do Provedor Google
    # Obtenha no console do Google Cloud
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret

    # Firebase - Configurações do seu projeto
    # Obtenha no console do Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=

    # Google Cloud - Chave de API para o Places
    # Habilite a "Places API" no console do Google Cloud
    NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
    ```

### Configuração do Google OAuth

Para que a autenticação funcione, você precisa configurar o Google OAuth:

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+
4. Vá para "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure as URIs de redirecionamento autorizadas:
   - `http://localhost:3000/api/auth/callback/google` (desenvolvimento)
   - `https://seu-dominio.com/api/auth/callback/google` (produção)
6. Copie o Client ID e Client Secret para o arquivo `.env.local`

### Rodando a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:3000` em seu navegador.

---

## 🤝 Como Contribuir

Este é um projeto pessoal, mas contribuições são bem-vindas\! Se você tiver ideias ou encontrar bugs, sinta-se à vontade para:

1.  Fazer um **Fork** do projeto.
2.  Criar uma nova **Branch** (`git checkout -b feature/sua-feature`).
3.  Fazer **Commit** de suas mudanças (`git commit -m 'feat: Minha nova feature'`).
4.  Fazer **Push** para a Branch (`git push origin feature/sua-feature`).
5.  Abrir um **Pull Request**.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)
