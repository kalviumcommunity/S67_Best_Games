import { useState } from 'react'

function About() {
  return (
    <>
      <div>
      <h1>List of a few great games I played this year</h1>

        <p>Overview : This project is a web-based showcase of the best games I've played in 2024. The goal is to create a platform where I can share experiences, and reviews of games, complete with visuals, summaries, and gameplay highlights. The platform aims to inspire gamers, facilitate discussions, and document my journey through the year.</p>

        <h3>Key Features :</h3>
        <ul>
            <li>Game List Display</li>
            <li>Detailed Game Description</li>
            <li>Filtering and Sorting</li>
            <li>Interactive Elements</li>
            <li>Dark Mode</li>
        </ul>


        <h3>Tech Stack :</h3>
        <h4>Frontend :</h4>
        <ul>
            <li>Framework: React</li>
            <li>Styling: CSS</li>
            <li>State Management: Redux</li>
        </ul>

        <h4>Backend: </h4>
        <ul>
            <li>Framework: Express</li>
            <li>Database : MongoDB</li>
        </ul>

        <h4>Additional Tools: </h4>
        <ul>
            <li>Version Control: Git and Github</li>
            <li>Designn: Figma</li>
        </ul>
      </div>
    </>
  )
}

export default About
