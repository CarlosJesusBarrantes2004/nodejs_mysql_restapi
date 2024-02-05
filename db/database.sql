CREATE DATABASE IF NOT EXISTS db_restapi_node;

USE DATABASE db_restapi_node;

CREATE TABLE employees(
    employee_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    employee_name VARCHAR(50) NOT NULL,
    employee_salary INT(5) DEFAULT NULL
);