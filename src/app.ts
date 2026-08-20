// entry file for express
// express related logic

import express from "express"

export function  createApp() {
  const app = express()

  app.use(express.json())
}