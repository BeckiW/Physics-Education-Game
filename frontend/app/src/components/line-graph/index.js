import React from 'react'
import { ResponsiveLine } from '@nivo/line'


const LineGraph = (props) => (
  <div>
    <ResponsiveLine
        data={[
  {
    "id": "japan",
    "color": "hsl(89, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 152
      },
      {
        "x": "helicopter",
        "y": 270
      },
      {
        "x": "boat",
        "y": 88
      },
      {
        "x": "train",
        "y": 124
      },
      {
        "x": "subway",
        "y": 200
      },
      {
        "x": "bus",
        "y": 129
      },
      {
        "x": "car",
        "y": 229
      },
      {
        "x": "moto",
        "y": 150
      },
      {
        "x": "bicycle",
        "y": 61
      },
      {
        "x": "others",
        "y": 22
      }
    ]} ]}
        margin={{
            "top": 50,
            "right": 110,
            "bottom": 50,
            "left": 60
        }}
        xScale={{
            "type": "point"
        }}
        yScale={{
            "type": "linear",
            "stacked": true,
            "min": "auto",
            "max": "auto"
        }}
        minY="auto"
        maxY="auto"
        stacked={true}
        axisTop= {null}
        axisRight={null}
        axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "transportation",
            "legendOffset": 36,
            "legendPosition": "middle"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "count",
            "legendOffset": -40,
            "legendPosition": "middle"
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 100,
                "translateY": 0,
                "itemsSpacing": 0,
                "itemDirection": "left-to-right",
                "itemWidth": 80,
                "itemHeight": 20,
                "itemOpacity": 0.75,
                "symbolSize": 12,
                "symbolShape": "circle",
                "symbolBorderColor": "rgba(0, 0, 0, .5)",
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemBackground": "rgba(0, 0, 0, .03)",
                            "itemOpacity": 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)
export default LineGraph
