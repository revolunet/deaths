import merge from "deepmerge"
import hexToRgba from "hex-to-rgba"
import { defaults, Line } from "react-chartjs-2"
import { useTheme } from "@/services/themes"

defaults.global.animation = false

type Chart = {
  xAxes: Array<Object>
  yAxes: Array<Object>
  labels: Array<any>
  datasets: Array<Object>
  gradient?: [number, string][]
}

const getBackground = (
  canvas: HTMLCanvasElement,
  gradient: [number, string][]
) => {
  if (gradient) {
    const ctx = canvas.getContext("2d")
    const g = ctx.createLinearGradient(0, 0, 0, canvas.clientWidth)

    gradient.map(([offset, color]) => g.addColorStop(offset, color))

    return g
  }

  return "rgba(0, 0, 0, 0.1)"
}

const Chart = ({ xAxes, yAxes, datasets, labels, gradient }: Chart) => {
  const { values: theme } = useTheme()

  const config = (canvas: HTMLCanvasElement) => {
    const defaultDataset = {
      pointRadius: 3,
      pointBorderWidth: 2,
      borderColor: theme?.primary,
      pointBackgroundColor: theme?.primary,
      pointBorderColor: hexToRgba(theme?.background || "", 0.9),
    }

    return {
      labels,
      datasets: datasets.map((dataset) => {
        const obj = merge(defaultDataset, dataset)
        return { backgroundColor: getBackground(canvas, gradient), ...obj }
      }),
    }
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: { display: false },
    scales: {
      xAxes: xAxes.map((xAxe) =>
        merge(
          {
            gridLines: { display: false },
            ticks: {
              padding: 5,
              fontColor: theme?.color,
            },
          },
          xAxe
        )
      ),
      yAxes: yAxes.map((yAxe) =>
        merge(
          {
            gridLines: {
              lineWidth: 1,
              drawTicks: false,
              drawBorder: false,
              borderDash: [3, 3],
              color: theme?.muted,
              drawOnChartArea: true,
              zeroLineColor: theme?.muted,
            },
            ticks: {
              padding: 15,
              beginAtZero: true,
              fontColor: theme?.color,
            },
          },
          yAxe
        )
      ),
    },
  }

  return <Line data={config} options={options} />
}

export default Chart
