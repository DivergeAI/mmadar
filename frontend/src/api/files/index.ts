import { FileItem } from "../../types/chat";
import { API_BASE_URL } from "../../utils/constants";

export const uploadFile = async (token: string, file: File |FileItem) => {
	const data = new FormData();
	data.append('file', file);
	let error = null;

	const res = await fetch(`${API_BASE_URL}/files/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			authorization: `Bearer ${token}`
		},
		body: data
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