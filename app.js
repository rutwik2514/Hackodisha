const express = require("express");
//vadhu
//sampada
//raviteja
const { link } = require("fs");
const path = require("path");
const app = express();
const any = path.join(__dirname, "./static");
const data = require("./datas.js/scholardata");
const fs = require("fs");
app.use(express.static(any));
app.use(express.urlencoded({ extended: false }));
var newData;
app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "static2", "index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact", "contact.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login", "index.html"));
});
app.post("/data", (req, res) => {
  res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <br>
        </head>
        <body style="background-color: rgb(17,20,24);">
            <center>
            </center>
            
        </body>
        </html>`);
  const name = req.body.Name;
  const state = req.body.State;
  const grade = req.body.grade;
  const category = req.body.Category;
  const gender = req.body.gender;
  const income = req.body.Income;
  const specialCategory = req.body.SpecialCategory;
  newData = data.filter((e) => {
    if (e.state == state || e.state == "null") {
      if (grade == "10") {
        if (e.grade == grade) {
          if (gender == "male") {
            if (gender == e.gender || e.gender == "null") {
              if (category == e.category || e.category == "null") {
                if (
                  Number(income) <= Number(e.income) ||
                  e.income == "null" ||
                  e.income == "open"
                ) {
                  if (
                    e.description == specialCategory ||
                    e.description == "null"
                  ) {
                    return e;
                  }
                }
              }
            }
          } else {
            if (
              category == e.category ||
              e.category == "null" ||
              e.category == "open"
            ) {
              if (Number(income) <= Number(e.income) || e.income == "null") {
                if (
                  e.description == specialCategory ||
                  e.description == "null"
                ) {
                  return e;
                }
              }
            }
          }
        }
      } else {
        if (e.grade == "12" || e.grade == "Post-Matric") {
          if (gender == "male") {
            if (e.gender == "null") {
              if (
                category == e.category ||
                e.category == "null" ||
                e.category == "open"
              ) {
                if (Number(income) <= Number(e.income) || e.income == "null") {
                  if (
                    e.description == specialCategory ||
                    e.description == "null"
                  ) {
                    console.log("ok" + e.scheme);
                    return e;
                  }
                }
              }
            }
          } else {
            if (
              category == e.category ||
              e.category == "null" ||
              e.category == "open"
            ) {
              if (Number(income) <= Number(e.income) || e.income == "null") {
                if (
                  e.description == specialCategory ||
                  e.description == "null"
                ) {
                  return e;
                }
              }
            }
          }
        }
      }
    }
  });

  if (newData.length == 0) {
    res.write(
      '<center><div style = "color: rgb(64,147,122)"><h1><b><i>Oops! no scholarships for you</h1></div></center>'
    );
  } else {
    res.write("<center>");
    res.write(
      '<h2 style = "color:white">Hola! We found following scholarships for you:</h2>'
    );
    res.write("</center>");
    for (var j = 0; j < newData.length; j++) {
      res.write('<div style = "border: 0.5px solid white">');
      res.write(
        '<br><div style = "color: rgb(64,147,122)"><b><center> SCHEME:</center></b></p></div><div style="color:rgb(98, 222, 185)"><p> <center>&nbsp ' +
          newData[j].scheme +
          "</p></center></div>"
      );
      const url = newData[j].link;
      res.write(
        '<div style="color: white;"><p><b><center>Eligibility: </b></p></center><center><p>' +
          newData[j].eligibility +
          "</center></p>"
      );
      res.write(
        "<center><p>For more information: </center><p>" +
          `<center><a href = "${url}" style="color: lightyellow" target="blank" ><button style="border: 1px solid green; border-radius: 4px;cursor:pointer;padding:4px;">Click here </button></a> </center></div>`
      );
      res.write("<br>");
      res.write("</div>");
      res.write("</div>");
    }
  }
  res.send();
});

app.listen(3000, () => {
  console.log("User hit the server");
});
