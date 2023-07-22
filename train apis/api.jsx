const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

app.use(express.json());

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODkyNDkyNDMsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNjcxYTkyM2UtNDhmOC00NmE0LWE0NmItZjkyM2E4ZmMyNWViIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDMwMzEwNTAzOCJ9.Za8dfKKoLHP_pKEJNRZcJ847YyLMzgx1CO0GL1dpVVo'; 

let data = {
    "companyName": "Train Central",
    "ownerName": "Anurag Dubey",
    "ownerEmail": "2000320130035@abes.ac.in",
    "rollNo": "2000320130035",
    "accessCode": "oJnNPG"
}

let authData = {
    "companyName": "Train Central",
    "clientID": "b46128A0-fbde-6aed7e27",
    "ownerName": "Anurag Dubey",
    "ownerEmail": "2000320130035@abes.ac.in",
    "rollNo": "2000320130035",
    "clientSecret": "X0yo10RPaykbdan"
}

let response = [];

app.post('/register', (req,res)=>{
    fetch('http://20.244.56.144/train/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
});


app.post('/login', (req,res)=>{
    fetch('http://20.244.56.144/train/auth', {
        method: 'POST',
        body: JSON.stringify(authData),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
});

app.get('/trains', async (req, res) => {
    fetch('http://20.244.56.144/train/trains', {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(json => {
            response.push(json);
            (response[0]).sort((a,b)=>{
                return (a.price.sleeper - b.price.sleeper && b.departureTime.Hours - a.departureTime.Hours);
            })
            console.log(response[0]);
        })
});


app.get('/trains/2344', async (req, res) => {
    fetch('http://20.244.56.144/train/trains/2344', {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);