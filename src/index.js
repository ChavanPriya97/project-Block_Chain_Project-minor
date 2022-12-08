const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./routes/route");

app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://PriyankaChavan:priyanka@cluster0.iocf9uz.mongodb.net/miniProject",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Block Chain mongoDB connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("express running on PORT " + (process.env.PORT || 3000));
});
