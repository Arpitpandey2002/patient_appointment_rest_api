const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const con = require('../connection');
const { populate } = require('dotenv');
const port = 7000;

app.use(bodyParser.json());

//  Insert api
app.post('/appointment', (req, res) => {

    let appointment = req.body;

    let appointment_details = [appointment.firstname, appointment.lastname, appointment.email, appointment.gender, appointment.phone, appointment.dob, appointment.streetaddress1, appointment.streetaddress2, appointment.city, appointment.postal, appointment.country, appointment.appointment];

    let sql = "INSERT INTO `patient_appointment`(`firstname`, `lastname`, `email`, `gender`, `phone`, `dob`, `streetaddress1`, `streetaddress2`, `city`, `postal`, `country`, `appointment`) VALUES (?)";

    con.query(sql, [appointment_details], (err, result) => {

        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});


// deleting a record api

app.delete('/appointment/:id', (req, res) => {

    let id = req.params.id;

    con.query("DELETE FROM patient_appointment WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// fetch api all records
app.get('/appointment', (req, res) => {

    con.query("SELECT * FROM patient_appointment", (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

// Fetch record on basis of id
app.get('/appointment/:id', (req, res) => {

    let id = req.params.id;

    con.query("SELECT * FROM patient_appointment WHERE id =?", [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    })
});

// update  record on basis of patch

app.patch('/appointment', (req, res) => {

    let patient_data = req.body;
    con.query('UPDATE patient_appointment SET ? WHERE id =' + patient_data.id, [patient_data], (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


app.put('/appointment', (req, res) => {
    let patient_data = req.body;
    con.query('UPDATE patient_appointment SET ? WHERE id =' + patient_data.id, [patient_data], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.affectedRows == 0) {
                let appointment = req.body;

                let appointment_details = [appointment.firstname, appointment.lastname, appointment.email, appointment.gender, appointment.phone, appointment.dob, appointment.streetaddress1, appointment.streetaddress2, appointment.city, appointment.postal, appointment.country, appointment.appointment];

                let sql = "INSERT INTO `patient_appointment`(`firstname`, `lastname`, `email`, `gender`, `phone`, `dob`, `streetaddress1`, `streetaddress2`, `city`, `postal`, `country`, `appointment`) VALUES (?)";

                con.query(sql, [appointment_details], (err, result) => {

                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(result);
                    }
                })

            } else {
                res.send(result);
            }
        }
    })
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});