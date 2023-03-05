const connectToMongoo = require('./db');
const express = require('express');
var cors = require('cors')
const port = 5000;
const app = express();
connectToMongoo();
app.use(express.json());
app.use(cors())

//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook listening on port http://localhost:${port}`)
})

