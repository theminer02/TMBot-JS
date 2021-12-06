const express = require("express")
// const page = require("./page.html");

const server = express()

server.all("/", (req, res) => {
  res.send("alive")
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive