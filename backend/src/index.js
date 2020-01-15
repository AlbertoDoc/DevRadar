const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect("mongodb+srv://alberto:ww6aa4mm@cluster0-urv4g.mongodb.net/week10?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Fazendo express entender json
app.use(express.json());
app.use(routes);

// MongoDB (Não-relacional)

app.listen(3333);