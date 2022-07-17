export function getDateConverted(date: string, toPresent=false){
  const thisDate = new Date(date);
  const y = thisDate.getFullYear();
  const m = thisDate.getMonth();
  const d = thisDate.getDate();

  if(toPresent) return `${d} / ${m+1} / ${y}`;
  return `${y}-${m+1}-${d}`;
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