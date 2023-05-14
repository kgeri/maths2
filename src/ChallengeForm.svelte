<script lang="ts">
    import ArtihmeticChallenge from "./ArtihmeticChallenge.svelte";
    import DivWithRemainderChallenge from "./DivWithRemainderChallenge.svelte";
    import i18n from "./i18n";
    import { settings } from "./stores";

    const opNames = [...settings.operations].map((op) => i18n.operations[op]);

    let evaluateChallenge: () => {};
</script>

<small>
    {#if settings.type === "divrem"}
        {i18n.types.divrem},
        {i18n.max}: {settings.maxValue}
    {:else}
        {i18n.types.arithmetic},
        {i18n.max}: {settings.maxValue},
        {opNames.join(", ")}
    {/if}
</small>
<form on:submit|preventDefault={evaluateChallenge}>
    {#if settings.type === "divrem"}
        <DivWithRemainderChallenge bind:evaluate={evaluateChallenge} />
    {:else}
        <ArtihmeticChallenge bind:evaluate={evaluateChallenge} />
    {/if}
    <input type="submit" value={i18n.submit} />
</form>

<style>
    form {
        font-size: 3em;
        text-align: center;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
        align-content: center;
        align-items: center;
    }

    input[type="submit"] {
        grid-area: 2 / 1 / 3 / 6;
    }
</style>
