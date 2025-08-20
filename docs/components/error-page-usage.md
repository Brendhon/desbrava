# ErrorPage Component

## Overview

The `ErrorPage` component provides a consistent and reusable way to display error states across the application. It includes a header with navigation and a centered error message with optional retry functionality.

## Features

- **Consistent Design**: Follows the project's design system and layout patterns
- **Flexible Navigation**: Customizable back button with configurable text and href
- **Error Display**: Clear error message presentation with proper styling
- **Retry Functionality**: Optional retry button for recoverable errors
- **Accessibility**: Proper ARIA labels and semantic structure
- **Responsive**: Adapts to different screen sizes

## Usage

### Basic Usage

```tsx
import ErrorPage from '@/components/ui/ErrorPage';

function MyComponent() {
  const handleRetry = () => {
    // Retry logic here
  };

  return (
    <ErrorPage
      backHref="/dashboard"
      backText="Voltar ao Dashboard"
      backAriaLabel="Voltar ao Dashboard"
      title="Erro ao Carregar Dados"
      subtitle="Ocorreu um erro inesperado"
      errorMessage="Não foi possível conectar ao servidor"
      onRetry={handleRetry}
    />
  );
}
```

### Without Retry Button

```tsx
<ErrorPage
  backHref="/dashboard"
  backText="Voltar ao Dashboard"
  backAriaLabel="Voltar ao Dashboard"
  title="Acesso Negado"
  subtitle="Você não tem permissão para acessar esta página"
  errorMessage="Esta funcionalidade requer privilégios administrativos"
  showRetryButton={false}
/>
```

### Custom Retry Button Text

```tsx
<ErrorPage
  backHref="/dashboard"
  backText="Voltar ao Dashboard"
  backAriaLabel="Voltar ao Dashboard"
  title="Falha na Conexão"
  subtitle="Problema de conectividade detectado"
  errorMessage="Verifique sua conexão com a internet"
  onRetry={handleRetry}
  retryButtonText="Reconectar"
/>
```

## Props

| Prop              | Tipo      | Padrão                | Descrição                                    |
| ----------------- | --------- | --------------------- | -------------------------------------------- |
| `backHref`        | `string`  | -                     | URL para navegação de volta                  |
| `backText`        | `string`  | -                     | Texto do botão de voltar                     |
| `backAriaLabel`   | `string`  | -                     | Label ARIA para acessibilidade               |
| `title`           | `string`  | -                     | Título principal da página de erro           |
| `subtitle`        | `string`  | -                     | Subtítulo explicativo                        |
| `errorMessage`    | `string`  | -                     | Mensagem de erro detalhada                   |
| `onRetry`         | `function`| -                     | Função chamada ao clicar no botão de retry   |
| `retryButtonText` | `string`  | `"Tentar Novamente"`  | Texto personalizado para o botão de retry   |
| `showRetryButton` | `boolean` | `true`                | Controla se o botão de retry deve ser exibido |

## Examples

### API Error

```tsx
<ErrorPage
  backHref="/trips"
  backText="Voltar às Viagens"
  backAriaLabel="Voltar à lista de viagens"
  title="Erro ao Carregar Viagem"
  subtitle="Ocorreu um problema ao buscar os dados"
  errorMessage="A viagem solicitada não foi encontrada ou você não tem permissão para acessá-la"
  onRetry={() => window.location.reload()}
  retryButtonText="Recarregar Página"
/>
```

### Network Error

```tsx
<ErrorPage
  backHref="/dashboard"
  backText="Voltar ao Dashboard"
  backAriaLabel="Voltar ao dashboard"
  title="Problema de Conexão"
  subtitle="Não foi possível conectar ao servidor"
  errorMessage="Verifique sua conexão com a internet e tente novamente"
  onRetry={handleRetry}
  retryButtonText="Tentar Novamente"
/>
```

### Permission Error

```tsx
<ErrorPage
  backHref="/dashboard"
  backText="Voltar ao Dashboard"
  backAriaLabel="Voltar ao dashboard"
  title="Acesso Negado"
  subtitle="Você não tem permissão para acessar esta funcionalidade"
  errorMessage="Esta área requer privilégios administrativos. Entre em contato com o suporte se acredita que isso é um erro."
  showRetryButton={false}
/>
```

## Styling

The component uses Tailwind CSS classes and follows the project's design system:

- **Container**: Responsive max-width with consistent padding
- **Error Message**: Red text color (`text-red-400`) for clear error indication
- **Retry Button**: Purple theme (`bg-royal-purple`) with hover effects
- **Card**: Dark background with shadow and border styling

## Accessibility

- **ARIA Labels**: Proper `aria-label` for the retry button
- **Semantic Structure**: Uses appropriate heading levels and button elements
- **Navigation**: Clear back navigation with descriptive text
- **Error Announcement**: Error message is clearly presented for screen readers

## Best Practices

1. **Clear Messaging**: Use descriptive titles and subtitles
2. **Actionable Errors**: Provide retry functionality when appropriate
3. **Navigation**: Always provide a clear way back to safety
4. **Consistent Language**: Use the same error terminology across the app
5. **User Context**: Explain what went wrong and what the user can do

## Integration

The `ErrorPage` component integrates seamlessly with:

- **PageHeader**: Consistent navigation pattern
- **Card**: Unified visual styling
- **Error States**: Works with any error handling system
- **Navigation**: Compatible with Next.js routing
