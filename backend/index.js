const express = require("express");
const cors = require("cors");
const env = require("./config/envConfig");
const connect = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// database connection
connect();
app.use(cors());
// add middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to DATN backend" });
});

// user routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", paymentRoutes);
// app.use("/api", orderRoutes);

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Your server is running at port number: ${port}`);
});
