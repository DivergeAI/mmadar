import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

class DocService {
    static async fetchAllDocuments() {
        const res = await axios.get(`${API_BASE_URL}/documents`,{
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        return res.data; 
    }
    static async createDocument(data: any) {
        const res = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/documents/create`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data;
    }

    static async deleteDocument(name: string) {
        const res = await axios({
            method: 'DELETE',
            url: `${API_BASE_URL}/documents/doc/delete`,
            params: {name},
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data;
    }
    static async updateDocument(data:any) {
        const res = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/documents/doc/update`,
            params: data.params,
            data: data.payload,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data;
    }
}
export default DocService;