# useFormStyles Hook

Hook customizado para gerenciar estilos de formulário de forma consistente.

## Uso

```typescript
import { useFormStyles } from '@/hooks/useFormStyles';

const MyComponent = () => {
  const styles = useFormStyles({
    size: 'md',
    variant: 'default',
    hasIcon: true,
    iconPosition: 'left',
    className: 'custom-class',
    error: 'Error message'
  });

  return (
    <input className={styles.input} />
    {styles.icon && <Icon className={styles.icon} />}
  );
};
```

## Parâmetros

- `size`: Tamanho do input ('sm' | 'md' | 'lg')
- `variant`: Variante visual ('default' | 'error' | 'success')
- `hasIcon`: Se o input possui ícone
- `iconPosition`: Posição do ícone ('left' | 'right')
- `className`: Classes CSS adicionais
- `error`: Mensagem de erro (aplica automaticamente a variante de erro)

## Retorno

Objeto com:

- `input`: Classes CSS para o input
- `icon`: Classes CSS para o ícone (vazio se não houver ícone)
