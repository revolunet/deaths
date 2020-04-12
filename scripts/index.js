var fs = require("fs")
var es = require("event-stream")
var process = require("process")

const Months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
]

const parse = (fileName) => {
  var count = 0
  const data = []
  const year = fileName.substring(6, 10)

  return new Promise((resolve) => {
    fs.createReadStream(`${__dirname}/../data/${fileName}`)
      .pipe(es.split())
      .pipe(
        es
          .mapSync((line) => {
            count++
            const y = line.substring(154, 158)
            let month = parseInt(line.substring(158, 160), 10)
            // console.log("y", y, year, y === year)
            if (month === 0) month++
            if (year === y && 1 <= month && month <= 12) {
              if (!data[month - 1]) {
                data[month - 1] = {
                  month: Months[month - 1],
                }
                data[month - 1][year] = 1
              } else {
                data[month - 1][year]++
              }
            }
          })
          .on("error", (err) => {
            console.log("Error while reading file.", err)
          })
          .on("end", () => {
            console.log("Total count:", count, data)
            resolve(data)
          })
      )
  })
}

const getFiles = () => {
  return new Promise((resolve) => {
    fs.readdir(`${__dirname}/../data`, (err, files) => {
      if (err) {
        console.error("Could not list the directory.", err)
        process.exit(1)
      }
      resolve(files)
    })
  })
}

const main = async () => {
  const files = await getFiles()
  console.log("Files:", files)

  const result = await files.reduce(async (promisedResult, file) => {
    const result = await promisedResult
    const r = await parse(file)
    return Months.map((month, i) => {
      return { ...(r[i] || {}), ...(result[i] || {}) }
    })
  }, [])

  console.log("result:", JSON.stringify(result, null, 2))
}

main()
