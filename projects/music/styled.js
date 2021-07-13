import styled from "styled-components";

export const MusicWrapper = styled.div`
  background: #d6543c url("./bg-texture-noise.png") repeat;
  color: #ede4c3;
  overflow: hidden;
`;

export const MusicControlsContainer = styled.div`
    align-items: center;
    background-color: #1f2128;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 10;
    position: relative;
    svg { 
      cursor: pointer;
      fill:#ede4c3;
      margin: 1rem;
      width: 1.5rem; 
      &.play:hover { fill: #aee484; }
      &.pause:hover { fill: #e5b52b; }
      &.stop:hover { fill: #d6543c; }
    }

    .now-playing {
      color: #ade385;
      font-size: 13px;
       label {
         color: #eae4c0;
       }
    }
`


export const MusicMainContainer = styled.main`
  align-items: center;
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
  width: 100%;
`

export const VynilPlayerContainer = styled.div`
  flex: 0 1 620px;
  padding: 6rem 6rem 6rem 2rem;
  svg {
    width: 100%;
    .vinyl {
      transform-box: fill-box;
      transform-origin: center;
      &.animate {
        animation: rotatevinyl 15s 1s linear infinite;
        @keyframes rotatevinyl {
          to { transform: rotate(360deg); }
        }
      }
    }
    .pua {
      transform-box: fill-box;
      transform-origin: top center;
      transform: rotate(15deg);
      animation: rotatepua1 1s forwards ease-in-out;
      @keyframes rotatepua1 {
        to { transform: rotate(0); }
      }
    }
  }

  width: 100%;
  position: relative;

  &.playing svg {
    width: 200%;
    margin-top: -125%;

    .pua {
      transform: rotate(0) translate(0, 50%);
      animation: rotatepua2 1s forwards ease-in-out;

      @keyframes rotatepua2 {
        to { transform: rotate(-22deg) translate(-20%, 40%); }
      }
    }
  }

  .note {
    .bouncing {
      animation: bouncing 1.5s infinite; 
    }
    .disappear {
      animation: disappear 1.5s;
    }
    .appear {
      animation: appear 1s;
    }

    @keyframes bouncing {
      0% {transform: translateY(-10px);} 
      50% {transform: translateY(10px);} 
      100% {transform: translateY(-10px);} 
    }

    @keyframes disappear {
      0% {transform: translateY(0); opacity: 1;} 
      100% {transform: translateY(100px); opacity: 0;} 
    }

    @keyframes appear {
      0% {transform: translateY(-100px); opacity: 0;} 
      100% {transform: translateY(0); opacity: 1;} 
    }
  }



`

export const MusicIntroContainer = styled.div`
  position: relative;
  opacity: 1;

  &.playing {
    animation: translateIntro 1s ease-out;
    animation-fill-mode: forwards;
    right: 0;
    @keyframes translateIntro {
      50% {
        opacity: 0;
        right: -750px;
      }
      100% {
        opacity: 0;
        right: -750px;
      }
    }
  }


  h1 {
    border-left: 10px solid #e5b52b;
    font-size: 5rem; 
    padding: 0 2rem 2rem;
    max-width: 15ch;
    
    word-wrap: normal;
    white-space: nowrap;
  }
  a {
    border: 2px solid;
    border-radius: .7rem;
    color: #ede4c3;
    font-size: 2.2rem;
    padding: .6rem 5rem;
    
    word-wrap: normal;
    white-space: nowrap;

    &:hover {
      background: transparent;
      color: #aee484;
    }
  }
`