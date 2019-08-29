let instance = null;

class singleton {
    userLoggedIn = null;
    userToken = null;
    storeRef = null;
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.name = "singleton";
        this.time = new Date();
        return instance;
    }
    singletonMethod() {
        return this.time;
    }
}

export default new singleton();
