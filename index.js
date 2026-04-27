require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
//const dns = require('node:dns/promises');
//dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/user/', require('./routes/userIdRoute.js'));
app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/appointments', require('./routes/appointmentRoutes.js'));
app.use('/api/login', require('./routes/loginRoute.js'));
app.use('/api/appts/', require('./routes/appointmentUserRoutes.js'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(3001, () => {
      console.log(`Example app listening on port ${3000}`)
    })
  })
  .catch(e => console.log(e.message));