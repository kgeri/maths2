<script lang="ts">
    import { onMount } from "svelte";
    import { settings } from "./stores";

    export let response: number;
    export let autofocus: boolean = false;
    let responseInput: HTMLInputElement;

    onMount(() => {
        if (autofocus) focus();
    });

    export function focus() {
        responseInput.focus();
    }
</script>

<input bind:this={responseInput} bind:value={response} type="number" min="0" max={settings.maxValue} required />

<style>
    input {
        width: 100%;
        padding: 0px;
        margin: 0px;
        text-align: center;
    }
</style>
