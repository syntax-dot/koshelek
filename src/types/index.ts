export interface LogTransaction {
  timestamp: number;
  oldValue: string;
  newValue: string;
}

export interface OrderItem {
  E: number
  T: number
  U: number
  a: [string, string][]
  b: [string, string][]
  e: string
  pu: number
  s: string
  u: number
}

export type Order = [number, number]
