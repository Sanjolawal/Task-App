const path = require(`path`);

const collection = require(path.resolve(`server.js`));

console.log(collection);

const tasksSent = (req, res) => {
  const { task } = req.body;
  console.log(task);
  // collection.create({ task: task });
  res.end();
};

const tasksList = async (req, res) => {
  try {
    const datas = await collection.find({});
    res.send(datas);
  } catch {
    console.log(`error fetching all documents from database`);
  }
};

const singleTask = (req, res) => {
  
};
const updateSingleTask = (req, res) => {
  res.send(" put ok");
};
const deleteSingleTask = (req, res) => {
  res.send("delete ok");
};

module.exports = {
  tasksList,
  tasksSent,
  singleTask,
  updateSingleTask,
  deleteSingleTask,
};
