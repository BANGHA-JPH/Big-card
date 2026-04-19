# Components

This directory contains reusable UI components.

## Structure

- **Button/** - Button components
- **Input/** - Input field components
- **Card/** - Card components
- **Modal/** - Modal/Dialog components
- **Loading/** - Loading spinners and skeleton loaders
- **Common/** - Other common components

## Usage Example

```typescript
import Button from '@components/Button/Button';

export default function MyComponent() {
  return (
    <Button text="Click me" onPress={() => console.log('Clicked')} />
  );
}
```
