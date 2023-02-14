import { writable, type Writable } from "svelte/store";

export interface Result {
    correct: boolean;
    message: string;
}

export const resultLog: Writable<Result[]> = writable([]);

export interface Settings {
    maxValue: number;
    operations: string;
}

const urlParams = new URLSearchParams(window.location.search);
export const settings = <Settings>{
    maxValue: Number(urlParams.get('max')) || 60,
    operations: urlParams.get('ops') || 'asmd',
};