<script lang="ts" context="module">
	import { space, accessToken } from '$lib/env';

	export async function load({ fetch, params }) {
		const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${space}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `
					query {
						project(id: "${params.id}") {
							name,
							description,
							youtubeVideoId,
							body {
								json
							},
							sys {
								id
							}
						}
					}
				`
			})
		});

		const rawData = await res.json();
		const { name, description, youtubeVideoId, body } = rawData.data.project;

		return {
			props: {
				name,
				description,
				youtubeVideoId,
				body
			}
		};
	}
</script>

<script lang="ts">
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

	export let name;
	export let description;
	export let youtubeVideoId;
	export let body;
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<article class="px-4 max-w-screen-xl mx-auto">
	<header>
		<iframe
			class="w-full h-[300px] md:h-[450px] lg:h-[600px]"
			src={`https://www.youtube.com/embed/${youtubeVideoId}`}
			title={name}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
		<h1 class="mt-16">{name}</h1>
		<p>{description}</p>
	</header>
	{@html documentToHtmlString(body.json)}
</article>

<style lang="postcss">
	article {
		@apply pb-12;
	}

	h1,
	h2 {
		@apply my-8 font-bold;
	}

	h1 {
		@apply text-4xl;
	}

	h2 {
		@apply text-2xl;
	}

	p {
		@apply mb-4;
	}

	ul {
		@apply pl-4 list-disc;
	}
</style>
