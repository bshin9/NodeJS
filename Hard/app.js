// http://localhost:3000/api/hard postman link

const Joi = require('joi');
const express = require ('express');
const app = express();
const data = require('./employees.json')
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello what');
});

app.get('/api/hard', (req, res) => {
    res.send(data);
});

// post method will let us post new information to our server but needs to be input correctly 
// if not correct then it will return a 400 error

app.post('/api/hard', (req, res) => {
    const { error } = validateEmployee(req.body);
    if (error) { return res.status(400).send(error.details[0].message)
    }

    const employee = {
        id: data.employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    };
    data.employees.push(employee);
    res.send(employee);
});

// put method allows us to update employee by id since we're using :id

app.put('/api/hard/:id', (req, res) => {
    const employee = data.employees.find(function(employee){
        return parseInt (req.params.id) === employee.id 
    })
    if (!employee){ res.status(404).send('Employee cannot be found')
}
    res.send(employee);
    
    const { error } = validateEmployee(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    employee.name = req.body.name;
    res.send(employee);
});

// delete will allow us to delete employees by id
// using the Joi.string to make sure min length of 3 and then return employee and schema values

app.delete('/api/hard/:id', (req, res) => {

    const employee = data.employees.find(c => c.id === parseInt(req.params.id))
    console.log(employee)
    if (!employee){ 
        res.status(404).send('Employee cannot be found')
    }

    const index = data.employees.indexOf(employee);
    data.employees.splice(index, 1);
    res.send(employee);
});

function validateEmployee(employee) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(employee, schema);
}

// used the if statement in every method in order to return the errors when the correct information is not input

app.get('/api/hard/:id', (req, res) => {
    const employee = data.employees.find(function(employee){
        return parseInt (req.params.id) === employee.id 
    })
    if (!employee){ res.status(404).send('Employee cannot be found')
}
    res.send(employee);
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}`));