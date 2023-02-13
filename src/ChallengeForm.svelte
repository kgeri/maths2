<script lang="ts">
    import { onMount } from "svelte";
    import { settings, resultLog } from "./stores";

    const Ops = "+-·:";

    let responseInput: HTMLInputElement;

    let a: number;
    let b: number;
    let op: string;
    let response: number;

    export function evaluate() {
        if (calculate() === response) {
            $resultLog = [...$resultLog, `✅ ${a} ${op} ${b} = ${response}\n`];
        } else {
            $resultLog = [...$resultLog, `❌ ${a} ${op} ${b} = ${response || "<nem válaszolt>"}\n`];
        }
        response = null;
        next();
    }

    onMount(() => {
        console.log(`Using settings: ${JSON.stringify(settings)}`);
        next();
    });

    function next() {
        const max = settings.maxValue;
        op = Ops[nextInt(0, Ops.length)];
        switch (op) {
            case "+":
                a = nextInt(1, max);
                b = nextInt(1, max - a);
                break;
            case "-":
                a = nextInt(1, max);
                b = nextInt(1, a);
                break;
            case "·":
                a = nextInt(1, 10);
                b = nextInt(0, max / a);
                break;
            case ":":
                b = nextInt(1, max / 3);
                a = b * nextInt(1, max / b);
                break;
        }
        responseInput.focus();
    }

    function calculate(): number {
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "·":
                return a * b;
            case ":":
                return a / b;
        }
    }

    function nextInt(min: number, max: number) {
        return Math.floor(min + Math.random() * (max - min));
    }
</script>

<form on:submit|preventDefault={evaluate}>
    <div>
        <span>{a} {op} {b} = </span><input
            bind:this={responseInput}
            bind:value={response}
            type="number"
            min="0"
            max="50"
            maxlength="2"
        />
        <input type="submit" value="Mehet!" />
    </div>
</form>

<style>
    form {
        font-size: 3em;
        text-align: center;
    }
</style>
