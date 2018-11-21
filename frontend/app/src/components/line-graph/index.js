import React from 'react'
import { LineChart, Line, Scatter, ScatterChart, CartesianGrid, RadialBarChart, RadialBar, Label, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis } from 'recharts'
import Stats from '../stats-page'


class LineGraph extends React.Component {


  render() {


    return (
      <div className="container">

      <h2>Your last sessions</h2>

       <ResponsiveContainer width="90%" height="90%">
        <LineChart width={400} height={400} data={this.state.dataArray} margin={{top: 0, right: 10, left: -10, bottom: 40}}>>
          <Legend verticalAlign="top" height={36}/>
          <Tooltip />
          <Line type="monotone" dataKey="BTC-EUR" stroke="#d884d2" />
          <XAxis dataKey="timestamp" tick={{ fill: "gray", fontSize: 16 }}>
            <Label value="Time" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis type="number" domain={["dataMin - 100", "dataMax + 100"]}
              tick={{ fill: "gray", fontSize: 16 }} >
            <Label value="Price (EUR)" offset={350} label={{angle: -90, position: 'insideLeft' }} />
          </YAxis>
        </LineChart>
       </ResponsiveContainer>

      </div>
    )
  }

  }
export default LineGraph
