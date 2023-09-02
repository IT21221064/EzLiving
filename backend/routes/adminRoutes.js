const express = require('express')
const{
    getAdmin,
    createAdmin,
    getaAdmin,
    loginAdmin,

} = require('../controllers/adminController')

//const requireAuth = require('../middleware/requireAdminAuth')

const router = express.Router()

//router.use(requireAuth)

router.get('/', getAdmin)

router.post('/', createAdmin)

router.post('/login', loginAdmin)

router.get('/:id', getaAdmin)

module.exports = router