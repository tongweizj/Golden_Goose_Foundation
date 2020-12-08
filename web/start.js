require('./models/fund');
require('./models/fund-increase');

const app = require('./app');
const mongoose = require('mongoose');
const url = 'mongodb://ggfadmin:12345678@192.168.0.100:27017/ggf'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.connection
.on('open', () => {
console.log('Mongoose connection open');
})
.on('error', (err) => {
console.log(`Connection error: ${err.message}`);
});


const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});