import React from "react"
import './style.scss'

class Header extends React.Component {



  render() {
    return (
      <header>
        <div className="logoContainer">
          <img src="logo.png" alt="Logo" />
        </div>
        <nav className="headerLinks">
            Game Page
        </nav>
      </header>
    )
  }

}

export default Header
