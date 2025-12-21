<script lang="ts">
    interface Props {
        src: string
        alt?: string
    };

    let { src, alt }: Props = $props();
</script>

<img src={src} alt={alt}>

<style>
    img {
        display: inline-block;
        vertical-align: middle;
        width: var(--icon-size);
    }
</style>
