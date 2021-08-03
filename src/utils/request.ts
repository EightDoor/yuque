import Config from "@/config/config";
import axios from "axios";


const instant = axios.create({
  baseURL: Config.baseUrl,
})


export default instant;