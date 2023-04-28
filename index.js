const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MySQL2912@",
  database: "assg1",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/getdata", (req, res) => {
  const getQuery = "SELECT * FROM contactdb";
  db.query(getQuery, (err, result) => {
    console.log("error hai", err);
    console.log("result agya", result);
    res.send(result);
  });
});

app.get("/getdatabyid/:id", (req, res) => {
  let ID = req.params.id;
  const getQuery = "SELECT * FROM contactdb WHERE id = ?";
  db.query(getQuery, ID, (err, result) => {
    console.log("error hai", err);
    console.log("result agya", result);
    res.send(result);
  });
});

app.post("/postdata", (req, res) => {
  const { name, email, contact } = req.body;
  let insert = "INSERT INTO contactdb (name,email,contact) VALUES (?,?,?)";
  db.query(insert, [name, email, contact], (err, result) => {
    console.log("error hai", err);
    console.log("result agya", result);
    res.send("inserted");
  });
});

app.delete("/deletedata/:id", (req, res) => {
  const ID = req.params.id;
  let delQuery = "DELETE FROM contactdb WHERE id = ?";
  db.query(delQuery, ID, (err, result) => {
    console.log("error hai", err);
    console.log("result agya", result);
    res.send("deleted");
  });
});

app.put("/updatedata/:id", (req, res) => {
  let ID = req.params.id;
  let { name, email, contact } = req.body;

  let updateQuery =
    "UPDATE contactdb SET name=?, email=?, contact=? WHERE id=?";
  db.query(updateQuery, [name, email, contact, ID], (err, result) => {
    console.log("error hai", err);
    console.log("result agya", result);
    res.send("updated");
  });
});

app.listen(4500, () => {
  console.log("Server running at port 4500");
});
