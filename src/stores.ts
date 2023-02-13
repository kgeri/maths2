import { writable, type Writable } from "svelte/store";

const urlParams = new URLSearchParams(window.location.search);

export const resultLog: Writable<string[]> = writable([]);

export interface Settings {
    maxValue: number;
    operations: string;
}

export const settings = <Settings>{
    maxValue: Number(urlParams.get('max')) || 60,
    operations: urlParams.get('ops') || 'asmd',
};