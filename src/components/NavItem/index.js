import './index.css'

const NavItem = props => {
  const {score, timeLimit} = props

  return (
    <>
      <li className="nav-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
          className="logo"
        />
      </li>
      <li className="nav-item score-section">
        <div className="score-card">
          <p className="value">
            Score: <span className="span-value">{score}</span>
          </p>
        </div>
        <div className="timing-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="timer"
            className="timer-icon"
          />
          <p className="span-value">{timeLimit} sec</p>
        </div>
      </li>
    </>
  )
}

export default NavItem
