import express from 'express'
import knightController from '../controller/knightController.js'

const router = express.Router()

router.get('/knights', knightController.findAll) 
router.get('/knights/:id', knightController.findById)
router.post('/knights', knightController.Register)
router.put('/knights/:id', knightController.updateNickName)
router.delete('/knights/:id', knightController.delete)

export default router