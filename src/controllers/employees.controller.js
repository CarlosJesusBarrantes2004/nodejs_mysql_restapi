import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM employees;");
    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM employees WHERE employee_id = ?;",
      [req.params.id]
    );

    if (!result.length)
      return res.status(404).json({ message: "Employee not found." });

    res.json(result[0]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "INSERT INTO employees (employee_name, employee_salary) VALUES (?,?);",
      [name, salary]
    );
    res.status(201).json({ message: "Employee created successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "UPDATE employees SET employee_name = IFNULL(?,employee_name), employee_salary = IFNULL(?,employee_salary) WHERE employee_id = ?;",
      [name, salary, req.params.id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Employee not found." });

    res.json({ message: "Employee updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM employees WHERE employee_id = ?;",
      [req.params.id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Employee not found." });

    res.json({ message: "Employee deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
