import { Register } from './Register';

export interface IMappedData{
  'a': {
    name: 'Ações',
    registers: Register[],
    total: number,
    perc: number,
  },
  'b': {
    name: 'Real State',
    registers: Register[],
    total: number,
    perc: number,
  },
  'c': {
    name: 'Cash',
    registers: Register[],
    total: number,
    perc: number,
  },
  'd': {
    name: 'Ativos Int',
    registers: Register[],
    total: number,
    perc: number,
  },
}

export interface IMGraphData{
  sum: number;
  a: number;
  b: number;
  c: number;
  d: number;
}