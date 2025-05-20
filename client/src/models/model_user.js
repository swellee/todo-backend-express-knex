import { fetchData, getToken, setToken } from "../ajax";

export const model_user ={
    username: '',
    id: 0,
}
export const action_user_get = async() => {
    const token = getToken();
    if(token){
        const res = await fetchData('/me');
        if(res?.token){
            setToken(res.token);
            return res.user;
        }
    }
}
export const action_user_set = async({payload}) => payload;
