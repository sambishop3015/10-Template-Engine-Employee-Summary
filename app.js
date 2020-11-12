const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");

const employees = [];
let numManagers = 0;

prompUser();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function prompUser() {
    try {
        console.log('Welcome! Begin building your team below.');

        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the employee\'s name?'
        });

        const { id } = await inquirer.prompt({
            type: 'input',
            name: 'id',
            message: 'What is the employee\'s ID?'
        });

        const { email } = await inquirer.prompt({
            type: 'input',
            name: 'email',
            message: 'What is the employee\'s email?'
        });

        const { role } = await inquirer.prompt({
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: ['Manager', 'Engineer', 'Intern']
        });

        const { manager } = await inquirer.prompt({
            type: 'input',
            name: 'manager',
            message: 'What is the manager\'s office number?',
            when: (answers) => role === 'Manager'
        });

        const { engineer } = await inquirer.prompt({
            type: 'input',
            name: 'engineer',
            message: 'What is the engineer\'s GitHub username?',
            when: (answers) => role === 'Engineer'
        });

        const { intern } = await inquirer.prompt({
            type: 'input',
            name: 'intern',
            message: 'What school did the intern go to?',
            when: (answers) => role === 'Intern'
        });

        switch (role) {
            case 'Manager':
                if (numManagers < 1) {
                    let officeNumber = manager;
                    employees.push(new Manager(name, id, email, officeNumber))
                    numManagers++;
                }
                break;

            case 'Engineer':
                let githubName = engineer;
                employees.push(new Engineer(name, id, email, githubName))
                break;

            case 'Intern':
                let school = intern;
                employees.push(new Intern(name, id, email, school))
                break;
        }

        const { addEmployee } = await inquirer.prompt({
            type: 'list',
            name: 'addEmployee',
            message: 'Would you like to add more employee\'s?',
            choices: ['Yes', 'No']
        });

        let addEmp = addEmployee;
        switch (addEmp) {
            case 'Yes':
                prompUser();
                break;
            case 'No':
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                }
                fs.writeFileSync(outputPath, render(employees), 'utf8');
                break;
        }
    } catch (err) {
        console.log(err);
    }
}





// 	return inquirer.prompt([{
// 			type: "input",
// 			name: "name",
// 			message: "What is the emplyee's name?"
// 		}, {
// 			type: "input",
// 			name: "id",
// 			message: "What is the emplyee's ID?"
// 		}, {
// 			type: "input",
// 			name: "email",
// 			message: "What is the emplyee's email address?"
// 		}, {
// 			type: 'list',
// 			message: 'What is the employee\'s role?',
// 			name: 'role',
// 			choices: ['Manager', 'Engineer', 'Intern']
// 		}])
// 		.then(function(responses) {
// 				if (responses.role == 'Manager') {
// 					function promptManager() {
// 						return inquirer.prompt([{
// 							type: "input",
// 							name: "officeNumber",
// 							message: "What is the Manager's Office Number?"
// 						}]);
// 					}
// 					promptManager();
// 				} else if (responses.role == 'Engineer') {
// 					function promptEngineer() {
// 						return inquirer.prompt([{
// 							type: "input",
// 							name: "githubName",
// 							message: "What is the Engineer's GitHub Username?"
// 						}]);
// 					}
// 					promptEngineer();
// 				} else if (responses.role == 'Intern') {
// 					function promptIntern() {
// 						return inquirer.prompt([{
// 							type: "input",
// 							name: "school",
// 							message: "What school did the intern go to?"
// 						}]);
// 					}
// 					promptIntern();
// 				}
// 			}
// 			.then(function() {
// 				return inquirer.prompt([{
// 					type: "input",
// 					name: "addEmployee",
// 					message: "Would you like to add more employees?"
// 				}]);
// 			})
// 		)
// }
// prompUser();

// const manager = {};
// const engineer = {};
// const intern = {};



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
