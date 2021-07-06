import fs from "fs"
import { join } from "path"
import clipboardy from "clipboardy"

const targetFolder = "./target-files"

function getPath() {
  return join(process.cwd(), targetFolder)
}

function getFiles() {
  return fs.readdirSync(getPath())
}

function scrapeFolder() {
  const files = getFiles()

  const res = files.reduce((acc, filename) => {
    const fileResults = scrapeFile(filename)
    return [...acc, ...fileResults]
  }, [])
}

function scrapeFile(filename) {
  const path = join(getPath(), filename)
  const contents = fs.readFileSync(path, "utf-8")

  const lines = contents.split("\n").map((text, idx) => ({
    line: idx + 1,
    text,
  }))

  const setErrorLines = lines
    .filter((lineObj) => {
      const idx = lineObj.text.indexOf("SetError(GetWarning(L")
      return idx > -1
    })
    .map((lineObj) => ({
      line: lineObj.line,
      text: lineObj.text.trim(),
    }))

  const warningPairs = setErrorLines.map((el) => {
    const params = el.text.split("SetError(GetWarning(L")[1].split("));")[0].split('"')
    const key = params[1]
    const fallback = params[3]
    return {
      file: filename,
      line: el.line,
      key,
      fallback,
    }
  })

  clipboardy.writeSync(JSON.stringify(warningPairs))

  console.log(warningPairs)

  return filename
}

scrapeFolder()
