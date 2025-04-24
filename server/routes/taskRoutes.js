const express = require('express');
const taskController = require('../controllers/taskController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

router.post('/', ensureAuthenticated, taskController.createTask);
router.get('/', ensureAuthenticated, taskController.getAllTasks);
router.put('/:id', ensureAuthenticated, taskController.updateTask);
router.delete('/:id', ensureAuthenticated, taskController.deleteTask);

module.exports = router;
