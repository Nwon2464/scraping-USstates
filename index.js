const express = require("express");
const getUSStates = require("./getUSStates");
const app = express();

app.get("/api/states", async (req, res) => {
  const states = await getUSStates();
  res.json(states);
});

app.listen(5000, () => {
  console.log("Listening.. on PORT 5000");
});
