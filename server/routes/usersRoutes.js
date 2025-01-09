const express = require('express');
const usersController = require('../controllers/usersController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated'); // Ensure middleware is correctly imported
const router = express.Router();

router.post('/register', usersController.createUser); 
router.post('/login', usersController.loginUser); 

router.get('/me', ensureAuthenticated, usersController.getMe);
router.get('/created_at', ensureAuthenticated, usersController.getUserCreatedAt); // Specific routes first
router.get('/:id', ensureAuthenticated, usersController.getUser); // Dynamic route last
router.put('/:id', ensureAuthenticated, usersController.updateUser);
router.delete('/:id', ensureAuthenticated, usersController.deleteUser);

module.exports = router;
