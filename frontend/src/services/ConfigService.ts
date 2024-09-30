import axios from "axios";
import { BASE_URL } from "../utils/constants";

class ChatService {
    static async fetchBackendConfig() {
        const res = await axios.get(`${BASE_URL}/api/config`,{
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420'
            }
        })
        
        return res.data; 
    }
}
export default ChatService;