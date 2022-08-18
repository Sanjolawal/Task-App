const express = require("express");
const router = express.Router();
const path = require("path");
const {
  tasksList,
  tasksSent,
  updateSingleTask,
  singleTask,
  deleteSingleTask,
} = require(`./controllers/routes`);

router.get("/", (req, res) => {
  res.sendFile(path.resolve(`dynamic/index.html`));
});

router.get("/edit.html", (req, res) => {
  res.sendFile(path.resolve("dynamic/edit.html"));
});
router.route(`/api`).get(tasksList).post(tasksSent);
router
  .route(`/api/:id`)
  .post(singleTask)
  .put(updateSingleTask)
  .delete(deleteSingleTask);

router.use((req, res) => {
  res.sendFile(path.resolve(`dynamic/error.html`));
});

module.exports = router;
