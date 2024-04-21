const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");
const bodyParser = require("body-parser");
const Todo = require("./models/Todo.js");
const Port = 3000;

app.use(cors());
app.use(bodyParser.json()); //req.body

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newTodo = new Todo(data);
    const savedTodo = await newTodo.save();
    console.log("data saved", savedTodo);
    res.status(200).json(savedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/get", async (req, res) => {
  try {
    const data = await Todo.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate({_id:id},{done:true}).
  then(result=>res.json(result)).
  catch(err=>res.json(err))
});

app.delete('/delete/:id',(req,res)=>{
  const {id} = req.params;
  Todo.findByIdAndDelete({_id:id}).
  then(result=>res.json(result)).
  catch(err=>res.json(err))
})

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
