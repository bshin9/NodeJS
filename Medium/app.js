// URL for Postman http://localhost:3000/api/medium
// http://localhost:3000/api/medium/1 for the id's

// require the express to be able to use it
// set const data equal to where the json file is located

const express = require ('express');
const app = express();
const data = require('./employees.json')
app.use(express.json());

// var array1 = [1, 3, 5, 7];
// var array2 = [2, 4, 6, 8];

app.get('/merge', (req, res) => {
    let body = req.body;
    var array1 = body.array1;
    var array2 = body.array2;
    var array3 = array1.concat(array2);
    var sortedArray = array3.sort();
    res.send(array3);
});

function reverseStr(data) {
    var result = '';
    for (var i = data.length - 1; i >= 0; i--) {
        result += data[i]
    }
    // olleh
    return result;
}

app.get('/reverse', (req, res) => {
    let body = req.body;
    let result = reverseStr(body.data);
    res.send(result);
});

app.get('/', (req, res) => {
    res.send('Hello what');
});

// using the get method here to retrieve json file

app.get('/api/medium', (req, res) => {
    res.send(data);
});

app.post('/api/medium', (req, res) => {
    const employee = {
        employeeID: employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    };
    employees.push(employee);
    res.send(employee);
});

// use the get here to target and retrieve :id's

app.get('/api/medium/:id', (req, res) => {
    const employee = data.employees.find(function(employee) {
        return parseInt (req.params.id) === employee.id 
    })
    if (!employee){ res.status(404).send('Employee cannot be found')
}
    res.send(employee);
});

// using a const port equal to env to make it compatible with other devices

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}`));
