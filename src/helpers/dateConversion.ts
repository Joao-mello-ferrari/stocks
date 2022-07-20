export function getDateConverted(date: string, toPresent=false){
  const thisDate = new Date(date);
  const y = thisDate.getFullYear();
  const m = String(thisDate.getMonth()+1).padStart(2,'0');
  const d = String(thisDate.getDate()).padStart(2,'0');

  if(toPresent) return `${d} / ${m} / ${y}`;
  return `${y}-${m}-${d}`;
}

export function isoDateFromInput(date: string): string{
  const [y,m,d] = (date.split('-')).map(item=>Number(item));
  return new Date(y,m-1,d).toISOString();
}

export function compareDates(date1: string, date2: string): number{
  const a = new Date(date1);
  const b = new Date(date2);

  if(a.getFullYear() < b.getFullYear()) return -1;
  else if(a.getFullYear() > b.getFullYear()) return 1;
  else if(a.getMonth() < b.getMonth()) return -1;
  else if(a.getMonth() > b.getMonth()) return 1;
  else if(a.getDate() < b.getDate()) return -1;
  else if(a.getDate() > b.getDate()) return 1;
  return 0;
}