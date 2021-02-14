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
// const AgeGoups = require("../src/data/age-groups.json")

// const Months = [
//   "Janvier",
//   "Février",
//   "Mars",
//   "Avril",
//   "Mai",
//   "Juin",
//   "Juillet",
//   "Aout",
//   "Septembre",
//   "Octobre",
//   "Novembre",
//   "Decembre",
// ]

const data = new Map()

// const processDataByGender = (data, filter) => {
//   const result = []

//   data.forEach(({ gender, year, month }) => {
//     const index = month - 1
//     if (year >= 2000 && 0 <= index && index < 12 && gender === filter.gender) {
//       if (!result[index]) {
//         result[index] = { month: Months[index] }
//       }
//       if (!result[index][year]) {
//         result[index][year] = 0
//       }
//       result[index][year]++
//     }
//   })

//   return result
// }

// const processDataByAge = (data, filter) => {
//   const result = []

//   data.forEach(({ age, year, month }) => {
//     const index = month - 1
//     if (
//       year >= 2000 &&
//       0 <= index &&
//       index < 12 &&
//       filter.start <= age &&
//       age <= filter.end
//     ) {
//       if (!result[index]) {
//         result[index] = { month: Months[index] }
//       }
//       if (!result[index][year]) {
//         result[index][year] = 0
//       }
//       result[index][year]++
//     }
//   })

//   return result
// }

// const processDataByGenderAndAge = (data, filter) => {
//   const result = []

//   data.forEach(({ age, gender, year, month }) => {
//     const index = month - 1
//     if (
//       year >= 2000 &&
//       0 <= index &&
//       index < 12 &&
//       gender === filter.gender &&
//       filter.start <= age &&
//       age <= filter.end
//     ) {
//       if (!result[index]) {
//         result[index] = { month: Months[index] }
//       }
//       if (!result[index][year]) {
//         result[index][year] = 0
//       }
//       result[index][year]++
//     }
//   })

//   return result
// }

// const processData = (data) => {
//   const results = []

//   data.forEach(({ year, month }) => {
//     const index = month - 1
//     if (year >= 2000 && 0 <= index && index < 12) {
//       if (!results[index]) {
//         result[index] = { month: Months[index] }
//       }
//       if (!results[index][year]) {
//         results[index][year] = 0
//       }
//       results[index][year]++
//     }
//   })

//   return result
// }

// const getDataByGenderAndAge = (data, gender) =>
//   ageGroups.map((group) =>
//     processDataByGenderAndAge(data, { start: group[0], end: group[1], gender })
//   )

// const getDataByAge = (data) =>
//   ageGroups.map((group) =>
//     processDataByAge(data, { start: group[0], end: group[1] })
//   )

const processDeathsData = (data, { age, gender: genderIndex, year, month }) => {
  // data.labels.push(month)
  // data.labels = [...new Set(data.labels)]
  const gender = genderIndex === 1 ? "male" : "female"
  const ageGroupIndex = age > 99 ? 10 : Math.floor(age / 10)
  const yearIndex = year - 2000
  const monthIndex = month - 1

  // global
  if (!data["global"]) {
    data["global"] = []
  }
  if (!data["global"][yearIndex]) {
    data["global"][yearIndex] = []
  }
  if (!data["global"][yearIndex][monthIndex]) {
    data["global"][yearIndex][monthIndex] = 0
  }
  data["global"][yearIndex][monthIndex]++

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
    overview: {},
    mortality: {},
  }

  data.forEach(({ age, gender, year, month }) => {
    const index = month - 1
    if (year >= 2000 && 0 <= index && index < 12) {
      processDeathsData(chartsData.deaths, { age, gender, year, month })
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

  // const json = {
  // ...getDeathsChartData(data)
  // global: processData(data),
  // ageGroups: getDataByAge(data),
  // male: {
  //   global: processDataByGender(data, { gender: 1 }),
  //   ageGroups: getDataByGenderAndAge(data, 1),
  //   // fifteen: processDataByGenderAndAge(data, {
  //   //   gender: 1,
  //   //   start: 0,
  //   //   end: 15,
  //   // }),
  //   // thirty: processDataByGenderAndAge(data, {
  //   //   gender: 1,
  //   //   start: 16,
  //   //   end: 30,
  //   // }),
  //   // fortyfive: processDataByGenderAndAge(data, {
  //   //   gender: 1,
  //   //   start: 31,
  //   //   end: 40,
  //   // }),
  //   // sixty: processDataByGenderAndAge(data, { gender: 1, start: 41, end: 60 }),
  //   // seventyfive: processDataByGenderAndAge(data, {
  //   //   gender: 1,
  //   //   start: 61,
  //   //   end: 75,
  //   // }),
  //   // ninety: processDataByGenderAndAge(data, {
  //   //   gender: 1,
  //   //   start: 76,
  //   //   end: 90,
  //   // }),
  //   // ninetyplus: processDataByGenderAndAge(data, {
  //   //   gender: 1,
  //   //   start: 91,
  //   //   end: 200,
  //   // }),
  // },
  // female: {
  //   global: processDataByGender(data, { gender: 2 }),
  //   ageGroups: getDataByGenderAndAge(data, 2),
  //   // fifteen: processDataByGenderAndAge(data, {
  //   //   gender: 2,
  //   //   start: 0,
  //   //   end: 15,
  //   // }),
  //   // thirty: processDataByGenderAndAge(data, {
  //   //   gender: 2,
  //   //   start: 16,
  //   //   end: 30,
  //   // }),
  //   // fortyfive: processDataByGenderAndAge(data, {
  //   //   gender: 2,
  //   //   start: 31,
  //   //   end: 40,
  //   // }),
  //   // sixty: processDataByGenderAndAge(data, { gender: 1, start: 41, end: 60 }),
  //   // seventyfive: processDataByGenderAndAge(data, {
  //   //   gender: 2,
  //   //   start: 61,
  //   //   end: 75,
  //   // }),
  //   // ninety: processDataByGenderAndAge(data, {
  //   //   gender: 2,
  //   //   start: 76,
  //   //   end: 90,
  //   // }),
  //   // ninetyplus: processDataByGenderAndAge(data, {
  //   //   gender: 2,
  //   //   start: 91,
  //   //   end: 200,
  //   // }),
  // },
  // // fifteen: processDataByAge(data, { start: 0, end: 15 }),
  // // thirty: processDataByAge(data, { start: 16, end: 30 }),
  // // fortyfive: processDataByAge(data, { start: 31, end: 40 }),
  // // sixty: processDataByAge(data, { start: 41, end: 60 }),
  // // seventyfive: processDataByAge(data, { start: 61, end: 75 }),
  // // ninety: processDataByAge(data, { start: 76, end: 90 }),
  // // ninetyplus: processDataByAge(data, { start: 91, end: 200 }),
  // }

  fs.writeFileSync(resultFilePath, JSON.stringify(json))
  console.log("Result written into", resultFilePath)
}

module.exports = main
