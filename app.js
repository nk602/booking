const express  = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});
//routes
const apiRoutes = require("./api/routes/routes"); 
app.use('/', apiRoutes);
const connectMongo = require("./api/_helpers/db");
//Connect Mongo
connectMongo();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});