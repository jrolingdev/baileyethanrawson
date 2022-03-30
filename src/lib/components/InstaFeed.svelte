<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { clickOutside } from '$lib/utils';

	let feed = [];
	let profile = {};
	let active = 0;
	let postOpen = false;

	onMount(async () => {
		const res = await axios.get('/api/insta');
		profile = res.data.profile;
		feed = res.data.feed.data;
	});

	function setActive(index: number) {
		postOpen = true;
		active = index;
		window.document.body.classList.toggle('overflow-hidden');
	}

	function closePost() {
		postOpen = false;
		window.document.body.classList.toggle('overflow-hidden');
	}
</script>

<section id="instaFeed" class="mt-32 w-full px-4 max-w-screen-2xl mx-auto">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
		{#each feed.slice(0, 8) as { id, media_type, media_url, timestamp, thumbnail_url }, index}
			<button on:click={() => setActive(index)}>
				{#if media_type === 'IMAGE'}
					<img class="w-full h-full object-cover object-center" src={media_url} alt={id} />
				{:else if media_type === 'VIDEO'}
					<img class="w-full h-full object-cover object-center" src={thumbnail_url} alt={id} />
				{/if}
			</button>
		{/each}
	</div>
</section>

{#if postOpen}
	<div
		class="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-90"
	>
		<div
			class="bg-white text-black grid grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-4"
			use:clickOutside
			on:click_outside={closePost}
		>
			<div>
				{#if feed[active].media_type === 'IMAGE'}
					<img
						class="w-full h-full object-cover object-center"
						src={feed[active].media_url}
						alt={feed[active].id}
					/>
				{:else if feed[active].media_type === 'VIDEO'}
					<video alt={feed[active].id} src={feed[active].media_url} controls>
						<track kind="captions" />
					</video>
				{/if}
			</div>
			<div class="flex flex-col p-8 overflow-y-scroll">
				<div class="flex flex-col border-b pb-4">
					<span class="font-bold text-xl">Bailey Ethan Rawson Media</span>
					<!-- <span>@{profile.username}</span> -->
					<span>@BaileyEthanRawsonMedia</span>
				</div>
				<p class="py-2 border-b">
					{feed[active].caption}
				</p>
				<span class="py-2">{new Date(feed[active].timestamp).toDateString()}</span>
			</div>
		</div>
	</div>
{/if}
