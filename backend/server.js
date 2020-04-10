const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}
);

const bugsRouter = require('./routes/bugs');
const usersRouter = require('./routes/users');

app.use('/bugs', bugsRouter); //whenever someone goes to root url and uses /exercises at the end, he is going to obtain whatever is there in exercisesRouter
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
} 
);