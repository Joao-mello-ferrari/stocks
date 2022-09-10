import { Register } from './Register';

export interface IMappedData{
  'a': {
    name: 'Ações',
    registers: Register[],
    total: number,
    perc: string,
  },
  'b': {
    name: 'Real State',
    registers: Register[],
    total: number,
    perc: string,
  },
  'c': {
    name: 'Cash',
    registers: Register[],
    total: number,
    perc: string,
  },
  'd': {
    name: 'Ativos Int',
    registers: Register[],
    total: number,
    perc: string,
  },
}

export interface IMGraphData{
  sum: number;
  a: number;
  b: number;
  c: number;
  d: number;
}