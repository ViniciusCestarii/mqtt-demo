"use client"
import ReactECharts, {EChartsReactProps} from 'echarts-for-react'

const ReactEChartsClient = (props: EChartsReactProps) => {
  return (
    <ReactECharts
    {...props}
    />
  );
}

export default ReactEChartsClient;