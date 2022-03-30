import { initializeApp } from 'firebase/app';
import { collection, doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import axios from 'axios';

export const handler = async (event, context) => {
	// Initialise Firebase
	const firebaseConfig = {
		apiKey: 'AIzaSyBKIMeDtFj0uJedsWXjgII6NunuodSZ9do',
		authDomain: 'bailey-ethan-rawson-media.firebaseapp.com',
		projectId: 'bailey-ethan-rawson-media',
		storageBucket: 'bailey-ethan-rawson-media.appspot.com',
		messagingSenderId: '460558410804',
		appId: '1:460558410804:web:8aa9a9ddbe1a5160cb9661'
	};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const auth = getAuth();

	// Sign in anonymously
	await signInAnonymously(auth);

	// Refresh Token
	const keyDoc = doc(collection(db, 'keys'), 'pFBaT4TdLfCxAt1oE7Fn');
	const keyDocData = await getDoc(keyDoc);
	const { accessToken } = keyDocData.data();
	const refreshResult = await axios.get(
		`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
	);
	const newToken = refreshResult.data.access_token;
	await setDoc(keyDoc, { accessToken: newToken });

	// Get Feed
	const feedResult = await axios.get(
		`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&access_token=${newToken}`
	);

	const feed = feedResult.data;

	const profileResult = await axios.get(
		`https://graph.instagram.com/v13.0/me?fields=id,username&access_token=${newToken}`
	);
	const profile = profileResult.data;

	return {
		statusCode: 200,
		body: JSON.stringify({
			profile,
			feed
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	};
};
