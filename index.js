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
        .then(async (answers) => {

            const results = await pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.dept_name]);
    
            console.log("department added")
        })
    }
})

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
        .then(async (answers) => {

            const results = await pool.query('INSERT INTO roles (name) VALUES ($1)', [answers.role_name]);
    
            console.log("role added")
        })
    }
})