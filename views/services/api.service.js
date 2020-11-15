import axios from "axios";
// import {store} from "../store";

axios.defaults.baseURL = 'http://localhost:3000/api/';

class Api {
    constructor(httpClient, store) {
        this.httpClient = httpClient;
        this.store = store;
    }

    privateGet = (options) => {
        options.method = 'get';

        return this.privateRequest(options);
    };

    privatePost = (options) => {
        options.method = 'post';

        return this.privateRequest(options);
    };

    privateDelete = (options) => {
        options.method = 'delete';

        return this.privateRequest(options);
    };

    signIn = (formData) => {
        return this.auth('/auth/sign-in', formData)
    };

    signUp = (formData) => {
        return this.auth('/auth/sign-up', formData)
    };

    refreshToken = () => {
        return this.auth('/auth/refresh-token', {}, true)
    };

    auth = async (url, formData, refresh = false) => {
        const options = {
            url,
            method: 'post',
            data: formData
        };

        if (refresh) {
            const refreshToken = localStorage.getItem('refreshToken');

            options.headers = {
                Authorization: `Bearer ${refreshToken}`
            }
        }

        const {data} = await this.httpClient(options);

        return new Promise(
            (resolve, reject) => {

                if (data.userErrorMessage) {
                    reject(data.userErrorMessage);
                }

                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                resolve();
            }
        );
    };

    privateRequest = (options) => {
        return new Promise(async (resolve, reject) => {
            const accessToken = localStorage.getItem('accessToken');

            const response = await this.httpClient(
                {
                    ...options,
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

            const result = await this.handleAuth(response, () => this.privateRequest(options));

            if (result.data.userErrorMessage === "Invalid token.") {
                reject();
                alert('Your session expired. Please, sign in.');
                // this.store.dispatch(push('/sign-in'));
            }

            resolve(result);
        })
    };

    handleAuth = async (response, callback) => {
        if (response.data.devError && response.data.devError.message === 'jwt expired') {
            await this.refreshToken();

            return callback();
        }

        return response;
    }
}

const api = new Api(axios);

export default api;
