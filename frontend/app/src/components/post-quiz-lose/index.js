import React from 'react'
import './style.scss'


class PostQuizLosePage extends React.Component {


  render() {

    return(

      <div className="loser-container">
        <h1> Game over! You got ?? answers correct</h1>

        <img src={"./GameOver.png"} alt="loser" />

        <a href={"/dashboard"}><button> Continue </button></a>
      </div>
    )
  }

}

export default PostQuizLosePage
