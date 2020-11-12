const Employee = require('./Employee');

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(name, id, email, githubName) {
        super(name, id, email);
        this.githubName = githubName;
    }
    getRole() {
        return 'Engineer';
    }
    getGithub() {
        return this.githubName;
    }
}

module.exports = Engineer;