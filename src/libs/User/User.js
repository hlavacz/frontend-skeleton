export default class User {
    username = '';
    password = '';

    save() {
        this.password = '****'
        sessionStorage.username = this.username;
    }

    load() {
        if (sessionStorage.username) {
            this.username = sessionStorage.username;
        }
    }


    logout() {
        sessionStorage.clear();
        this.username = '';
        this.logged = false;
    }


    getLabel() {
        return this.username;
    }

    isAllowed(resource, rule) {
        return true;
    }

}
