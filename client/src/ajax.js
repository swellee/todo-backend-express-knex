import axios from "axios"
const host = 'http://localhost:5002'

export function getToken(){
    return localStorage.getItem('token')
}
export function setToken(token){
    localStorage.setItem('token', token)
}

export function removeToken(){
    localStorage.removeItem('token')
}

const http = axios.create({
    baseURL: host,
    headers: {
        "Content-Type": "Application/json"
    }
})

http.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export async function fetchData(path, {method, data, params} = {method:'get'}) {
    const req = http({
        url: path,
        method,
        params,
        data,
        paramsSerializer: {
            indexes: null, // array indexes format (null = no brackets)
            encode: (value) => encodeURIComponent(value),
            serialize: (obj) => {
                const params = new URLSearchParams();
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        params.append(key, obj[key]);
                    }
                }
                return params.toString();
            }
        }
    });
    let res;
    try {
        res = await req;
    } catch (error) {
        error = error.response.data
        console.error(error)
        alert(error)
    }
    return res;
}