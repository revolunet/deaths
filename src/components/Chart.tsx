import merge from "deepmerge"
import { Line } from "react-chartjs-2"

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
  const config = (canvas: HTMLCanvasElement) => {
    const defaultDataset = {
      pointRadius: 3,
      pointBorderWidth: 2,
      borderColor: "#8a85ff",
      pointBackgroundColor: "#8a85ff",
      pointBorderColor: "rgba(40, 44, 52, 0.9)",
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
    legend: { display: false },
    scales: {
      xAxes: xAxes.map((xAxe) =>
        merge(
          {
            gridLines: { display: false },
            ticks: { fontColor: "#adb0bb", padding: 5 },
          },
          xAxe
        )
      ),
      yAxes: yAxes.map((yAxe) =>
        merge(
          {
            gridLines: {
              lineWidth: 1,
              color: "#484a51",
              drawTicks: false,
              drawBorder: false,
              borderDash: [3, 3],
              drawOnChartArea: true,
              zeroLineColor: "#484a51",
            },
            ticks: {
              padding: 15,
              beginAtZero: true,
              fontColor: "#adb0bb",
            },
          },
          yAxe
        )
      ),
    },
  }

  return <Line data={config} width={400} height={200} options={options} />
}

export default Chart
