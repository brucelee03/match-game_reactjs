import {Component} from 'react'

import NavItem from '../NavItem'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'

import './index.css'

class GameStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      timeLimit: 60,
      activeTabId: props.tabsList[0].tabId,
      activeThumbnailId: props.imagesList[0].id,
      tabsList: props.tabsList,
      imagesList: props.imagesList,
      isGameRunning: true,
    }
    this.timerInterval = null
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  updateActiveTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  getActiveThumbnailImage = () => {
    const {activeThumbnailId, imagesList} = this.state
    return imagesList.find(eachImage => eachImage.id === activeThumbnailId)
  }

  getFilteredImages = () => {
    const {activeTabId, imagesList} = this.state
    const filteredImages = imagesList.filter(
      eachImageDetails => eachImageDetails.category === activeTabId,
    )
    return filteredImages
  }

  tick = () => {
    const {timeLimit} = this.state
    if (timeLimit > 0) {
      this.setState(prevState => ({timeLimit: prevState.timeLimit - 1}))
    } else {
      clearInterval(this.timerID)
      this.setState({isGameRunning: false})
    }
  }

  handleThumbnailClick = id => {
    const {activeThumbnailId, imagesList} = this.state
    if (id === activeThumbnailId) {
      this.setState(prevState => ({score: prevState.score + 1}))
      const randomImageIndex = Math.floor(Math.random() * imagesList.length)
      this.setState({
        activeThumbnailId: imagesList[randomImageIndex].id,
      })
    } else {
      this.setState({isGameRunning: false})
      clearInterval(this.timerID)
    }
  }

  playAgain = () => {
    const {tabsList, imagesList} = this.state
    this.setState({
      score: 0,
      timeLimit: 60,
      activeTabId: tabsList[0].tabId,
      activeThumbnailId: imagesList[0].id,
      isGameRunning: true,
    })
    this.timerID = setInterval(this.tick, 1000)
  }

  render() {
    const {score, timeLimit, activeTabId, tabsList, isGameRunning} = this.state
    const activeImage = this.getActiveThumbnailImage()
    const filteredImages = this.getFilteredImages()
    return (
      <div className="match-game-container">
        <ul className="navbar">
          <NavItem score={score} timeLimit={timeLimit} />
        </ul>
        {isGameRunning ? (
          <>
            <img src={activeImage.imageUrl} alt="match" className="match-img" />
            <ul className="tabs-container">
              {tabsList.map(tabDetails => (
                <TabItem
                  key={tabDetails.tabId}
                  tabDetails={tabDetails}
                  updateActiveTabId={this.updateActiveTabId}
                  isActive={activeTabId === tabDetails.tabId}
                />
              ))}
            </ul>
            <ul className="images-list-container">
              {filteredImages.map(imageDetails => (
                <ThumbnailItem
                  key={imageDetails.id}
                  imageDetails={imageDetails}
                  onThumbnailClick={this.handleThumbnailClick}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="score-board">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy-img"
            />
            <p className="score-board-heading">Your Score</p>
            <p className="score-board-score">{score}</p>
            <button
              type="button"
              className="play-again-btn"
              onClick={this.playAgain}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
                className="retry-img"
              />
              Play Again
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default GameStore
