import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8b47b-default-rtdb.firebaseio.com/'
})

export default instance;