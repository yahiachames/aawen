
import { baseUrl } from './../baseUrl';
import axios from 'axios'
export const getItems = async () => {
    try {
        const result = await axios.get(baseUrl + 'apis/items')
        return result.data.json
    } catch (e) {
        console.log("error from get items ", e)
    }
}

export const setItems = async (data) => {
    try {



        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const result = await axios.post(baseUrl + 'apis/setitems', data, config)

        return result




    } catch (e) {
        console.log("error from set items ", e)
    }
}