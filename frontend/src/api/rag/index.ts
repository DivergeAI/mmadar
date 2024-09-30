import { RAG_API_BASE_URL } from "../../utils/constants";

export const processDocToVectorDB = async (token: string | null, file_id: string) => {
	let error = null;

	const res = await fetch(`${RAG_API_BASE_URL}/process/doc`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			file_id: file_id
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};