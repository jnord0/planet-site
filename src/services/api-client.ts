import axios from "axios";

export default axios.create({
    baseURL: 'https://api.api-ninjas.com/v1/planets?name=',
    params: {
        key: 'o3DypUsg/xYdjRLyLpOiqA==h9aWfdlGu1InTVUt'
    }
})