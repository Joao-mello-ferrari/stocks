import { FaunaRefObject } from './FaunaRefObject'

export interface Register{
  ref: FaunaRefObject;
  asset_class: string;
  name: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  action_type: 'buy' | 'sell';
};

