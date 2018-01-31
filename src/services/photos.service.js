import axios from "axios";

export default {
    getPhotos(request) {
        return axios.get("http://api.markuswinkelmann.de/lukas/", request)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
}