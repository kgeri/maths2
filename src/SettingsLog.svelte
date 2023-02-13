<script lang="ts">
    import { settings } from "./stores";
    import i18n from "./i18n";

    const opNames = [...settings.operations].map((op) => i18n.operations[op]);
</script>

<small>
    Max: {settings.maxValue}, {opNames.join(", ")}
</small>
