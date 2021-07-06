#!/usr/bin/env node

import fs from "fs"
import { join } from "path"
import clipboardy from "clipboardy"

const args = process.argv.slice(2)

let targetFolder = "./"

args.forEach((a, i) => {
  if (a === "-f" && args.length > i + 1) {
    targetFolder = args[i + 1]
  }
})

if (fs.existsSync(getPath())) {
  const folder = fs.readdirSync(getPath())
  console.log(`Found ${folder.length} files`)
} else {
  throw `Path does not exist: ${getPath()}`
}

function getPath() {
  return join(process.cwd(), targetFolder)
}

function getFiles() {
  return fs.readdirSync(getPath())
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
    const params = el.text
      .split("SetError(GetWarning(L")[1]
      .split("));")[0]
      .split('"')
    const key = params[1]
    const fallback = params[3]
    return {
      file: filename,
      line: el.line,
      key,
      fallback,
    }
  })

  return warningPairs
}

function scrapeFolder() {
  const files = getFiles().filter((f) => f.indexOf(".cpp") !== -1)

  if (files.length === 0) {
    console.log("No .cpp files found")
    return
  }

  const res = files.reduce((acc, filename) => {
    const fileResults = scrapeFile(filename)
    return [...acc, ...fileResults]
  }, [])

  const excelStr = res
    .map((item) => {
      return `${item.key}\t${"0"}\t${item.fallback}\t${"ERROR"}`
    })
    .join("\n")

  clipboardy.writeSync(excelStr)

  console.log(excelStr)
}

scrapeFolder()
