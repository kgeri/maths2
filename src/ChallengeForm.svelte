<script lang="ts">
    import ArtihmeticChallenge from "./ArtihmeticChallenge.svelte";
    import i18n from "./i18n";

    let evaluateChallenge: () => {};
</script>

<form on:submit|preventDefault={evaluateChallenge}>
    <ArtihmeticChallenge bind:evaluate={evaluateChallenge} />
    <input type="submit" value={i18n.submit} />
</form>

<style>
    form {
        font-size: 3em;
        text-align: center;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        align-content: center;
        align-items: center;
    }

    input[type="submit"] {
        grid-area: 2 / 1 / 3 / 6;
    }
</style>
