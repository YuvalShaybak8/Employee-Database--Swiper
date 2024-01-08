const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
const app = express();
const bodyParser = require("body-parser");
const uri =
  "mongodb+srv://yuvalsaybak:K94NoN6gcVgxWV4x@cluster0.cvxkdw4.mongodb.net/test";

async function connect() {
  try {
    const db = await mongoose.connect(uri);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
}

app.use(bodyParser.json());

// EJS + Views:
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public"));
app.use("/images", express.static(__dirname + "public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

// Models:
const EmployeeModel = require("./models/Employee");

// Routes:
const employeeRouter = require("./routes/employees");
const RegexEscape = require("regex-escape");

app.get("/homepage", async (req, res) => {
  var updatedList = [];
  const list = await EmployeeModel.find({}).exec();
  for (var i = 0; i < list.length; i++) {
    updatedList.push(list[i]);
  }
  if (req.query.search) {
    console.log(req.query.search);
    updatedList = [];
    for (var i = 0; i < list.length; i++) {
      if (
        list[i].firstname
          .toLowerCase()
          .includes(req.query.search.toLowerCase()) ||
        list[i].lastname
          .toLowerCase()
          .includes(req.query.search.toLowerCase()) ||
        list[i].department
          .toLowerCase()
          .includes(req.query.search.toLowerCase()) ||
        (list[i].firstname + " " + list[i].lastname)
          .toLowerCase()
          .includes(req.query.search.toLowerCase())
      ) {
        updatedList.push(list[i]);
      }
    }
  } else {
    updatedList = list;
  }
  res.render("homepage", { EmployeeModel: updatedList });
});

// ROUTES:
app.use("/api/", employeeRouter);

connect();

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
