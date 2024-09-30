import axios from "axios";
import { BASE_URL } from "../utils/constants";

class ModelService {
    static async fetchAllModels() {
        const res = await axios({
            url:`${BASE_URL}/api/models`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        return res.data; 
    }
}
export default ModelService;