# Componente Input

O componente `Input` é um componente reutilizável para campos de formulário que integra perfeitamente com **React Hook Form** e **Zod**. Suporta tanto campos básicos quanto campos com ícones.

## Características

- ✅ **Type-Safe:** Totalmente tipado com TypeScript
- ✅ **Acessível:** Suporte completo a acessibilidade (labels, IDs, roles)
- ✅ **Responsivo:** Adapta-se a diferentes tamanhos de tela
- ✅ **Temático:** Segue a paleta de cores do Desbrava
- ✅ **Integrado:** Funciona perfeitamente com React Hook Form
- ✅ **Validado:** Suporte nativo para mensagens de erro
- ✅ **Iconizado:** Suporte opcional para ícones do Lucide React

## Props

| Prop           | Tipo                                | Padrão      | Descrição                                                  |
| -------------- | ----------------------------------- | ----------- | ---------------------------------------------------------- |
| `label`        | `string`                            | -           | Label do campo                                             |
| `error`        | `string`                            | -           | Mensagem de erro                                           |
| `size`         | `'sm' \| 'md' \| 'lg'`              | `'md'`      | Tamanho do input                                           |
| `variant`      | `'default' \| 'error' \| 'success'` | `'default'` | Variante visual                                            |
| `register`     | `UseFormRegisterReturn`             | -           | Objeto de registro do React Hook Form                      |
| `helperText`   | `string`                            | -           | Texto de ajuda                                             |
| `className`    | `string`                            | -           | Classes CSS adicionais                                     |
| `id`           | `string`                            | -           | ID personalizado (gerado automaticamente se não fornecido) |
| `icon`         | `LucideIcon`                        | -           | Ícone a ser exibido (opcional)                             |
| `iconPosition` | `'left' \| 'right'`                 | `'left'`    | Posição do ícone (quando `icon` é fornecido)               |

## Tamanhos

### Small (`sm`)

- Padding: `px-3 py-2`
- Texto: `text-sm`
- Ícone: `w-4 h-4` (quando aplicável)
- Ideal para formulários compactos

### Medium (`md`) - Padrão

- Padding: `px-4 py-3`
- Texto: `text-base`
- Ícone: `w-5 h-5` (quando aplicável)
- Tamanho padrão para a maioria dos casos

### Large (`lg`)

- Padding: `px-5 py-4`
- Texto: `text-lg`
- Ícone: `w-6 h-6` (quando aplicável)
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

## Posições do Ícone

### Left (Padrão)

- Ícone posicionado à esquerda
- Padding esquerdo: `pl-12`
- Padding direito: `pr-4`

### Right

- Ícone posicionado à direita
- Padding esquerdo: `pl-4`
- Padding direito: `pr-12`

## Uso Básico

### Campo Simples

```tsx
import { Input } from '@/components/form';

function BasicForm() {
  return <Input label="Nome" placeholder="Digite seu nome" required />;
}
```

### Campo com Ícone

```tsx
import { Input } from '@/components/form';
import { Mail } from 'lucide-react';

function IconForm() {
  return (
    <Input label="Email" placeholder="seu@email.com" icon={Mail} required />
  );
}
```

## Com React Hook Form

### Campo Simples

```tsx
import { useForm } from 'react-hook-form';
import { Input } from '@/components/form';

function HookFormExample() {
  const {
    register,
    formState: { errors },
  } = useForm();

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
          message: 'Email inválido',
        },
      })}
      required
    />
  );
}
```

### Campo com Ícone

```tsx
import { useForm } from 'react-hook-form';
import { Input } from '@/components/form';
import { Mail } from 'lucide-react';

function HookFormIconExample() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <Input
      label="Email"
      type="email"
      placeholder="seu@email.com"
      icon={Mail}
      error={errors.email?.message}
      register={register('email', {
        required: 'Email é obrigatório',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Email inválido',
        },
      })}
      required
    />
  );
}
```

## Com Zod e React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/form';
import { Mail } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
});

function ZodFormExample() {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  return (
    <Input
      label="Email"
      type="email"
      placeholder="seu@email.com"
      icon={Mail}
      error={errors.email?.message}
      register={register('email')}
      helperText="Usaremos para enviar confirmações"
      required
    />
  );
}
```

## Estados Visuais

### Estado Normal

- Borda cinza com transparência
- Fundo escuro
- Texto branco
- Ícone em cor neutra (quando aplicável)

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
- **Ícones decorativos:** Marcados com `aria-hidden="true"` quando aplicável

## Personalização

### Classes CSS Adicionais

```tsx
<Input label="Campo Personalizado" className="border-2 border-dashed" />
```

### Estilos Inline

```tsx
<Input label="Campo com Estilo" style={{ borderWidth: '3px' }} />
```

## Exemplos de Uso

### Campo de Texto Simples

```tsx
<Input label="Nome Completo" placeholder="Digite seu nome completo" required />
```

### Campo de Email com Validação e Ícone

```tsx
<Input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  icon={Mail}
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

### Campo de Data com Ícone

```tsx
<Input
  label="Data de Nascimento"
  type="date"
  icon={Calendar}
  helperText="Data no formato DD/MM/AAAA"
  required
/>
```

### Campo de Telefone com Ícone à Direita

```tsx
<Input
  label="Telefone"
  type="tel"
  placeholder="(11) 99999-9999"
  icon={Phone}
  iconPosition="right"
  helperText="Telefone para contato"
/>
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

### Campo de Localização com Ícone

```tsx
<Input
  label="Endereço"
  placeholder="Rua, número, bairro..."
  icon={MapPin}
  helperText="Endereço completo"
  required
/>
```

## Boas Práticas

1. **Sempre use labels:** Ajuda na acessibilidade e usabilidade
2. **Escolha ícones apropriados:** Use ícones que representem claramente o campo
3. **Mensagens de erro claras:** Explique o que está errado e como corrigir
4. **Textos de ajuda:** Use `helperText` para orientações adicionais
5. **Validação em tempo real:** Configure o React Hook Form para validar no blur
6. **Estados visuais consistentes:** Use as variantes para indicar estados claramente
7. **IDs únicos:** Deixe o componente gerar IDs automaticamente para evitar conflitos
8. **Posicionamento de ícones:** Use `left` para campos de entrada e `right` para campos de ação

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

### Ícone não está aparecendo

- Certifique-se de passar um ícone válido do Lucide React
- Verifique se o ícone está sendo importado corretamente
- Confirme se não há conflitos de CSS que possam estar ocultando o ícone

### Padding incorreto com ícones

- O componente aplica automaticamente o padding correto baseado na presença do ícone
- Para campos sem ícone, o padding padrão é aplicado
- Para campos com ícone, o padding é ajustado para acomodar o ícone
