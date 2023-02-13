<script lang="ts">
    import { onMount } from "svelte";
    import ChallengeInput from "./ChallengeInput.svelte";
    import ChallengeValue from "./ChallengeValue.svelte";
    import i18n from "./i18n";
    import { settings, resultLog } from "./stores";

    const max = settings.maxValue;
    const ops = settings.operations;

    let a: number;
    let b: number;
    let c: number;
    let op: string;
    let questionIndex: number;
    let response: number;

    onMount(next);

    function evaluate() {
        const expected = [a, b, c];
        const actual: any[] = [a, b, c];
        actual[questionIndex] = response || i18n.skipped;

        const success = expected.every((v, i) => actual[i] === v);

        $resultLog = [`${success ? "✅" : "❌"}  ${actual[0]} ${op} ${actual[1]} = ${actual[2]}\n`, ...$resultLog];
        response = null;
        next();
    }

    function next() {
        switch (ops[nextInt(0, ops.length)]) {
            case "a": // add
                a = nextInt(1, max);
                op = "+";
                b = nextInt(1, max - a);
                c = a + b;
                break;
            case "s": // sub
                a = nextInt(1, max);
                op = "-";
                b = nextInt(1, a);
                c = a - b;
                break;
            case "m": // mul
                a = nextInt(1, 10);
                op = "·";
                b = nextInt(0, max / a);
                c = a * b;
                break;
            case "d":
                b = nextInt(1, max / 3);
                op = ":";
                a = b * nextInt(1, max / b);
                c = a / b;
                break;
        }
        questionIndex = nextInt(0, 3);
    }

    function nextInt(min: number, max: number) {
        return Math.floor(min + Math.random() * (max - min));
    }
</script>

<form on:submit|preventDefault={evaluate}>
    {#if questionIndex == 0}
        <ChallengeInput bind:response />{op}<ChallengeValue value={b} />=<ChallengeValue value={c} />
    {:else if questionIndex == 1}
        <ChallengeValue value={a} />{op}<ChallengeInput bind:response />=<ChallengeValue value={c} />
    {:else}
        <ChallengeValue value={a} />{op}<ChallengeValue value={b} />=<ChallengeInput bind:response />
    {/if}
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
