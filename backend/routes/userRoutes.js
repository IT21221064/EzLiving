const express = require('express')
const User = require('../models/userModel');
const auth = require('../middleware/requireUserAuth');

const{
    creatingUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser,

} = require('../controllers/userController')

const requireAuth = require('../middleware/requireUserAuth')

const router = express.Router()

//login User
router.post('/login', loginUser)

//GET a single User
router.get('/:id',getUser)

//UPDATE a User 
router.patch('/:id',updateUser)

//POST a new User 
router.post ('/', creatingUser)

//require user auth
router.use(requireAuth)

//GET all Users
router.get('/',getUsers)

router.get('/profile', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.user_id, '-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })





//DELETE a User
router.delete('/:id', deleteUser)



module.exports = router