import axios from 'axios';
import Toast from "react-native-root-toast";
import {appConfig} from "@/config";

const apiClient = axios.create({
    baseURL: 'http://api.openweathermap.org',
    responseType: 'json',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        // adding params appid (api key)
        config.params = {...config.params, appid: appConfig.apiKey}
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error: {
        response?: { data?: { message?: string }; status: number };
        message?: string;
        config: any;
        request: any;
        name: any;
        code: any;
    }) {
        Toast.show(error?.response?.data?.message ?? error?.message ?? 'Error fetching data', {duration: Toast.durations.SHORT})
        return Promise.reject(error)
    })

export {
    apiClient
}
