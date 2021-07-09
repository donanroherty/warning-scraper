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

function scrapeFile(file) {
  const path = join(getPath(), file)
  const contents = fs.readFileSync(path, "utf-8")

  const lines = contents.split("\n").map((text, idx) => ({
    lineIdx: idx,
    text,
  }))

  const getCommentAtLine = (lineIdx) => {
    const line = lines[lineIdx]
    if (line) {
      const trimmed = line.text.trim()
      if (trimmed.indexOf("//") === 0) {
        return trimmed.slice(2).trim()
      }
    }

    return undefined
  }

  const warningLines = lines
    .filter((lineObj) => lineObj.text.indexOf("GetWarning(L") > -1)
    .map((lineObj) => ({
      lineIdx: lineObj.lineIdx,
      text: lineObj.text.trim(),
    }))

  const warningPairs = warningLines
    .reduce((acc, el) => {
      const openGetWarning = el.text.lastIndexOf("(")
      const closeGetWarning = el.text.indexOf(")") - 1

      const parameters = el.text
        .slice(openGetWarning + 1, closeGetWarning)
        .split('",')
        .map((s) => s.trim().replace('L"', ""))

      const key = parameters[0]
      const fallback = parameters[1]
      const comment = getCommentAtLine(el.lineIdx - 1)

      if (acc.findIndex((wp) => wp.key === key) !== -1) return acc

      const item = {
        file,
        lineIdx: el.lineIdx,
        key,
        fallback,
        comment,
      }

      return [...acc, item]
    }, [])
    .filter((w) => w.key !== "-" && w.key.length > 0)

  return warningPairs
}

function scrapeFolder() {
  const files = getFiles().filter((f) => f.indexOf(".cpp") !== -1)

  if (files.length === 0) {
    console.warn("No .cpp files found")
    return
  }

  const res = files.reduce((acc, filename) => {
    const fileResults = scrapeFile(filename)
    return [...acc, ...fileResults]
  }, [])

  const excelStr = res
    .map((item) => {
      const ID_3DCS = item.key
      const VOID = 0
      const WARNING_UI = item.fallback
      const DESC_BOM = ""
      const WARNING_TYPE = "WARNING"
      const Note = item.comment ?? ""
      return `${ID_3DCS}\t${VOID}\t${WARNING_UI}\t${DESC_BOM}\t${WARNING_TYPE}\t${Note}`
    })
    .join("\n")

  clipboardy.writeSync(excelStr)

  console.log(excelStr)

  console.log(`Scraped ${res.length} errors`)
}

scrapeFolder()
