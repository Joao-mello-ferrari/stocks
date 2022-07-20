export function formatCurrency(value: string, shouldNotDivide=true): string{
  let valueToFormat = value;
  if(value.length !== 1){
    if(value.includes('R$')) value = value.slice(3);
    if(!value.includes(',') && !value.includes('.')) value += '00';

    value = value.replaceAll(',','');
    value = value.replaceAll('.','');
    if(!(/^[0-9]+$/.test(value))) value = value.slice(0,value.length-1);
    
    let decimal='', integer='';
    for(let i=0; i < value.length; i++){
      if(i < value.length-2)integer += value[i];
      else if(i >= value.length-2) decimal += value[i];
    }
    valueToFormat = integer + '.' + decimal;
  }
  else if(!shouldNotDivide) valueToFormat = String(Number(value)/100);
  
  if(!(/^[0-9]+$/.test(value))) valueToFormat = '';

  const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
  valueToFormat = formatter.format(Number(valueToFormat));
  
  return valueToFormat;
}

export function formatNumber(amount: string): string{
  amount = amount.replaceAll('.','');
  amount = amount.replaceAll(',','');
  if(!(/^[0-9]+$/.test(amount))) amount = amount.slice(0,amount.length-1);
  const formatter = Intl.NumberFormat('pt-BR', { notation: 'standard' })
  
  amount = formatter.format(Number(amount));
  
  return amount;
}

export function calculateTotal(price_in: string, amount_in: string): string{
  if(!price_in || !amount_in) return '';

  let price = price_in;
  let amount = amount_in;

  price = price.slice(3);
  price = price.replaceAll(',','');
  price = price.replaceAll('.','');
  
  let integer = price.slice(0,price.length-2);
  let decimal = price.slice(price.length-2);
  price = integer + '.' + decimal;

  amount = amount.replaceAll(',','');
  amount = amount.replaceAll('.','');


  const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
  const total = formatter.format(Number(price)*Number(amount));

  return total;
}

export function getRawCurVal(value: string | number){
  let val: string|number = String(value);
  if(val.includes('R$')) val = val.slice(3);

  val = val.replaceAll(',','').replaceAll('.','');
  val = Number(val)/100;
  console.log(val)
  return String(val);
}

export function getRawNumberVal(value: string | number){
  let val: string|number = String(value);
  return val.replaceAll(',','').replaceAll('.','');
}

export function compareNumbers(a:number, b:number): number{
  if(a<b) return -1;
  if(a>b) return 1;
  return 0;
}