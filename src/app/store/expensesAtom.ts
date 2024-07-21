import { atom } from 'jotai';
import { Expence } from '../types/responses/expenses';

export const expensesAtom = atom<Expence[]>([]);
export const pageAtom = atom(1);
export const loadingAtom = atom(false);
export const hasMoreAtom = atom(true);