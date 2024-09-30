import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

class AuthService {
    static async fetchUser() {
        const res = await axios({
            url:`${API_BASE_URL}/auths`,
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
export default AuthService;