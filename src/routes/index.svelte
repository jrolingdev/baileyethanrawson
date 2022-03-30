<script lang="ts" context="module">
	import { space, accessToken } from '$lib/env';

	export const prerender = true;

	export async function load({ fetch }) {
		const projectsRes = await fetch(`https://graphql.contentful.com/content/v1/spaces/${space}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `
					query {
						projectCollection {
							items {
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
					}
				`
			})
		});

		const rawProjectData = await projectsRes.json();
		const projectData = rawProjectData.data.projectCollection.items;

		return {
			props: {
				projects: projectData
			}
		};
	}
</script>

<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Collage from '$lib/components/Collage.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import AboutMe from '$lib/components/AboutMe.svelte';
	import InstaFeed from '$lib/components/InstaFeed.svelte';
	export let projects;
</script>

<svelte:head>
	<title>Bailey Ethan Rawson | Video Editor</title>
</svelte:head>

<Banner />
<Hero />
<Collage {projects} />
<AboutMe />
<InstaFeed />
<Contact />
