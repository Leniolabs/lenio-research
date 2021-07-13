import * as React from 'react'
import { MusicIntroContainer } from './styled'

export const MusicIntro = ({ className = "" }) => {
  return <MusicIntroContainer className={className}>
    <h1>Top 5<br /> most-streamed<br /> songs on Spotify</h1>
    <a className="btn" href="">Press Play!</a>
  </MusicIntroContainer>
}