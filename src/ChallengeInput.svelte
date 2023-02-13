<script lang="ts">
    import { onMount } from "svelte";
    import { settings } from "./stores";

    export let response: number;
    let responseInput: HTMLInputElement;

    onMount(() => {
        responseInput.focus();
    });
</script>

<input bind:this={responseInput} bind:value={response} type="number" min="0" max={settings.maxValue} />

<style>
    input {
        width: 100%;
        padding: 0px;
        margin: 0px;
        text-align: center;
    }
</style>
