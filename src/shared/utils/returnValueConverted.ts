type Type = 'boolean' | 'string' | 'number';

type FunctionResponse = string | boolean | number | null;

export function returnValueConverted(value: any, type: Type): FunctionResponse {
  switch(type) {
    case 'boolean':
      value = Boolean(value);
    break
    case 'string':
      value = String(value);
    break
    case 'number':
      value = Number(value);
    break
    default:
      value = null;
  }

  return value;
}

