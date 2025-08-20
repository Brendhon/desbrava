# useServiceWorker Hook

## Visão Geral

O hook `useServiceWorker` gerencia o ciclo de vida do service worker da aplicação PWA, incluindo registro, atualizações e desregistro.

## Funcionalidades

- **Registro Automático:** Registra o service worker automaticamente
- **Detecção de Atualizações:** Identifica quando há uma nova versão disponível
- **Gerenciamento de Estado:** Controla o estado do service worker
- **Atualização Forçada:** Permite atualizar o service worker manualmente

## Uso

```tsx
import { useServiceWorker } from '@/hooks/useServiceWorker';

export default function App() {
  const { isSupported, isRegistered, isUpdateAvailable, updateServiceWorker } =
    useServiceWorker();

  if (!isSupported) {
    return <p>PWA não suportada neste navegador</p>;
  }

  return (
    <div>
      {isUpdateAvailable && (
        <button onClick={updateServiceWorker}>Atualizar Aplicação</button>
      )}
    </div>
  );
}
```

## Retorno

```tsx
interface ServiceWorkerState {
  isSupported: boolean; // Navegador suporta service workers
  isRegistered: boolean; // Service worker está registrado
  isUpdateAvailable: boolean; // Nova versão disponível
  registration: ServiceWorkerRegistration | null; // Instância do registro
  updateServiceWorker: () => Promise<void>; // Função para atualizar
  unregisterServiceWorker: () => Promise<void>; // Função para desregistrar
}
```

## Estados

### `isSupported`

- `true`: Navegador suporta service workers
- `false`: Navegador não suporta (navegadores antigos)

### `isRegistered`

- `true`: Service worker registrado com sucesso
- `false`: Ainda não registrado ou falha no registro

### `isUpdateAvailable`

- `true`: Nova versão do service worker disponível
- `false`: Versão atual é a mais recente

## Métodos

### `updateServiceWorker()`

Força a atualização do service worker. Útil quando `isUpdateAvailable` é `true`.

### `unregisterServiceWorker()`

Remove o service worker da aplicação. Útil para testes ou debugging.

## Eventos Internos

- **`updatefound`**: Nova versão do service worker detectada
- **`statechange`**: Mudança no estado do service worker
- **`controllerchange`**: Novo service worker ativado

## Tratamento de Erros

O hook inclui tratamento de erros para:

- Falha no registro
- Falha na atualização
- Falha no desregistro

## Dependências

- React Hooks (`useState`, `useEffect`)
- Web APIs (`navigator.serviceWorker`)

## Casos de Uso

1. **Indicador de Atualização:** Mostrar quando há uma nova versão
2. **Botão de Atualização:** Permitir atualização manual
3. **Status PWA:** Verificar se a PWA está funcionando
4. **Debugging:** Desregistrar service worker para testes
