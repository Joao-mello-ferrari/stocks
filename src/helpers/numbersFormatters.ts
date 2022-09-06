export function formatCurrencyToDisplay(value: string){
  let valueToFormat = value;
  let negativeFlag = false;
  if(value.includes('-')){
    valueToFormat = value.slice(1);
    negativeFlag = true;
  }

  if(value.includes('.')){
    const decimalPlaces = value.split('.')[1].length;
    if(decimalPlaces === 1) valueToFormat += '0'; 
  }
  else valueToFormat += '00'; 
  
  valueToFormat = valueToFormat.replaceAll(',','');
  valueToFormat = valueToFormat.replaceAll('.','');
  
  let decimal='', integer='';
  for(let i=0; i < valueToFormat.length; i++){
    if(i < valueToFormat.length-2) integer += valueToFormat[i];
    else if(i >= valueToFormat.length-2) decimal += valueToFormat[i];
  }
  valueToFormat = integer + '.' + decimal;

  if(!(/^[0-9].+$/.test(valueToFormat))) valueToFormat = '';
  
  const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
  valueToFormat = formatter.format(Number(valueToFormat));
  
  if(negativeFlag) return '- ' + valueToFormat;
  return valueToFormat;
}

export function formatCurrencyInput(value: string): string{
  let valueToFormat = value;
  let negativeFlag = false;
  if(value.includes('-')){
    valueToFormat = value.slice(1);
    negativeFlag = true;
  }
  
  if(valueToFormat.length !== 1){
    if(valueToFormat.includes('R$')) valueToFormat = valueToFormat.slice(3);
    if(!valueToFormat.includes(',') && !valueToFormat.includes('.')) valueToFormat += '00';
    
    valueToFormat = valueToFormat.replaceAll(',','');
    valueToFormat = valueToFormat.replaceAll('.','');
    
    let decimal='', integer='';
    for(let i=0; i < valueToFormat.length; i++){
      if(i < valueToFormat.length-2)integer += valueToFormat[i];
      else if(i >= valueToFormat.length-2) decimal += valueToFormat[i];
    }
    valueToFormat = integer + '.' + decimal;
  }
  else valueToFormat = String(Number(valueToFormat)/100);
  
  if(!(/^[0-9].+$/.test(valueToFormat))) valueToFormat = '';
  
  const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
  valueToFormat = formatter.format(Number(valueToFormat));
  
  if(negativeFlag) return '- ' + valueToFormat;
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