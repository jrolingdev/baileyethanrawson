<script lang="ts">
	import '../app.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div id="home" />
<Navbar />
<main class="pb-24">
	<slot />
</main>
<Footer />
