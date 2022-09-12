export interface FiltersProps{
  changeFormMethod: (method: 'POST' | 'PUT') => void;
}

export interface FilterTypeOption{
  value: 'asset_class' | 'name' | 'amount' | 'price' | 'date';
  text: string;
}

export interface Operand{
  value: -1 | 0 | 1;
  icon: '≤' | '≥' | '=' | '<' | '>';
}

export interface CustomClickEvent extends React.MouseEvent<HTMLLIElement, MouseEvent>{
  target:{
    addEventListener: () => void;
    dispatchEvent: () => boolean; 
    removeEventListener: () => void;
    id: 'asset_class' | 'name' | 'amount' | 'price' | 'date';
    textContent: string;
  }
}

export interface CustomClickEventOperand extends React.MouseEvent<HTMLLIElement, MouseEvent>{
  target:{
    addEventListener: () => void;
    dispatchEvent: () => boolean; 
    removeEventListener: () => void;
    value: -1 | 0 | 1;
  }
}