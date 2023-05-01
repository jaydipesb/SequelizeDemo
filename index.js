const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello from" });
});

//routers
const router = require("./routes/userRoutes");
app.use("/users", router);

//port
const PORT = process.env.PORT | 8000;
  
app.listen(PORT, () => {
  console.log(`server is runnig port ${PORT}`);
});
