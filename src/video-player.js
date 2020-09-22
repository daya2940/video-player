import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';


const VideoPlayer = () => {
  const [data, setData] = useState({});
  const vidRef = useRef(null);
  const [PlayControl, setControl] = useState({
    playing: true,
  });

  useEffect(() => {
    axios.get('https://api.npoint.io/8ee06a976b8dc64004e7 ')
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        else {
          setData(res.data.videos);
        }
      })
  }, []);

  const { playing } = PlayControl;

  // const handlePlayPause = () => {
  //   setControl({ playing: !playing });
  // }

  const playVideo = (e, vidRef) => {
    vidRef.current.seekTo(0, 'seconds')
    setControl({ playing: true })
  }

  const jumpTo = (e, vidRef, time) => {
    vidRef.current.seekTo(time, 'seconds');
  };

  const video = [];
  if (data.length > 0) {
    data.map(item => video.push(item.video));
  }
  return (
    <div>
      <ReactPlayer
        controls
        playing={playing}
        url={video}
        repeat={false.toString()}
        ref={vidRef}
      />
      <div>
        {/* <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button> */}
        <div className="replay">
          <button onClick={(e) => playVideo(e, vidRef)}>Replay</button>
        </div>
        <div style={{ marginTop: '30px' }}>
          <p>TimeStamp</p>
          <p type="link" onClick={(e) => jumpTo(e, vidRef, 6)}>6.0</p>
          <p type="link" onClick={(e) => jumpTo(e, vidRef, 5)}>5.0</p>
          <p type="link" onClick={(e) => jumpTo(e, vidRef, 30)}>30.0</p>
          <p type="link" onClick={(e) => jumpTo(e, vidRef, 10)}>10.0</p>
        </div>
      </div>
    </div>
  );
}
export default VideoPlayer;
