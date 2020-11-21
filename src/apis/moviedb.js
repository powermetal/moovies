import axios from 'axios';

const KEY = 'AIzaSyA8mMXx1dzTMngNKm0-53XRdPBSjbEiMHI';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: KEY,
        type: 'video',

    }
})