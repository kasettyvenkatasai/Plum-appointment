
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT =  3000;
const routes = require('./routes/api');

app.use(cors());
app.use(express.json()); 
app.use(morgan('dev'));



app.use('/api', routes);


app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AI Appointment Backend running' });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
