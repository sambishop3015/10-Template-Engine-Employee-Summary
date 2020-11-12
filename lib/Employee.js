// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    }
    getName() {
        return this.name;
    };
    getId() {
        return this.id;
    };
    getEmail() {
        return this.email;
    };
    getRole() {
        return this.getRole;
    }
    getGithub() {
        return this.getGithub;
    }
    getOfficeNumber() {
        return this.getOfficeNumber;
    }
    getSchool() {
        return this.getSchool;
    }
}

module.exports = Employee;