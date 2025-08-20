# PWA Install Prompt Component

## Visão Geral

O componente `PWAInstallPrompt` é responsável por detectar quando o usuário pode instalar o Desbrava como uma Progressive Web App (PWA) e exibir um prompt de instalação apropriado.

## Funcionalidades

- **Detecção Automática:** Identifica quando a aplicação pode ser instalada
- **Suporte Multiplataforma:** Diferentes instruções para Android/Chrome e iOS
- **Estado Inteligente:** Não exibe se já estiver instalado ou se não for suportado
- **UX Otimizada:** Design consistente com o tema da aplicação

## Uso

```tsx
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <PWAInstallPrompt />
    </div>
  );
}
```

## Props

Este componente não recebe props, pois detecta automaticamente o estado da aplicação.

## Estados

- **Não Suportado:** Navegador não suporta PWA
- **Já Instalado:** Aplicação já está instalada como PWA
- **Prompt Disponível:** Exibe botão de instalação
- **iOS Detectado:** Exibe instruções específicas para iOS

## Estilos

O componente usa as cores do tema Desbrava:

- `bg-ardosia-escuro`: Fundo do prompt
- `border-roxo-real`: Borda destacada
- `text-branco-pergaminho`: Texto principal
- `text-cinza-nevoa`: Texto secundário

## Eventos

- `beforeinstallprompt`: Captura o evento de instalação
- `click`: Botão de instalação
- `dismiss`: Fechar o prompt

## Dependências

- React Hooks (`useState`, `useEffect`)
- Lucide React (`Download`, `X`)
- Tailwind CSS para estilização

## Localização

O componente está em português brasileiro (pt-BR) para manter consistência com o resto da aplicação.
