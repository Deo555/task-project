import React from 'react'
import {Link} from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
    return(
        <nav>
            <Link to="/"> HOME</Link>
            <Link to="/movie/add">ADD MOVIE</Link>
        </nav>

    )
  }
  
  export default Navigation;

  