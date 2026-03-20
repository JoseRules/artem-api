const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes.js'));

mongoose.connect("mongodb+srv://josepplx_db_user:A7JHEnnqiwhvko83@cluster0.lgpd3lu.mongodb.net/?appName=Cluster0&retryWrites=true")
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log(`Example app listening on port ${3000}`)
    })
  })
  .catch(e => console.log(e.message));