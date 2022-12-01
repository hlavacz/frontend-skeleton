import axios from "axios";
import User from "../User/User";
import ApiException from "./ApiException";

const API_URL = 'https://rekuperace.popovicky.headsoft.cz:8080';

export default class Api {

    constructor() {
        this.interface = axios.create({withCredentials: true, baseURL: API_URL});
        this.user = new User();
        this.user.load();
    }


    controlResponse(response) {
        if (response.status === 200) {
            let data = response.data;
            if (data === 'not_logged') {
                this.logout()
            }
            return response.data;
        } else {
            throw new ApiException(response.errno, response.message, response.responseCode)
        }
    }


    login(user) {
        this.user = user;
        return this.interface.post('acl/login', {user}).then(res=>this.controlResponse(res)).then(
            data => {
                if (data.status === 'ok') {
                    this.user.logged = true;
                    this.user.save();
                    window.location = '/';
                } else {
                    return false;
                }
            }
        )
    }

    logout() {
        this.interface.post('acl/logout').then(() => {
            this.user.logout();
            window.location = '/';
        })
    }
}
