<script lang="ts">
    // Presents a simple artihmetic challenge of the form: `A [+-*/] B = C`, where either A, B or C are unknown.

    import { onMount } from "svelte";
    import ChallengeInput from "./ChallengeInput.svelte";
    import ChallengeValue from "./ChallengeValue.svelte";
    import { settings, resultLog, type Result } from "./stores";

    const max = settings.maxValue;
    const ops = settings.operations;

    let a: number;
    let b: number;
    let c: number;
    let op: string;
    let questionIndex: number;
    let response: number;

    onMount(next);

    export function evaluate() {
        const expected = [a, b, c];
        const actual: any[] = [a, b, c];
        actual[questionIndex] = response;

        const result = <Result>{
            correct: expected.every((v, i) => actual[i] === v),
            message: `${actual[0]} ${op} ${actual[1]} = ${actual[2]}`,
        };

        $resultLog = [result, ...$resultLog];
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
                b = nextInt(1, max / a);
                c = a * b;
                break;
            case "d": // div
                b = nextInt(1, max / 3);
                op = ":";
                c = nextInt(1, max / b);
                a = b * c;
                break;
        }
        questionIndex = nextInt(0, 3);
    }

    function nextInt(min: number, max: number) {
        return Math.floor(min + Math.random() * (max - min));
    }
</script>

<div class="question">
    {#if questionIndex == 0}
        <ChallengeInput autofocus bind:response />{op}<ChallengeValue value={b} />=<ChallengeValue value={c} />
    {:else if questionIndex == 1}
        <ChallengeValue value={a} />{op}<ChallengeInput autofocus bind:response />=<ChallengeValue value={c} />
    {:else}
        <ChallengeValue value={a} />{op}<ChallengeValue value={b} />=<ChallengeInput autofocus bind:response />
    {/if}
</div>

<style>
    .question {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;
        align-content: center;
        align-items: center;
    }
</style>
