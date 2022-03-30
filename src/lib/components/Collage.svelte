<script lang="ts">
	import Hoverable from '$lib/components/Hoverable.svelte';
	export let projects = [];
</script>

<section id="projects" class="mt-32 w-full px-4 max-w-screen-2xl mx-auto">
	<h1 class="text-5xl font-bold max-w-screen-2xl mx-auto">Check out some of my work.</h1>
	<p class="mt-8 hidden md:block text-lg font-medium">Tip: Hover over an image.</p>
	<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each projects as project}
			{@const { name, description, youtubeVideoId } = project}
			{@const href = `projects/${project.sys.id}`}

			<div class="hidden md:flex h-[300px]">
				<Hoverable let:hovering>
					{#if hovering}
						<div class="p-4">
							<h3 class="font-medium text-2xl">{name}</h3>
							<p class="mt-4 text-lg">{description}</p>
							<a
								class="mt-4 flex items-center gap-2 text-lg text-red-500 hover:underline hover:cursor-pointer"
								{href}
								alt={name}
							>
								<span class="iconify" data-icon="bi:caret-right" />
								<div>Learn more</div>
							</a>
						</div>
					{/if}
					<img
						class="w-full h-full object-cover object-center"
						class:hidden={hovering}
						src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
						alt={name}
					/>
				</Hoverable>
			</div>
			<div class="flex md:hidden h-[350px]">
				<div>
					<h3 class="font-medium text-2xl">{name}</h3>
					<p class="mt-4 text-lg">{description}</p>
					<a
						class="mt-4 flex items-center gap-2 text-lg text-red-500 hover:underline"
						{href}
						alt={name}
					>
						<span class="iconify" data-icon="bi:caret-right" />
						<div>Learn more</div>
					</a>
				</div>
			</div>
		{/each}
	</div>
</section>
