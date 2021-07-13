import * as React from 'react'
import { MusicControlsContainer } from './styled'

export const MusicControls = ({
  playing = false,
  song = "",
  onPlay = () => { },
  onPause = () => { },
  onStop = () => { },
}) => {
  return <MusicControlsContainer>
    <div className="buttons">
      <svg viewBox="0 0 47 61" overflow="visible" className="play" onClick={() => onPlay?.()}>
        <path d="M3.1 61.2L46 32.4c1.2-.8 1.2-2.5 0-3.3L3.1.3C1.8-.5 0 .4 0 2v57.5c0 1.6 1.8 2.5 3.1 1.7z" />
      </svg>
      <svg viewBox="0 0 44 57" overflow="visible" className="pause" onClick={() => onPause?.()}>
        <path d="M14 57H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h12c1.1 0 2 .9 2 2v53c0 1.1-.9 2-2 2z" />
        <path d="M42 57H30c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v53c0 1.1-.9 2-2 2z" />
      </svg>
      <svg viewBox="0 0 51 51" overflow="visible" className="stop" onClick={() => onStop?.()}>
        <path d="M49.2 51H1.8c-1 0-1.8-.8-1.8-1.8V1.8C0 .8.8 0 1.8 0h47.4c1 0 1.8.8 1.8 1.8v47.4c0 1-.8 1.8-1.8 1.8z" />
      </svg>
    </div>
    {playing && <div className="now-playing">
      Now Playing: <label>{song}</label>

      <div className="record-image">

      </div>
    </div>}
  </MusicControlsContainer>
}