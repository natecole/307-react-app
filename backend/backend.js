const e = require('express');
const express = require('express');
const app = express();
const port = 8675;
const cors = require('cors');

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
   const name = req.query.name,
         job = req.query.job;

   let result = Array.from(new Set(findUserByName(name).concat(findUserByJob(job))));

   if (result.length > 0 && (name != undefined || job != undefined)){
      result = {users_list: result};
      res.send(result);
   }
   else{
      res.send(users);
   }
});

app.get('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
       result = {users_list: result};
       res.send(result);
   }
});

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   res.status(201).send(addUser(userToAdd));
});

app.delete('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   if (deleteUser(id)){
      res.status(200).end();
   }
   else {
      res.status(404).send('Id not found.');
   }
});

const findUserByName = (name) => { 
   return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
   return users['users_list'].filter( (user) => user['job'] === job); 
}

function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   //return users['users_list'].filter( (user) => user['id'] === id);
}

function addUser(user){
   user.id = makeId();
   users['users_list'].push(user);
   return user;
}

function makeId() {
   var result = '';
   const letters = 'abcdefghijklmnopqrstuvwxyz';
   const nums = '0123456789'
   for (var i = 0; i < 3; i++ ) {
     result += letters.charAt(Math.floor(Math.random() * letters.length));
   }
   for (var i = 0; i < 3; i++ ) {
      result += nums.charAt(Math.floor(Math.random() * nums.length));
   }
   return result;
}

function deleteUser(id){
   const index = users['users_list'].indexOf(
      findUserById(id)
   );
   if (index > -1) {
      users['users_list'].splice(index, 1);
      return true;
   }
   else {
      return false;
   }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 