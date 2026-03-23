require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/appointments', require('./routes/appointmentRoutes.js'));
app.use('/api/login', require('./routes/loginRoute.js'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log(`Example app listening on port ${3000}`)
    })
  })
  .catch(e => console.log(e.message));