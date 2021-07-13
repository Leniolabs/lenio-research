import * as React from 'react'
import { MusicControls } from './MusicControls'
import { PlayerNeedle } from './PlayerNeedle';
import { PlayerRecord } from './PlayerRecord';
import { MusicIntro } from './MusicIntro';
import { VynilPlayer } from './VynilPlayer';
import { MusicMainContainer, MusicWrapper, } from './styled';
import { scaleUtc } from 'd3-scale'
import top5Data from "./data.json";
import { line, curveCatmullRom } from 'd3-shape'
import { colors } from './colors';


const getDates = (data) => {
  return data.map(row => row.date.getTime()).filter((x, i, arr) => arr.indexOf(x) === i)
    .sort((a, b) => a - b)
}

const parseData = (data) => {
  const mapped = data
    .filter(row => row.region === "global")
    .sort((a, b) => a.top200 - b.top200)
    .map(row => ({ ...row, date: new Date(row.date + 'T00:00'), dateStr: row.date }))
    .sort((a, b) => a.date - b.date)

  const dates = getDates(mapped)

  return mapped.map(row => ({
    ...row,
    index: dates.findIndex(d => d === row.date.getTime())//scale(row.date)
  }))
}

const groupBy = (data, keys) => {
  const groups = data.reduce((result, row) => {
    const key = keys.map(k => row[k]).join('-')
    result[key] = [...(result[key] || []), row]
    return result
  }, {})
  return Object.entries(groups).map(([_, rows]) => {
    return {
      ...keys.reduce((r, key) => { r[key] = rows[0][key]; return r; }, {}),
      rows
    }
  }).sort((a, b) => a.date - b.date)
}

const groupByDate = (data) => {
  return groupBy(data, ['dateStr', 'date', 'index']).map(group => {
    return {
      ...group,
      songs: group.rows
    }
  })
}

const splitContinuousTrends = (data) => {
  let result = []
  let current = []
  data.forEach((row, i, arr) => {
    if (!current.length || (row.date - arr[i - 1].date === 86400000)) {
      current.push(row)
    }
    else {
      result.push(current)
      current = []
    }
  })
  if (current.length) result.push(current)
  return result
}

const groupBySong = (data) => {
  return groupBy(data, ['song']).map(group => {
    return {
      name: group.song.trim(),
      color: colors[group.rows[0].top200 - 1],
      trends: splitContinuousTrends(group.rows)
    }
  })
}

const ANGULAR_VELOCITY = Math.PI / 240
const LABEL_ANGLE = Math.PI / 12
const RADIUS = 442
const RADIUS_RANGE = [RADIUS - 200, RADIUS - 20]
const CENTER = [532, 456]

const parsedData = parseData(top5Data)
const byDate = groupByDate(parsedData)
const bySong = groupBySong(parsedData)

const Index = () => {
  const [playing, setPlaying] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const timeout = React.useRef()
  const interval = React.useRef()

  React.useEffect(() => {
    if (playing) {
      timeout.current = setTimeout(() => {
        interval.current = setInterval(() => {
          setIndex(index => {
            return index * ANGULAR_VELOCITY > byDate.length * LABEL_ANGLE ? 0 : index + 1
          })
        }, 40);
      }, 0);
    }
    return () => {
      clearTimeout(timeout?.current)
      clearInterval(interval?.current)
    }
  }, [playing])

  const handlePlay = () => {
    setPlaying(true)
  }

  const handleStop = () => {
    setPlaying(false)
    setIndex(0)
  }

  const handlePause = () => {
    setPlaying(false)
  }

  const rotationAngle = index * ANGULAR_VELOCITY
  const dataIndex = parseInt(Math.round(ANGULAR_VELOCITY * index / LABEL_ANGLE).toFixed(0))

  const currentSong = byDate
    .find(row => row.index === dataIndex)?.rows.find(row => row.top200 === 1)
  const prevSong = byDate
    .find(row => row.index === dataIndex - 1)?.rows.find(row => row.top200 === 1)
  const nextSong = byDate
    .find(row => row.index === dataIndex + 1)?.rows.find(row => row.top200 === 1)

  const trendScale = React.useMemo(() => {
    const t = (v) => -v.index * LABEL_ANGLE + Math.PI / 2
    const r = (v) => (RADIUS_RANGE[1] - RADIUS_RANGE[0]) * (v.top200 - 1) / 5 + RADIUS_RANGE[0]
    return { r, t }
  }, [])

  // const trendCurve = React.useCallback((trend) => {
  //   return line().curve(curveCatmullRom)
  //     .x(d => trendScale.r(d) * Math.cos(trendScale.t(d)))
  //     .y(d => trendScale.r(d) * Math.sin(trendScale.t(d)))
  //     (trend)
  // }, [trendScale])

  return <MusicWrapper>
    <MusicControls onPlay={handlePlay} onStop={handleStop} onPause={handlePause}
      playing={playing}
      song={currentSong?.song}
    />
    <MusicMainContainer>
      <VynilPlayer
        className={playing || index !== 0 ? "playing" : ""}
      >
        <PlayerRecord />
        {playing || index !== 0 ?
          <g
            transform={`translate(${CENTER[0]}, ${CENTER[1]}) rotate(${rotationAngle * 180 / Math.PI}) `}
          >
            <circle fill="transparent" cx={0} cy={0} r={RADIUS * 1.1} /> {/* this is here to make the proper rotation */}
            <g>
              {byDate.map((row, i) => {
                const angle = Math.PI / 2 - i * LABEL_ANGLE
                const absoluteAngle = angle + rotationAngle
                const show = absoluteAngle >= 0 && absoluteAngle <= Math.PI
                const opacity = 1 - Math.abs(absoluteAngle - Math.PI / 2) * 2 / Math.PI
                if (!show) return null
                return <g
                  key={row.index}
                  transform={`translate(${RADIUS * Math.cos(angle)}, ${RADIUS * Math.sin(angle)}) rotate(${angle * 180 / Math.PI - 90})`}
                  opacity={opacity}
                >
                  <text textAnchor="middle" fill="white" fontSize={14}>
                    {row.dateStr}
                  </text>
                </g>
              })}
            </g>
            <g>
              {bySong.map((song, i) => {
                const { color, name } = song
                return <g key={name}>
                  {song.trends
                    .map(trend => {
                      return trend
                        .filter(d => Math.abs(d.index - dataIndex) < 8)
                    })
                    .map((trend, j) => {
                      if (trend.length === 0) return null //if it doesn't have a trend
                      if (trend.length === 1) { //only 1 day/point trending
                        return <circle
                          key={`circle-${j}`}
                          cx={trendScale.r(trend[0]) * Math.cos(trendScale.t(trend[0]))}
                          cy={trendScale.r(trend[0]) * Math.sin(trendScale.t(trend[0]))}
                          r={5}
                          stroke={color}
                          fill="transparent"
                        />
                      }

                      //tried this but couldn't make it work
                      // const path = trend.reduce((r, v) => {
                      //   return (r === '' ? 'M' : r + 'L') + [
                      //     Math.round(trendScale.r(v) * Math.cos(trendScale.t(v))),
                      //     Math.round(trendScale.r(v) * Math.sin(trendScale.t(v)))
                      //   ].join(',') + ' '
                      // }, '')

                      return <>
                        {/* <path
                        key={`path-${j}`}
                        d={path}//trendCurve(trend)}
                        strokeWidth={3}
                        stroke={color}
                        fill="transparent"
                      /> */}
                        {trend.map((v, j) =>
                          <circle
                            key={`circle-${j}`}
                            cx={trendScale.r(v) * Math.cos(trendScale.t(v))}
                            cy={trendScale.r(v) * Math.sin(trendScale.t(v))}
                            r={5}
                            stroke={color}
                            fill="transparent"
                          />
                        )}
                        {trend.map((v, i, arr) => i === 0 ? null :
                          <line
                            key={`line-${i}`}
                            x1={trendScale.r(arr[i - 1]) * Math.cos(trendScale.t(arr[i - 1]))}
                            y1={trendScale.r(arr[i - 1]) * Math.sin(trendScale.t(arr[i - 1]))}
                            x2={trendScale.r(v) * Math.cos(trendScale.t(v))}
                            y2={trendScale.r(v) * Math.sin(trendScale.t(v))}
                            stroke={color}
                            fill="transparent"
                          />
                        )}
                      </>
                    })
                  }
                </g>
              })}
            </g>
          </g>
          : null}<PlayerNeedle />
      </VynilPlayer>
      <MusicIntro
        className={playing || index !== 0 ? "playing" : ""}
      />
    </MusicMainContainer>
  </MusicWrapper>
}

export default Index;