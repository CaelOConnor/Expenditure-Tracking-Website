import express from "express";
import fs from "fs";
import data from "./data/data.json" with { type: "json" };
import { json } from "stream/consumers";

const app = express();

app.use(express.json());
app.use(express.static("public"));

// when user logs in
app.post("/login", function (req, res) {
  // get email and password from request
  const email = req.body.email;
  const password = req.body.password;
  // get user
  const user = data[email];

  // check if user exits and password matches
  if (user && user.password === password) {
    res.json({ success: true, message: "User authentication successful." });
  } else {
    res.json({ success: false, message: "Incorrect password." });
  }
});

// when user make new account
app.post("/register", function (req, res) {
  // get data from request body
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // check if email already exists
  if (data[email]) {
    return res.json({ success: false, message: "Username is already taken." });
  }
  // create new user
  data[email] = {
    name: name,
    email: email,
    password: password,
    expenses: [],
  };
  // save to file
  fs.writeFile(
    "./data/data.json",
    JSON.stringify(data, null, 4),
    "utf-8",
    function (err) {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }
      res.json({ success: true, message: "Registration successful." });
    },
  );
});

// get expenses for home page
app.get("/expenses", function (req, res) {
  // hard coded user based on feedback
  const user = data["arthur@gmail.com"];
  // return expenses
  res.json(user.expenses);
});

// createing a new expense on home page
app.post("/createExpense", function (req, res) {
  // hard coded user based on feedback
  const user = data["arthur@gmail.com"];
  // get new expense
  const new_expense = req.body;
  // add to users expense array
  user.expenses.push(new_expense);

  // save to file
  fs.writeFile(
    "./data/data.json",
    JSON.stringify(data, null, 4),
    "utf-8",
    function (err) {
      if (err) {
        console.log(err);
        res.json({ success: false });
      } else {
        console.log("Data Written successfully");
        res.json({ success: true });
      }
    },
  );
});

// delete expenses;
app.delete("/deleteExpense", function (req, res) {
  const user = "arthur@gmail.com";
  const description = req.body.description;
  fs.readFile("./data/data.json", "utf-8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }

    const jsonData = JSON.parse(jsonString);

    // filter out object from the array by matching description: https://www.geeksforgeeks.org/javascript/how-to-remove-specific-json-object-from-array-javascript/
    jsonData[user].expenses = jsonData[user].expenses.filter(
      (obj) => obj.description !== description,
    );

    // save to file
    fs.writeFile(
      "./data/data.json",
      JSON.stringify(jsonData, null, 4),
      "utf-8",
      function (err) {
        if (err) {
          console.log(err);
          res.json({ success: false });
        } else {
          data[user].expenses = jsonData[user].expenses;
          console.log("Data Written successfully");
          res.json({ success: true });
        }
      },
    );
  });
});

// getting user limits
app.get("/limit", function (req, res) {
  // hard coded user
  const user = data["arthur@gmail.com"];
  // return limits
  res.json(user.limits);
});

// creating a limit
app.post("/limit", function (req, res) {
  // hard coded user based on feedback
  const user = data["arthur@gmail.com"];
  // push data
  user.push(req.body);

  // save to file
  fs.writeFile(
    "./data/data.json",
    JSON.stringify(posts, null, 4),
    "utf-8",
    function (err) {
      if (err) console.log(err);
      else console.log("Data Written successfully");
    },
  );
});

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
