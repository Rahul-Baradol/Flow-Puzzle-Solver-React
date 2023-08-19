import React from 'react'
import './About.css'

export default function About(props) {
  props.setIsBoard(0);

  return (
    <>
    <div class="box">
      <div class="titleBox">
        <div class="text-primary title" id="titlePartFlow">Flow</div>
        <div class="text-primary title" id="titlePartPuzzle">Puzzle</div>
        <div class="text-primary title" id="titlePartSolver">Solver</div>
      </div>

      <div class="card info">
        <div class="card-body">
          <p class="card-text">Have you played Flow Free on mobile? Well this is a small project which solves the puzzles given in Flow Free Game!</p>
        </div>
      </div>

      <div class="links">
        <div class="card github customCard">
          <div class="card-body customCard">
            <h5 class="card-title">GitHub</h5>
            <p class="card-text">The source code is available on github. You can check it out!</p>
            <a href="https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React" rel="noreferrer" target="_blank" class="btn btn-outline-primary">Go to Github</a>
          </div>
        </div>

        <div class="card github customCard">
          <div class="card-body customCard">
            <h5 class="card-title">About Me!</h5>
            <p class="card-text">Check out my portfolio website to know more about me!</p>
            <a href="#" rel="noreferrer" target="_blank" class="btn btn-primary">Checkout my portfolio</a>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}
