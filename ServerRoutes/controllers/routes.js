const path = require(`path`);

const collection = require(path.resolve(`server.js`));

const tasksSent = (req, res) => {
  const { task } = req.body;
  collection.create({ task: task });
  res.end();
};

const tasksList = async (req, res) => {
  try {
    const datas = await collection.find({});
    res.send(datas);
  } catch (error) {
    res.status(404).end(`No such path in the server`);
  }
};

const singleTask = async (req, res) => {
  const { id } = req.params;
  const singledTask = await collection.findById(id);
  res.send(singledTask);
};
const updateSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await collection.findByIdAndUpdate(id, req.body);
    if (!updated) {
      return res
        .status(404)
        .send(`There was no document, with the id provided`);
    }
    res.send(`succesful`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const deleteSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await collection.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .send(`There was no document, with the id provided`);
    }
    res.status(200).end(`succesful`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  tasksList,
  tasksSent,
  singleTask,
  updateSingleTask,
  deleteSingleTask,
};
