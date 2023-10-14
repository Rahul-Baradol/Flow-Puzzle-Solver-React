const express = require('express')
const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors());

app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`Flow Puzzle Solver Server running on port ${port}...`);
})