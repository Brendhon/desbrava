# useDropdown Hook

Hook customizado para gerenciar a lógica de dropdown e navegação por teclado.

## Uso

```typescript
import { useDropdown } from '@/hooks/useDropdown';

const MyComponent = () => {
  const { isOpen, highlightedIndex, dropdownRef, openDropdown, closeDropdown } = useDropdown({
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ],
    onOptionSelect: (option) => {
      console.log('Selected:', option);
    }
  });

  return (
    <div>
      <button onClick={openDropdown}>Open</button>
      {isOpen && (
        <div ref={dropdownRef}>
          {/* Dropdown content */}
        </div>
      )}
    </div>
  );
};
```

## Parâmetros

- `options`: Array de opções disponíveis
- `onOptionSelect`: Callback executado quando uma opção é selecionada

## Retorno

- `isOpen`: Estado de abertura do dropdown
- `highlightedIndex`: Índice da opção destacada
- `dropdownRef`: Ref para o elemento dropdown
- `openDropdown`: Função para abrir o dropdown
- `closeDropdown`: Função para fechar o dropdown
- `setHighlightedIndex`: Função para definir o índice destacado

## Funcionalidades

- Navegação por teclado (setas, Enter, Escape)
- Scroll automático para opção destacada
- Fechamento ao clicar fora
- Gerenciamento de estado interno
