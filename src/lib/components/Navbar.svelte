<script lang="ts">
	import { onMount } from 'svelte';

	let menuOpen = false;
	let scrolled = false;
	
	const menuItems = [
		{ label: 'Projects', href: '#projects' },
		{ label: 'About Me', href: '#about-me' },
		{ label: 'Contact', href: '#contact' }
	];

	onMount(() => {
		window.addEventListener('scroll', function () {
			scrolled = window.scrollY > 150;
		});
	});

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function scrollTo(selector, yOffset = 0){
  const el = document.querySelector(selector);
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({top: y, behavior: 'smooth'});
}
</script>

<nav
	id="navbar"
	class="flex justify-between px-4 md:px-8 py-4 z-40"
	class:fixed={scrolled}
	class:w-screen={scrolled}
	class:left-0={scrolled}
	class:top-0={scrolled}
	class:bg-black={scrolled}
	class:shadow={scrolled}
	class:transition-all={scrolled}
	class:duration-200={scrolled}
	class:ease-in-out={scrolled}
	class:py-2={scrolled}
>
	<div class="flex">
		<img
			class="w-auto blur-none"
			class:h-10={scrolled}
			class:h-20={!scrolled}
			src={scrolled ? '/images/logo-notext-white.png' : '/images/logo-white.png'}
			alt="Logo"
		/>
	</div>
	<div class="hidden md:flex grow items-center ml-12">
		<ul id="menu">
			<li
				class="inline mx-6 font-medium tracking-wide hover:text-red-500 hover:cursor-pointer transition-colors duration-100 ease-in-out"
				on:click={() => scrollTo("body", 0)}
			>
				Home
			</li>
			{#each menuItems as { label, href }}
				<li
					class="inline mx-6 font-medium tracking-wide hover:text-red-500 hover:cursor-pointer transition-colors duration-100 ease-in-out"
					on:click={() => scrollTo(href, -400)}
				>
					{label}
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex items-center">
		<button class="md:hidden p-2" type="button" class:is-active={menuOpen} on:click={toggleMenu}>
			{#if menuOpen}
				<div>
					<span class="iconify text-4xl" data-icon="mdi:close" />
				</div>
			{:else}
				<div>
					<span class="iconify text-4xl" data-icon="mdi:menu" />
				</div>
			{/if}
		</button>
	</div>
	<slot />
</nav>
<ul
	class="fixed md:hidden top-0 z-50 transition-all duration-300 ease-out w-3/4 h-screen bg-black shadow-lg"
	class:-left-full={!menuOpen}
	class:left-0={menuOpen}
>
	<a class="block mx-4 py-4 border-b font-medium tracking-wide" href="/"> Home </a>
	{#each menuItems as { label, href }}
		<li
			class="mx-4 py-4 border-b font-medium tracking-wide"
			on:click={() => {
				menuOpen = false;
				document.querySelector(href).scrollIntoView({
					behavior: 'smooth'
				});
			}}
		>
			{label}
		</li>
	{/each}
</ul>
