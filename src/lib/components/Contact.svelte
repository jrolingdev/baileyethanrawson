<script lang="ts">
	import { init, send } from '@emailjs/browser';
	import { goto } from '$app/navigation';
	init('user_jIRvLaZg743dF5V7ne1qa');

	function getDataFromForm(form) {
		let data = {};
		const formData = new FormData(form);
		formData.forEach((value, key) => {
			data[key] = value;
		});
		return data;
	}

	async function sendForm(event) {
		const data = getDataFromForm(event.target);
		try {
			const res = await send('service_jnbz0oda', 'template_qxuto7q', {
				...data
			});
			if (res.status === 200) {
				goto('thank-you');
			}
		} catch (error) {
			alert("Sorry for some odd reason that didn't go through, please try again tomorrow.");
		}
	}
</script>

<section id="contact" class="mt-32 max-w-screen-2xl mx-auto px-4">
	<h1 class="text-5xl font-bold max-w-screen-2xl mx-auto">Get in touch.</h1>
	<form name="contact" class="mt-8" on:submit|preventDefault={(event) => sendForm(event)}>
		<div class="mt-4">
			<label class="block text-lg font-medium" for="name">Name</label>
			<input
				class="mt-2 bg-transparent appearance-none border border-white w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
				id="name"
				name="name"
				type="text"
				placeholder="Name"
			/>
		</div>
		<div class="mt-4">
			<label class="block text-lg font-medium" for="email">Email</label>
			<input
				class="mt-2 bg-transparent appearance-none border border-white w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
				id="email"
				name="email"
				type="email"
				placeholder="Email"
			/>
		</div>
		<div class="mt-4">
			<label class="block text-lg font-medium" for="phone">Phone</label>
			<input
				class="mt-2 bg-transparent appearance-none border border-white w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
				id="phone"
				name="phone"
				type="tel"
				placeholder="0412 345 678"
			/>
		</div>
		<div class="mt-4">
			<label class="block text-lg font-medium" for="address">Address</label>
			<input
				class="mt-2 bg-transparent appearance-none border border-white w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
				id="address"
				name="address"
				type="text"
				placeholder="Address"
			/>
		</div>
		<div class="mt-4">
			<label class="block text-lg font-medium" for="message">Message</label>
			<textarea
				class="mt-2 resize-none bg-transparent appearance-none border border-white w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
				id="message"
				name="message"
				placeholder="Message"
				rows="4"
			/>
		</div>
		<div class="mt-4">
			<button
				class="border text-red-600 border-red-600 py-2 px-8 font-medium tracking-wider hover:border-white hover:text-white transition-colors duration-200 ease-in-out"
				type="submit">Send</button
			>
		</div>
	</form>
</section>
