# Componente Textarea

O componente `Textarea` é um componente reutilizável para campos de texto multilinha que integra perfeitamente com **React Hook Form** e **Zod**.

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
| `size`       | `'sm' \| 'md' \| 'lg'`              | `'md'`      | Tamanho do textarea                                        |
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

```tsx
import { Textarea } from '@/components/form';

function BasicForm() {
  return (
    <Textarea
      label="Descrição"
      placeholder="Digite sua descrição..."
      rows={4}
    />
  );
}
```

## Com React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/form';

function HookFormExample() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <Textarea
      label="Comentário"
      placeholder="Digite seu comentário..."
      error={errors.comment?.message}
      register={register('comment', {
        required: 'Comentário é obrigatório',
        minLength: {
          value: 10,
          message: 'Comentário deve ter pelo menos 10 caracteres',
        },
      })}
      rows={4}
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
import { Textarea } from '@/components/form';

const commentSchema = z.object({
  comment: z
    .string()
    .min(10, 'Comentário deve ter pelo menos 10 caracteres')
    .max(500, 'Comentário deve ter no máximo 500 caracteres'),
});

function ZodFormExample() {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  return (
    <Textarea
      label="Comentário"
      placeholder="Digite seu comentário..."
      error={errors.comment?.message}
      register={register('comment')}
      helperText="Mínimo 10, máximo 500 caracteres"
      rows={4}
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
- Não redimensionável

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

- **Labels associados:** Cada textarea tem um label associado via `htmlFor`
- **IDs únicos:** IDs são gerados automaticamente se não fornecidos
- **Mensagens de erro:** Usam `role="alert"` para leitores de tela
- **Estados visuais:** Cores e bordas indicam claramente o estado
- **Foco visível:** Anel de foco sempre visível

## Personalização

### Classes CSS Adicionais

```tsx
<Textarea label="Campo Personalizado" className="border-2 border-dashed" />
```

### Estilos Inline

```tsx
<Textarea label="Campo com Estilo" style={{ borderWidth: '3px' }} />
```

## Exemplos de Uso

### Campo de Descrição Simples

```tsx
<Textarea label="Descrição" placeholder="Digite sua descrição..." rows={4} />
```

### Campo de Comentário com Validação

```tsx
<Textarea
  label="Comentário"
  placeholder="Digite seu comentário..."
  error={errors.comment?.message}
  register={register('comment')}
  helperText="Mínimo 10 caracteres"
  rows={4}
  required
/>
```

### Campo de Observações

```tsx
<Textarea
  label="Observações"
  placeholder="Observações adicionais..."
  helperText="Informações extras que possam ser úteis"
  rows={3}
/>
```

### Campo com Tamanho Personalizado

```tsx
<Textarea
  label="História"
  size="lg"
  placeholder="Conte sua história..."
  helperText="Máximo de 1000 caracteres"
  rows={6}
/>
```

## Boas Práticas

1. **Sempre use labels:** Ajuda na acessibilidade e usabilidade
2. **Defina rows apropriados:** Use `rows` para controlar a altura inicial
3. **Mensagens de erro claras:** Explique o que está errado e como corrigir
4. **Textos de ajuda:** Use `helperText` para orientações adicionais
5. **Validação em tempo real:** Configure o React Hook Form para validar no blur
6. **Estados visuais consistentes:** Use as variantes para indicar estados claramente
7. **IDs únicos:** Deixe o componente gerar IDs automaticamente para evitar conflitos

## Troubleshooting

### Textarea não está funcionando com React Hook Form

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

### Campo não está redimensionável

- O componente é configurado como `resize-none` por padrão
- Para permitir redimensionamento, adicione `className="resize"` ou `className="resize-y"`
