import ReactPlayer from 'react-player'

const Video = (props) => (
    <div className='player-wrapper'>
        <ReactPlayer className='react-player'
            url={`https://www.youtube.com/watch?v=${props.videoId}`}
            width='100%'
            height='100%'
            controls />
    </div>
)

export default Video