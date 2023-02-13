import { writable, type Writable } from "svelte/store";

const urlParams = new URLSearchParams(window.location.search);

export const resultLog: Writable<string[]> = writable([]);

export interface Settings {
    maxValue: number;
}

export const settings = <Settings>{
    maxValue: Number(urlParams.get('m')) || 60
};