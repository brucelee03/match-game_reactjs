import './index.css'

const ImageItem = props => {
  const {imageDetails, onThumbnailClick} = props
  const {id, thumbnailUrl} = imageDetails

  const onMatchClick = () => {
    onThumbnailClick(id)
  }

  return (
    <>
      <li className="image-item">
        <button type="button" onClick={onMatchClick} className="button">
          <img className="thumbnail-image" src={thumbnailUrl} alt="thumbnail" />
        </button>
      </li>
    </>
  )
}

export default ImageItem
