const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');
const { execFileSync } = require('child_process');
const execFile = require('child_process').execFile;
const port = 8000;

app.use(cors());

app.use(express.json())

app.post('/', (req, res) => {
    let { grid, size } = req.body;
    
    let colorCodeToColor = ["W", "R", "Y", "B", "G", "O", "C", "P", "L", "Z"];

    let child = execFile(path.join(__dirname, "/a.out"), (error, stdout, stderr) => {
      res.json({
        error: error,
        solution: stdout,
        stderr: stderr
      })
    })

    child.stdin.setEncoding('utf-8');
    // let input = "";

    child.stdin.write(`${size}\n${size}\n`);
    let loop = new Promise((resolve, reject) => {
      for (let row = 0; row < size; row++) {
        let str = "";
        for (let col = 0; col < size; col++) {
          if (grid[row][col] === -1) {
            // str += '.';
            child.stdin.write(".\n");
          } else {
            // str += colorCodeToColor[grid[row][col]];
            child.stdin.write(`${colorCodeToColor[grid[row][col]]}\n`);
          }
        }
        // input = input + " " + str;
      }
      resolve();
    })

    // loop.then((data)=>{
    //   if (size != undefined)
    //     child.stdin.write(`${size} ${size} ${input}\n`);
    // })
})

app.get('/', (req, res) => {
  res.send("Server working...");
})

app.listen(port, () => {
    console.log(`Flow Puzzle Solver Server running on port ${port}...`);
})