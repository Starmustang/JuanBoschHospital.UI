export const formatNumericInput = (input: string): string => {
    // Permitir solo números y un punto decimal
    let value = input.replace(/[^0-9.]/g, '');
  
    // Asegurar que solo haya un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
  
    // Si empieza con un punto, agregar un "0" al inicio
    if (value.startsWith('.')) {
      value = '0' + value;
    }
    return value;
};  