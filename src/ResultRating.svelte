<script>
    import { resultLog } from "./stores";
    import i18n from "./i18n";

    $: pcnt = Math.round(($resultLog.filter((r) => r.correct).length * 100) / $resultLog.length);
</script>

{#if $resultLog.length < 10}
    <div>{i18n.lessThanTenResults}</div>
{:else if pcnt >= 90}
    <div class="message r5">{pcnt}% - {i18n.rating5}</div>
{:else if pcnt >= 80}
    <div class="message r4">{pcnt}% - {i18n.rating4}</div>
{:else if pcnt >= 60}
    <div class="message r3">{pcnt}% - {i18n.rating3}</div>
{:else if pcnt >= 41}
    <div class="message r2">{pcnt}% - {i18n.rating2}</div>
{:else}
    <div class="message r1">{pcnt}% - {i18n.rating1}</div>
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
