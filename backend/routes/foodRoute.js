import express from 'express'
import { addFood,listFood,deleteFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router()

//image storage system

const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,filename,cb)=>{
        return cb(null,`${Date.now()}${filename.originalname}`)
    }
})

const upload = multer({storage:storage})


foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/delete',deleteFood)


export default foodRouter;