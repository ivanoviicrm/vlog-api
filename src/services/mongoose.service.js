const mongoose = require('mongoose');

exports.getConnection = () => {
  mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }
  );
  const connection = mongoose.connection;
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => console.log('Connection to database established'));
}