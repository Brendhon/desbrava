# Configuração PWA - Desbrava

## Visão Geral

Este guia explica como configurar e manter a funcionalidade PWA (Progressive Web App) do Desbrava.

## Arquivos PWA

### 1. Service Worker (`public/sw.js`)
- Gerencia cache offline
- Controla notificações push
- Atualiza recursos automaticamente

### 2. Manifest (`public/manifest.json`)
- Configuração da aplicação PWA
- Metadados para instalação
- Ícones e cores do tema

### 3. Componente de Instalação (`components/PWAInstallPrompt.tsx`)
- Detecta capacidade de instalação
- Exibe prompt para usuário
- Suporte multiplataforma

### 4. Hook de Service Worker (`hooks/useServiceWorker.ts`)
- Gerencia ciclo de vida do SW
- Detecta atualizações
- Controle de estado

## Configuração do Ambiente

### Variáveis de Ambiente (Opcional)
```env
# Para notificações push
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
```

### Gerar VAPID Keys
```bash
npm install -g web-push
web-push generate-vapid-keys
```

## Funcionalidades Implementadas

### ✅ Cache Offline
- Páginas principais em cache
- Recursos estáticos otimizados
- Estratégia "Cache First, Network Fallback"

### ✅ Instalação PWA
- Prompt automático de instalação
- Suporte para Android/Chrome
- Instruções específicas para iOS

### ✅ Service Worker
- Registro automático
- Atualizações automáticas
- Limpeza de cache antigo

### ✅ Manifest Dinâmico
- Configuração via Next.js 15
- Metadados completos
- Ícones multiplataforma

## Testando a PWA

### 1. Desenvolvimento Local
```bash
npm run dev
```
- Acesse `http://localhost:3000`
- Abra DevTools > Application > Service Workers
- Verifique se o SW está registrado

### 2. Teste de Instalação
- Use Chrome DevTools > Application > Manifest
- Verifique se o manifest está correto
- Teste o prompt de instalação

### 3. Teste Offline
- DevTools > Network > Offline
- Recarregue a página
- Verifique se o cache funciona

### 4. Lighthouse PWA Audit
- DevTools > Lighthouse
- Execute audit PWA
- Verifique pontuação

## Manutenção

### Atualizar Service Worker
1. Modifique `public/sw.js`
2. Incremente `CACHE_NAME`
3. Teste em desenvolvimento
4. Deploy para produção

### Atualizar Manifest
1. Modifique `public/manifest.json`
2. Verifique metadados
3. Teste instalação
4. Deploy para produção

### Adicionar Novos Ícones
1. Crie ícones nos tamanhos necessários
2. Adicione ao manifest
3. Verifique suporte multiplataforma

## Troubleshooting

### Service Worker Não Registra
- Verifique se `public/sw.js` existe
- Confirme configuração no `next.config.ts`
- Verifique console para erros

### Manifest Não Carrega
- Confirme rota `/manifest.json`
- Verifique metadados no layout
- Teste com DevTools

### Prompt Não Aparece
- Verifique se não está instalado
- Confirme suporte do navegador
- Teste em modo incógnito

### Cache Não Funciona
- Verifique service worker
- Confirme estratégia de cache
- Teste offline mode

## Próximos Passos

### Notificações Push
- Implementar backend para envio
- Configurar VAPID keys
- Testar notificações

### Sincronização Offline
- Implementar sync quando online
- Gerenciar conflitos de dados
- Testar cenários offline

### Performance
- Otimizar estratégia de cache
- Implementar lazy loading
- Monitorar métricas PWA

## Recursos Úteis

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Next.js PWA Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/progressive-web-apps)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [Lighthouse PWA Audit](https://developers.google.com/web/tools/lighthouse)
