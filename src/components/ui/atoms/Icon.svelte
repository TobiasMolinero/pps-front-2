<script lang="ts">
    interface Props {
        src: string
        alt?: string
        width?: string
    };

    let { src, alt, width }: Props = $props();
</script>

<img src={src} alt={alt} style={`width: ${width ? width : 'var(--icon-size)'}`}>

<style>
    img {
        display: inline-block;
        vertical-align: middle;
        /* width: var(--icon-size); */
    }
</style>
