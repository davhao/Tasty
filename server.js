const express = require('express');
const mongoose = require('mongoose');

const login = require('./routes/api/login');
const users = require('./routes/api/users');

const app = express();

// Bodyparser middleware
app.use(express.json({ limit: '50mb' }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser    : true,
		useCreateIndex     : true,
		useUnifiedTopology : true
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

// Use Routes
app.use('/api/login', login);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
