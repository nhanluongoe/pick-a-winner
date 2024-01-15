export interface Prize {
  type: string;
  name: string;
  quantity: number;
  initialQuantity: number;
  batch: number;
  for: 'all' | 'internal';
}
