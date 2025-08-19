# useFormField Hook

Hook customizado para facilitar a integração com React Hook Form.

## Uso

```typescript
import { useFormField } from '@/hooks/useFormField';

const MyComponent = () => {
  const { handleChange, handleInputChange } = useFormField({
    register: formRegister,
    onValueChange: (value) => {
      console.log('Value changed:', value);
    }
  });

  return (
    <input
      onChange={handleInputChange}
      onBlur={() => handleChange('new value')}
    />
  );
};
```

## Parâmetros

- `register`: Objeto de registro do React Hook Form (opcional)
- `onValueChange`: Callback executado quando o valor muda (opcional)

## Retorno

- `handleChange`: Função para atualizar o valor diretamente
- `handleInputChange`: Função para lidar com eventos de input
- `register`: Objeto de registro original

## Funcionalidades

- Integração automática com React Hook Form
- Suporte a callbacks customizados
- Criação de eventos sintéticos para compatibilidade
- Gerenciamento unificado de mudanças de valor
