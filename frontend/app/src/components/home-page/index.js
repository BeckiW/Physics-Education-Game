import React from 'react'
import './style.scss'


class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="homepage">

        <div className="hero">
          <div className="hero-icon"><img src="/logo.png" alt="Logo" /></div>
          <div className="hero-content">
            <h1>DuoPhysics</h1>
            <p>Learn Physics for free</p>
            <br />
            <a href="/user">Get Started</a>
          </div>
        </div>

        <section>
          <div className="section-content">
            <h2>A fun way to learn Physics</h2>
            <p>Learning with DuoPhysics is fun! Earn points for correct answers, collect badges, and level up. This bite-sized lessons are effective, and we have proof that it works. We have a range of subjects for your to dive into which are both fun and interesting.</p>
          </div>
        </section>

        <section>
          <div className="section-content">
            <h2>Learn anywhere</h2>
            <p>Make your breaks and commutes more productive by learning through your phone aswell. Lessons are quick and can be played anywhere.</p>
          </div>
        </section>

        <footer>
          <div className="footer-content">
            Learn a Physics with DuoPhysics.
          </div>
        </footer>
      </div>
    )
  }
}

export default HomePage
