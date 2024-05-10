import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="menubar-main-div">
      <ol>
        <li>
          <Link to="/numberguess">Number Guess</Link>
        </li>
        <li>
          <Link to="/angrybird">Angry Bird</Link>
        </li>
      </ol>
    </div>
  );
};

export default Home;
