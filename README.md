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
- [👨‍💻 Como Executar](#-como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [Configuração do Ambiente](#configuração-do-ambiente)
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

-   [ ] **Autenticação Segura com Google:** Login rápido e seguro utilizando NextAuth.js.
-   [ ] **Criação de Viagens:** Fluxo simplificado em etapas para criar uma nova viagem, selecionando o país e as datas.
-   [ ] **Dashboard Pessoal:** Visualize todas as suas viagens (passadas, presentes e futuras) em um só lugar.
-   [ ] **Detalhes da Viagem:** Página dedicada para cada viagem, servindo como hub central do planejamento.
-   [ ] **Adição de Ponto de Referência:** Use o Google Places para definir um endereço principal (hotel, etc.) e obter coordenadas.
-   [ ] **Criação de Atividades Manuais:** Adicione qualquer tipo de atividade ao seu roteiro com um sistema de categorização (Transporte, Hospedagem, Alimentação, etc.).
-   [ ] **Sugestões de Atividades:** Com base no seu ponto de referência, receba sugestões de restaurantes, pontos turísticos e mais.
-   [ ] **Visualização em Calendário:** Veja seu roteiro em um layout de calendário interativo.

---

## 🎨 Layout e Paleta de Cores

O design do Desbrava foi pensado para ser imersivo e confortável, utilizando um tema escuro que remete à exploração e aventura. A paleta de cores "Diário de Explorador" foi escolhida para ser moderna e funcional.

| Nome Sugerido | HEX Code | Uso Principal |
| :--- | :--- | :--- |
| **Azul Meia-Noite** | `#0D1B2A` | Fundo principal da aplicação. |
| **Ardósia Escuro** | `#1B263B` | Fundo para cards e modais. |
| **Branco Pergaminho** | `#E0E1DD` | Textos principais e títulos. |
| **Cinza Névoa** | `#A9B4C2` | Textos secundários e ícones. |
| **Roxo Real** | `#8443A4` | Logo, destaques, botões e links. |

---

## 🚀 Tecnologias Utilizadas

-   **Next.js:** Framework React para renderização no servidor (SSR) e uma estrutura robusta.
-   **React:** Biblioteca para construção da interface de usuário.
-   **TypeScript:** Para adicionar tipagem estática e aumentar a segurança do código.
-   **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
-   **Lucide Icons:** Biblioteca de ícones open-source e customizável.
-   **Firebase:** Utilizado como Backend as a Service (BaaS) para:
    -   **Authentication:** Gerenciamento de usuários com o provedor do Google.
    -   **Firestore:** Banco de dados NoSQL para armazenar dados de viagens e atividades.
-   **NextAuth.js:** Solução completa de autenticação para aplicações Next.js.
-   **Google Places API:** Para busca e sugestão de locais.

---

## 👨‍💻 Como Executar

### Pré-requisitos

-   Node.js (v22 ou superior)
-   Git
-   npm

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
    Crie um arquivo `.env` na raiz e preencha com suas chaves:
    ```env
    # NextAuth.js - Gerado com 'openssl rand -base64 32' no terminal
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=http://localhost:3000

    # NextAuth.js - Credenciais do Provedor Google
    # Obtenha no console do Google Cloud
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=

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
