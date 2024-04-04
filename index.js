const inquirer = require('inquirer');
const { Pool } = require('pg');
require("console.table");

const pool = new Pool (
    {
        user: 'postgres',
        password: 'langton',
        host: 'localhost',
        database: 'employees_db',
        port: 5432
    },
)
pool.connect();
// prompts user to choose what they want to do from a list 
inquirer.prompt([
    {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a new department',
            'Add a new role',
            'Add a new employee',
            'Update employee role'
        ]
    }
]) 
// view departments in table
.then(async (answers) => {
    if (answers.selection === 'View all departments') {
        const results = await pool.query('SELECT * FROM departments');

        console.table(results.rows)
    }

    if (answers.selection === 'Add a new department') {
        inquirer.prompt([
            {
                type: "input",
                name: "dept_name",
                message: "What is the name of the new department?"
            }
        ])
        // adds new department to table
        .then(async (answers) => {

            const results = await pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.dept_name]);
    
            console.log("department added")
        })
    }
})
// views roles in table
        .then(async (answers) => {
            if (answers.selection === 'View all roles') {
                const results = await pool.query('SELECT * FROM roles');

                console.table(results.rows)
          }

            if (answers.selection === 'Add a new role') {
                inquirer.prompt([
            {
                type: "input",
                name: "role_name",
                message: "What is the name of the new role?"
            }
        ])
        // adds new role to table
        .then(async (answers) => {

            const results = await pool.query('INSERT INTO roles (name) VALUES ($1)', [answers.role_name]);
    
            console.log("role added")
        })
    }
})
// adds salary for new role
inquirer.prompt([
    {
        type: "input",
        name: "salary",
        message: "What is salary of the role?"
    }
])
.then(async (answers) => {

    const results = await pool.query('INSERT INTO roles (name) VALUES ($1)', [answers.salary]);

    console.log("Salary added")
})
// prompts user to select department from list
inquirer.prompt([
    {
        type: 'list',
        name: 'role_dept',
        message: 'What would you like to do?',
        choices: [
            'Sales',
            'Engineering',
            'Finance',
            'Legal'
                ]
    }
]) 
// adds new role to department
.then(async (answers) => {

    const results = await pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.role_dept]);

    console.log("New role has been added to department")
})
// shows employess
.then(async (answers) => {
    if (answers.selection === 'View all employees') {
        const results = await pool.query('SELECT * FROM employees');

        console.table(results.rows)
    }
// adds new employee
    if (answers.selection === 'Add a new employee') {
        inquirer.prompt([
            {
                type: "input",
                name: "employee_name",
                message: "What is the name of the new employee?"
            }
        ])
        .then(async (answers) => {

            const results = await pool.query('INSERT INTO employees (name) VALUES ($1)', [answers.employee_name]);
    
            console.log("Employee added")
        })
    }
})
// add new employee role
inquirer.prompt([
    {
        type: "list",
        name: "role",
        message: "What is the new employee's role?",
        choices: [
            ' Sales Lead',
            'Salesperson',
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead',
            'Lawyer'
        ]
    }
])
.then(async (answers) => {

    const results = await pool.query('INSERT INTO roles (name) VALUES ($1)', [answers.role]);

    console.log("Role for the new employee has been added")
})
// add salary for new employee
inquirer.prompt([
    {
        type: "input",
        name: "salary",
        message: "What is salary for the new employee?"
    }
])
.then(async (answers) => {

    const results = await pool.query('INSERT INTO roles (name) VALUES ($1)', [answers.salary]);

    console.log("Salary for the new employee has been added")
})
// Select from list employees 
.then(async (answers) => {
    if (answers.selection === 'Update employee role') {
        inquirer.prompt([
            {
                type: "list",
                name: "employees",
                message: "Which employee's role do you want to update?",
                choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupik',
                    'Kunal Singh',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen'
                ]
            }
        ])
                inquirer.prompt([
                    {
                        type: "list",
                        name: "new_role",
                        message: "Which role do you want to assign the selected employee?",
                        choices: [
                         'Sales Lead',
                         'Salesperson',
                         'Lead Engineer',
                         'Software Engineer',
                         'Account Manager',
                         'Accountant',
                         'Legal Team Lead',
                         'Lawyer'
                        ]
                    }
                ])     
        // updates employee role
        .then(async (answers) => {
            const results = await pool.query('INSERT INTO roles (name) VALUES ($1)', [answers.new_role]);
    
            console.log("Employee role updated")
        })
    }
});