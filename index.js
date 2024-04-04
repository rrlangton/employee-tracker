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
// prompts user to choose what they want to do from the list 
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
// updates employee role
.then(async (answers) => {
    if (answers.selection === 'Update employee role') {
        const results = await pool.query('SELECT * FROM employees');

        console.table(results.rows)
    }

    if (answers.selection === 'Update employee role') {
        inquirer.prompt([
            {
                type: "list",
                name: "selection",
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
        .then(async (answers) => {
// INSERT INTO lines need to be fixed
            const results = await pool.query('INSERT INTO roles (name) VALUES ($1)', [answers.employee_name]);
    
            console.log("Employee role updated")
        })
    }
});