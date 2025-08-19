# Componente Input

O componente `Input` é um componente reutilizável para campos de formulário que integra perfeitamente com **React Hook Form** e **Zod**.

## Características

- ✅ **Type-Safe:** Totalmente tipado com TypeScript
- ✅ **Acessível:** Suporte completo a acessibilidade (labels, IDs, roles)
- ✅ **Responsivo:** Adapta-se a diferentes tamanhos de tela
- ✅ **Temático:** Segue a paleta de cores do Desbrava
- ✅ **Integrado:** Funciona perfeitamente com React Hook Form
- ✅ **Validado:** Suporte nativo para mensagens de erro

## Props

| Prop         | Tipo                                | Padrão      | Descrição                                                  |
| ------------ | ----------------------------------- | ----------- | ---------------------------------------------------------- |
| `label`      | `string`                            | -           | Label do campo                                             |
| `error`      | `string`                            | -           | Mensagem de erro                                           |
| `size`       | `'sm' \| 'md' \| 'lg'`              | `'md'`      | Tamanho do input                                           |
| `variant`    | `'default' \| 'error' \| 'success'` | `'default'` | Variante visual                                            |
| `register`   | `UseFormRegisterReturn`             | -           | Objeto de registro do React Hook Form                      |
| `helperText` | `string`                            | -           | Texto de ajuda                                             |
| `className`  | `string`                            | -           | Classes CSS adicionais                                     |
| `id`         | `string`                            | -           | ID personalizado (gerado automaticamente se não fornecido) |

## Tamanhos

### Small (`sm`)

- Padding: `px-3 py-2`
- Texto: `text-sm`
- Ideal para formulários compactos

### Medium (`md`) - Padrão

- Padding: `px-4 py-3`
- Texto: `text-base`
- Tamanho padrão para a maioria dos casos

### Large (`lg`)

- Padding: `px-5 py-4`
- Texto: `text-lg`
- Ideal para formulários de destaque

## Variantes

### Default

- Borda: `border-slate-dark/20`
- Foco: `focus:ring-royal-purple`

### Error

- Borda: `border-red-500`
- Foco: `focus:ring-red-500`
- Aplicada automaticamente quando há erro

### Success

- Borda: `border-green-500`
- Foco: `focus:ring-green-500`

## Uso Básico

````tsx
import Input from '@/components/form/Input';

function BasicForm() {
  return (
    <Input
      label="Nome"
      placeholder="Digite seu nome"
      required
    />
  );
}

## Com React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import Input from '@/components/form/Input';

function HookFormExample() {
  const { register, formState: { errors } } = useForm();

  return (
    <Input
      label="Email"
      type="email"
      placeholder="seu@email.com"
      error={errors.email?.message}
      register={register('email', {
        required: 'Email é obrigatório',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Email inválido'
        }
      })}
      required
    />
  );
}

## Com Zod e React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTripSchema } from '@/lib/schemas';
import Input from '@/components/form/Input';

function ZodFormExample() {
  const { register, formState: { errors } } = useForm({
    resolver: zodResolver(createTripSchema)
  });

  return (
    <Input
      label="Título da Viagem"
      placeholder="Ex: Aventura na Europa"
      error={errors.title?.message}
      register={register('title')}
      required
    />
  );
}

## Estados Visuais

### Estado Normal
- Borda cinza com transparência
- Fundo escuro
- Texto branco

### Estado de Foco
- Anel roxo ao redor do campo
- Borda roxa
- Transição suave

### Estado de Erro
- Borda vermelha
- Anel vermelho no foco
- Mensagem de erro abaixo

### Estado de Sucesso
- Borda verde
- Anel verde no foco

## Acessibilidade

- **Labels associados:** Cada input tem um label associado via `htmlFor`
- **IDs únicos:** IDs são gerados automaticamente se não fornecidos
- **Mensagens de erro:** Usam `role="alert"` para leitores de tela
- **Estados visuais:** Cores e bordas indicam claramente o estado
- **Foco visível:** Anel de foco sempre visível

## Personalização

### Classes CSS Adicionais

```tsx
<Input
  label="Campo Personalizado"
  className="border-2 border-dashed"
/>
````

### Estilos Inline

```tsx
<Input label="Campo com Estilo" style={{ borderWidth: '3px' }} />
```

## Exemplos de Uso

### Campo de Texto Simples

```tsx
<Input label="Nome Completo" placeholder="Digite seu nome completo" required />
```

### Campo de Email com Validação

```tsx
<Input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  error={errors.email?.message}
  register={register('email')}
  helperText="Usaremos para enviar confirmações"
  required
/>
```

### Campo Numérico

```tsx
<Input
  label="Idade"
  type="number"
  min="0"
  max="120"
  placeholder="25"
  helperText="Idade em anos"
/>
```

### Campo de Data

```tsx
<Input label="Data de Nascimento" type="date" required />
```

### Campo com Tamanho Personalizado

```tsx
<Input
  label="Comentário"
  size="lg"
  placeholder="Digite seu comentário..."
  helperText="Máximo de 500 caracteres"
/>
```

## Boas Práticas

1. **Sempre use labels:** Ajuda na acessibilidade e usabilidade
2. **Mensagens de erro claras:** Explique o que está errado e como corrigir
3. **Textos de ajuda:** Use `helperText` para orientações adicionais
4. **Validação em tempo real:** Configure o React Hook Form para validar no blur
5. **Estados visuais consistentes:** Use as variantes para indicar estados claramente
6. **IDs únicos:** Deixe o componente gerar IDs automaticamente para evitar conflitos

## Troubleshooting

### Input não está funcionando com React Hook Form

- Certifique-se de passar a prop `register` corretamente
- Verifique se o `useForm` está sendo chamado no componente pai
- Confirme se o nome do campo está correto no `register`

### Mensagens de erro não aparecem

- Verifique se a prop `error` está sendo passada
- Confirme se o React Hook Form está configurado para mostrar erros
- Verifique se o schema Zod está validando corretamente

### Estilos não estão aplicando

- Verifique se o Tailwind CSS está configurado corretamente
- Confirme se as classes estão sendo aplicadas via `className`
- Verifique se não há conflitos de CSS
