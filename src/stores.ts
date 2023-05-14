import { writable, type Writable } from "svelte/store";

export interface Result {
    correct: boolean;
    message: string;
}

export const resultLog: Writable<Result[]> = writable([]);

export interface Settings {
    type: string;
    maxValue: number;
    operations: string;
}

const urlParams = new URLSearchParams(window.location.search);
export const settings = <Settings>{
    type: urlParams.get('type') || 'arithmetic', // [arithmetic|divrem]
    maxValue: Number(urlParams.get('max')) || 100,
    operations: urlParams.get('ops') || 'asmd', // [a|s|m|d] for add, sub, mul, div
};