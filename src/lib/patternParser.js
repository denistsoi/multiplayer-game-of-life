const fs = require("fs")


const patternsDir = "./patterns"
fs.readdir(`${patternsDir}/data`, (err, directory) => {
  const textFiles = directory.filter(fileName => fileName.includes(".txt"));

  textFiles.forEach(file => {
    let contents = fs.readFileSync(`${patternsDir}/data/${file}`, "utf-8")

    const lines = contents.split("\n")

    const fileContents = lines.map(line => {
      return line.trim().split(" ").map(character => {
        return character === "0" ? 0 : 1
      })
    })

    const fileName = file.split(".txt").shift()

    fs.writeFile(`${patternsDir}/output/${fileName}.json`, JSON.stringify(fileContents, null, 2), (err, result) => {
      console.log(err, result)
    })
  })
})