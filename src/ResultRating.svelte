<script>
    import { resultLog } from "./stores";
    import i18n from "./i18n";

    $: pcnt = Math.round(($resultLog.filter((r) => r.correct).length * 100) / $resultLog.length);
</script>

{#if $resultLog.length < 10}
    <div>Csinálj meg legalább tízet az értékeléshez!</div>
{:else if pcnt >= 90}
    <div class="message r5">{pcnt}% - Ötös 🥰</div>
{:else if pcnt >= 80}
    <div class="message r4">{pcnt}% - Négyes 😊</div>
{:else if pcnt >= 60}
    <div class="message r3">{pcnt}% - Hármas 😟</div>
{:else if pcnt >= 41}
    <div class="message r2">{pcnt}% - Kettes 😧</div>
{:else}
    <div class="message r1">{pcnt}% - Egyes 😢</div>
{/if}

<style>
    .message {
        font-size: 1.5em;
        font-weight: bold;
    }
    .r5 {
        color: #008a09;
    }
    .r4 {
        color: #00666a;
    }
    .r3 {
        color: #b05100;
    }
    .r2 {
        color: #b00400;
    }
    .r1 {
        color: #000000;
    }
</style>
