import { API_BASE_URL } from "../../utils/constants";
import { getTimeRange } from "../../utils/functions";


// Get ALl chat list
export const getChatList = async (token: string = '', page: number | null = null) => {
	let error = null;
	const searchParams = new URLSearchParams();

	if (page !== null) {
		searchParams.append('page', `${page}`);
	}

	const res = await fetch(`${API_BASE_URL}/chats/?${searchParams.toString()}`, {
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
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat:any) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

// Get chat list by tag name

export const getChatListByTagName = async (token: string = '', tagName: string) => {
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/tags`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			name: tagName
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;
			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res.map((chat:any) => ({
		...chat,
		time_range: getTimeRange(chat.updated_at)
	}));
};

// CLoen chat by id
export const cloneChatById = async (payload: {token: string, id: string}) => {
    let {token='',id} =payload
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/${id}/clone`, {
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
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			if ('detail' in err) {
				error = err.detail;
			} else {
				error = err;
			}

			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

// Get Tags by id

export const getTagsById = async (payload: {token: string, id: string}) => {
    let {token = '',id} =payload
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/${id}/tags`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

// delete tag by id
export const deleteTagById = async (payload:{token: string, id: string, tagName: string}) => {
    let {token = '',id,tagName} =payload
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/${id}/tags`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			tag_name: tagName,
			chat_id: id
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

// Add tag by id

export const addTagById = async  (payload:{token: string, id: string, tagName: string}) => {
    let {token = '',id,tagName} =payload
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/${id}/tags`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			tag_name: tagName,
			chat_id: id
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

// update chat by ID
export const updateChatById = async (paload:{token: string, id: string, chat: object}) => {
    let {token = '',id,chat} =paload
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/${id}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			chat: chat
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

// Archieve chat by id
export const archiveChatById = async (payload:{token: string, id: string}) => {
    let {token = '',id} =payload
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/${id}/archive`, {
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
		.then((json) => {
			return json;
		})
		.catch((err) => {
			error = err;

			console.log(err);
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};


// Delete chat by id
export const deleteChatById = async (paylaod:{token: string, id: string}) => {
    let {token ,id} =paylaod
	let error = null;

	const res = await fetch(`${API_BASE_URL}/chats/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
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