<script lang="ts">
    // Presents a "division with remainder" challenge of the form: `A / B = C, D`, where C and D are the values to find.
    // - A <= settings.max, B <= settings.max
    // - B <= A (just to keep things interesting)
    // - D >= 0 (we're considering the positive modulo only)

    import { onMount } from "svelte";
    import ChallengeInput from "./ChallengeInput.svelte";
    import ChallengeValue from "./ChallengeValue.svelte";
    import { settings, type Result, resultLog } from "./stores";

    const max = settings.maxValue;

    let a: number;
    let b: number;
    let c: number;
    let d: number;
    let responseInput: ChallengeInput;

    onMount(next);

    export function evaluate() {
        const resultOk = Math.floor(a / b) === c;
        const remainderOk = a % b === d;

        const result = <Result>{
            correct: resultOk && remainderOk,
            message: `${a} / ${b} = ${c} (${d})`,
        };

        $resultLog = [result, ...$resultLog];
        next();
    }

    function next() {
        a = nextInt(1, max);
        b = nextInt(1, a);
        c = null;
        d = null;
        responseInput.focus();
    }

    function nextInt(min: number, max: number) {
        return Math.floor(min + Math.random() * (max - min));
    }
</script>

<div class="question">
    <ChallengeValue value={a} />/<ChallengeValue value={b} />=<ChallengeInput
        autofocus
        bind:response={c}
        bind:this={responseInput}
    />
    <ChallengeInput bind:response={d} />
</div>

<style>
    .question {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        align-content: center;
        align-items: center;
    }
</style>
