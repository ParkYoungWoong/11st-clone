import axios from 'axios';

export default {
    install(Vue) {
        Vue.prototype.$fetch = async ({ requestName }) => {
            const { data } = await axios.get(`https://trusting-williams-8cacfb.netlify.app/.netlify/functions/main?apiKey=${1216}&requestName=${requestName}`);
            return data;
        }
    }
}