require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const projectsRouter = require('./routes/projects');
const resumeRouter = require('./routes/resume');

app.use('/api/projects', projectsRouter);
app.use('/api/resume', resumeRouter);

app.get('/', (req, res) => {
    res.send('server is running!');
});

app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
});