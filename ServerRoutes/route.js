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

router.route(`/api`).get(tasksList).post(tasksSent);
router
  .route(`/api/:id`)
  .get(singleTask)
  .put(updateSingleTask)
  .delete(deleteSingleTask);

router.use((req, res) => {
  res.status(404).sendFile(path.resolve(`public/error.html`));
});

module.exports = router;
