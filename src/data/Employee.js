export class Employee {

    constructor(uuid, name, password) {
        this.uuid = uuid;
        this.name = name;
        this.password = password;
    };



    getUUID() {
        return this.uuid;
    };

    getName() {
        return this.name;
    };

    getPassword() {
        return this.password;
    }

}