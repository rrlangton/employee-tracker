SELECT departments.department AS department, roles.title
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id
ORDER BY departments.department;
