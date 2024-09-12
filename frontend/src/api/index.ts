import { BASE_URL } from "../utils/constants";

export const getModels = async (token: string = '') => {
	let error = null;

	const res = await fetch(`${BASE_URL}/api/models`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420",
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	let models = res?.data ?? [];

	models = models
		.filter((models) => models)
		// Sort the models
		.sort((a, b) => {
			// Check if models have position property
			const aHasPosition = a.info?.meta?.position !== undefined;
			const bHasPosition = b.info?.meta?.position !== undefined;

			// If both a and b have the position property
			if (aHasPosition && bHasPosition) {
				return a.info.meta.position - b.info.meta.position;
			}

			// If only a has the position property, it should come first
			if (aHasPosition) return -1;

			// If only b has the position property, it should come first
			if (bHasPosition) return 1;

			// Compare case-insensitively by name for models without position property
			const lowerA = a.name.toLowerCase();
			const lowerB = b.name.toLowerCase();

			if (lowerA < lowerB) return -1;
			if (lowerA > lowerB) return 1;

			// If same case-insensitively, sort by original strings,
			// lowercase will come before uppercase due to ASCII values
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;

			return 0; // They are equal
		});

	return models;
};


export const getBackendConfig = async () => {
	let error = null;

	const res = await fetch(`${BASE_URL}/api/config`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'ngrok-skip-browser-warning': '69420'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};
