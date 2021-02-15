"use strict"

var fs = require("fs")
var es = require("event-stream")
var process = require("process")
const crypto = require("crypto")
const isValid = require("date-fns/isValid")
const intervalToDuration = require("date-fns/intervalToDuration")

const baseDir = `${__dirname}/../data`

const Months = require("../src/data/months.json")

const ageGroups = [
  [0, 9],
  [10, 19],
  [20, 29],
  [30, 39],
  [40, 49],
  [50, 59],
  [60, 69],
  [70, 79],
  [80, 89],
  [90, 99],
  [100, 1000],
]

const data = new Map()

const processMortalityData = (
  data,
  { age, gender: genderIndex, year, month }
) => {
  const gender = genderIndex === 1 ? "male" : "female"
  const ageGroupIndex = age > 99 ? 10 : Math.floor(age / 10)
  const yearIndex = year - 2000
  const monthIndex = month - 1

  // by age group
  if (!data["ageGroups"]) {
    data["ageGroups"] = []
  }
  if (!data["ageGroups"][ageGroupIndex]) {
    data["ageGroups"][ageGroupIndex] = []
  }
  if (!data["ageGroups"][ageGroupIndex][yearIndex]) {
    data["ageGroups"][ageGroupIndex][yearIndex] = 0
  }
  data["ageGroups"][ageGroupIndex][yearIndex]++

  // by age group and gender
  if (!data[gender]) {
    data[gender] = { ageGroups: [] }
  }
  if (!data[gender]["ageGroups"][ageGroupIndex]) {
    data[gender]["ageGroups"][ageGroupIndex] = []
  }
  if (!data[gender]["ageGroups"][ageGroupIndex][yearIndex]) {
    data[gender]["ageGroups"][ageGroupIndex][yearIndex] = 0
  }
  data[gender]["ageGroups"][ageGroupIndex][yearIndex]++
}

const processDeathsData = (data, { age, gender: genderIndex, year, month }) => {
  // data.labels.push(month)
  // data.labels = [...new Set(data.labels)]
  const gender = genderIndex === 1 ? "male" : "female"
  const ageGroupIndex = age > 99 ? 10 : Math.floor(age / 10)
  const yearIndex = year - 2000
  const monthIndex = month - 1

  // by gender
  if (!data[gender]["global"]) {
    data[gender]["global"] = []
  }
  if (!data[gender]["global"][yearIndex]) {
    data[gender]["global"][yearIndex] = []
  }
  if (!data[gender]["global"][yearIndex][monthIndex]) {
    data[gender]["global"][yearIndex][monthIndex] = 0
  }
  data[gender]["global"][yearIndex][monthIndex]++

  // by age group
  if (!data["ageGroups"]) {
    data["ageGroups"] = []
  }
  if (!data["ageGroups"][ageGroupIndex]) {
    data["ageGroups"][ageGroupIndex] = []
  }
  if (!data["ageGroups"][ageGroupIndex][yearIndex]) {
    data["ageGroups"][ageGroupIndex][yearIndex] = []
  }
  if (!data["ageGroups"][ageGroupIndex][yearIndex][monthIndex]) {
    data["ageGroups"][ageGroupIndex][yearIndex][monthIndex] = 0
  }
  data["ageGroups"][ageGroupIndex][yearIndex][monthIndex]++

  // by gender and age group
  if (!data[gender]["ageGroups"]) {
    data[gender]["ageGroups"] = []
  }
  if (!data[gender]["ageGroups"][ageGroupIndex]) {
    data[gender]["ageGroups"][ageGroupIndex] = []
  }
  if (!data[gender]["ageGroups"][ageGroupIndex][yearIndex]) {
    data[gender]["ageGroups"][ageGroupIndex][yearIndex] = []
  }
  if (!data[gender]["ageGroups"][ageGroupIndex][yearIndex][monthIndex]) {
    data[gender]["ageGroups"][ageGroupIndex][yearIndex][monthIndex] = 0
  }
  data[gender]["ageGroups"][ageGroupIndex][yearIndex][monthIndex]++
}

const getChartsData = (data) => {
  const chartsData = {
    deaths: {
      labels: Months,
      male: {},
      female: {},
    },
    overview: {
      labels: [],
    },
    mortality: {},
  }

  data.forEach(({ age, gender, year, month }) => {
    const index = month - 1
    if (year >= 2000 && 0 <= index && index < 12) {
      processDeathsData(chartsData.deaths, { age, gender, year, month })
      processMortalityData(chartsData.mortality, { age, gender, year, month })
    }
  })

  return chartsData
}

const getLineHash = (line) =>
  crypto.createHash("md5").update(line).digest("hex")

const readLine = (line) => [
  parseInt(line.substring(80, 81), 10),
  [
    parseInt(line.substring(81, 85), 10),
    parseInt(line.substring(85, 87), 10),
    parseInt(line.substring(87, 89), 10),
  ],
  parseInt(line.substring(154, 158), 10),
  parseInt(line.substring(158, 160), 10),
  parseInt(line.substring(160, 162), 10),
]

const processLine = (line) => {
  const [gender, dob, year, month, day] = readLine(line)
  const start = new Date(dob[0], dob[1] - 1, dob[2])
  const end = new Date(year, month - 1, day)
  const { years: age } =
    isValid(start) && isValid(end)
      ? intervalToDuration({ start, end })
      : { years: -1 }

  if (Number.isInteger(year) && Number.isInteger(month) && year >= 2000) {
    data.set(getLineHash(line), { gender, age, year, month })
  }
}

const readFile = (fileName) => {
  return new Promise((resolve) => {
    fs.createReadStream(`${baseDir}/${fileName}`)
      .pipe(es.split())
      .pipe(
        es
          .mapSync(processLine)
          .on("error", (err) => console.log("Error while reading file.", err))
          .on("end", () => resolve(data))
      )
  })
}

const getFilesData = async (files) => {
  for (let i = 0, l = files.length; i < l; i++) {
    console.log(`File ${i + 1}/${l}:`, files[i])
    await readFile(files[i])
  }
}

const getFiles = () => {
  return new Promise((resolve) => {
    fs.readdir(baseDir, (err, files) => {
      if (err) {
        console.error("Could not list the directory.", err)
        process.exit(1)
      }
      resolve(files.filter((file) => file.match(/^.+\.txt$/)))
    })
  })
}

const main = async () => {
  const files = await getFiles()
  const resultFilePath = `${__dirname}/../src/data/deaths.json`
  await getFilesData(files)
  console.log("File processing done:", data.size, "records found.")
  const json = getChartsData(data)
  fs.writeFileSync(resultFilePath, JSON.stringify(json))
  console.log("Result written into", resultFilePath)
}

module.exports = main
