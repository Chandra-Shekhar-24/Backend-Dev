const express = require('express');
const app = express();
const fileHandler = require('./modules/fileHandler');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Dashboard - Read and Display
app.get('/', async (req, res) => {
    const employees = await fileHandler.read();
    res.render('index', { employees });
});

// Registration Form
app.get('/add', (req, res) => {
    res.render('add');
});

// Create Employee
app.post('/add', async (req, res) => {
    const { name, department, salary, gender, profilePic, notes } = req.body;
    
    // Data Validation: No empty names or negative salaries
    if (!name || Number(salary) < 0) return res.redirect('/add');

    const employees = await fileHandler.read();
    const newEmployee = {
        id: Date.now().toString(), // Unique IDs
        name,
        gender,
        department: Array.isArray(department) ? department.join(', ') : department,
        salary: Number(salary),
        profilePic,
        notes
    };
    
    employees.push(newEmployee);
    await fileHandler.write(employees);
    res.redirect('/'); // Always redirect after adding
});

// Delete Employee
app.get('/delete/:id', async (req, res) => {
    let employees = await fileHandler.read();
    employees = employees.filter(emp => emp.id !== req.params.id);
    await fileHandler.write(employees);
    res.redirect('/');
});

// Edit Employee Form
app.get('/edit/:id', async (req, res) => {
    const employees = await fileHandler.read();
    const employee = employees.find(emp => emp.id === req.params.id);
    res.render('edit', { employee });
});

// Update Employee
app.post('/edit/:id', async (req, res) => {
    const { name, department, salary } = req.body;
    let employees = await fileHandler.read();
    const index = employees.findIndex(emp => emp.id === req.params.id);
    
    if (index !== -1) {
        employees[index] = { ...employees[index], name, department, salary: Number(salary) };
        await fileHandler.write(employees);
    }
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));