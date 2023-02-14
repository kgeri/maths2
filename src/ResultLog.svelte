<script>
  import { resultLog } from "./stores";
</script>

<pre>
{#each $resultLog as rl}{rl.correct ? "✅" : "❌"} {rl.message}<br />{/each}
</pre>
