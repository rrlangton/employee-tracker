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
        // View all departments
        const departments = await pool.query('SELECT * FROM departments');
        console.table(departments.rows);
    } else if (answers.selection === 'Add a new department') {
        // Add a new department
        const deptName = await inquirer.prompt({
            type: "input",
            name: "dept_name",
            message: "What is the name of the new department?"
        });
        await pool.query('INSERT INTO departments (name) VALUES ($1)', [deptName.dept_name]);
        console.log("Department added");
    } else if (answers.selection === 'View all roles') {
        // View all roles
        const roles = await pool.query('SELECT * FROM roles');
        console.table(roles.rows);
    } else if (answers.selection === 'Add a new role') {
        // Add a new role
        const roleName = await inquirer.prompt({
            type: "input",
            name: "role_name",
            message: "What is the name of the new role?"
        });
        const salary = await inquirer.prompt({
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        });
        await pool.query('INSERT INTO roles (role_name, salary) VALUES ($1, $2)', [roleName.role_name, salary.salary]);
        console.log("Role added");
    } else if (answers.selection === 'View all employees') {
        // View all employees
        const employees = await pool.query('SELECT * FROM employees');
        console.table(employees.rows);
    } else if (answers.selection === 'Add a new employee') {
        // Add a new employee
        const employeeName = await inquirer.prompt({
            type: "input",
            name: "employee_name",
            message: "What is the name of the new employee?"
        });
        const roleId = await inquirer.prompt({
            type: "input",
            name: "role_id",
            message: "What is the role ID of the new employee?"
        });
        await pool.query('INSERT INTO employees (employee_name, role_id) VALUES ($1, $2)', [employeeName.employee_name, roleId.role_id]);
        console.log("Employee added");
    } else if (answers.selection === 'Update employee role') {
        // Update employee role
        const employeeToUpdate = await inquirer.prompt({
            type: "list",
            name: "employee_name",
            message: "Which employee's role do you want to update?",
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen']
        });
        const newRoleId = await inquirer.prompt({
            type: "input",
            name: "new_role_id",
            message: "Enter the new role ID for the employee:"
        });
        // Parse newRoleId as integer
        const roleId = parseInt(newRoleId.new_role_id);

        // Update employee role using employee's first name and last name as identifiers
        await pool.query('UPDATE employees SET role_id = $1 WHERE first_name = $2 AND last_name = $3', [roleId, employeeToUpdate.employee_name.split(' ')[0], employeeToUpdate.employee_name.split(' ')[1]]);

        console.log("Employee role updated");
    } else {
        console.log("Invalid selection");
    }

    // Close the database connection
    pool.end();
}).catch(err => {
    console.error("Error:", err);
});