export interface Register{
  id: string;
  asset_class: string;
  name: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  action_type: 'buy' | 'sell';
};

