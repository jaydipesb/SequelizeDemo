const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routers
const router = require("./routes/UserRoutes");
app.use("/users", router);

//port
const PORT = process.env.PORT | 8000;
  
app.listen(PORT, () => {
  console.log(`server is runnig port ${PORT}`);
});
