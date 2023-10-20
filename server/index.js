const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');
const execFile = require('child_process').execFile;
const port = 8000;

app.use(cors());

app.use(express.json())

app.post('/', (req, res) => {
    let { grid, size } = req.body;
    
    let colorCodeToColor = ["W", "R", "Y", "B", "G", "O", "C", "P", "L", "Z"];

    let child = execFile(path.join(__dirname, "/a.exe"), (error, stdout, stderr) => {
      res.json({
        solution: stdout
      })
    })

    child.stdin.setEncoding('utf-8');
    let input = "";
    let loop = new Promise((resolve, reject) => {
      for (let row = 0; row < size; row++) {
        let str = "";
        for (let col = 0; col < size; col++) {
          if (grid[row][col] === -1) {
            str += '.';
          } else {
            str += colorCodeToColor[grid[row][col]];
          }
        }
        input = input + " " + str;
      }
      resolve();
    })

    loop.then((data)=>{
      if (size != undefined)
        child.stdin.write(`${size} ${size} ${input}\n`);
    })
})

app.get('/', (req, res) => {
  res.send("Server working...")
})

app.listen(port, () => {
    console.log(`Flow Puzzle Solver Server running on port ${port}...`);
})