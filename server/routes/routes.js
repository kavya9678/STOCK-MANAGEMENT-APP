const express = require('express')
const router = express.Router()
const Model = require('../models/stocks')
var validator = require('validator');





//Users should be able to view all the existing items.


router.get('/viewall', async (req, res) => {
    try {
        console.log('view')
        const view = await Model.find()
        if (!view || view.length === 0) {
            return res.status(400).json('Bad request  unable to view all items')
        }
        console.log('Users should be able to view all the existing items.')
        res.status(200).json({
            success: true,
            data: {
                view
            }
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')


    }
})

//Users should be able to add a new item.


router.post('/add', async (req, res) => {
    const newDate = new Date()

    const { itemName, currentStock, manufacturingCompany } = req.body
    console.log('Request',req.body)
    if (!itemName || !validator.isLength(itemName,0) || validator.isEmpty(itemName)) {
        return res.status(400).json('Bad request')

    }
    if (!manufacturingCompany || typeof manufacturingCompany !== 'string' || !validator.isLength(manufacturingCompany, 0) || validator.isEmpty(manufacturingCompany)) {
        return res.status(400).json('Bad request')

    }
    // if ( validator.isEmpty(currentStock)) {
    //     return res.status(400).json('Bad request C')

    // }

    const detail = new Model({
        itemName,
        dateAdded: newDate,
        currentStock,
        manufacturingCompany,

    })
    
    try {
        const result = await detail.save()
        console.log(result)

        if (!result) {
            return res.status(400).json('Bad request nothing saved in result')
        }


        res.status(200).json({
            success: true,
            data: {
                itemName: result.itemName,
                dateAdded: result.dateAdded,
                currentStock: result.currentStock,
                manufacturingCompany: result.manufacturingCompany
            }
        });
        console.log("Users should be able to add a new item.")

    } catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')

    }
}
)


//Users should be able to delete any particular item.


router.delete('/delete/:id', async (req, res) => {

    try {
        const id = req.params.id
        if (!validator.isMongoId(id)) {
            return res.status(400).json('Bad request , id is not correct')
        }

        //problem in mongoid
        const deleteItem = await Model.findOneAndDelete({ _id: id })

        if (!deleteItem) {
            return res.status(400).json('Bad request ... delete is undefined')

        }
        res.status(200).json({
            success: true,
        });
        console.log(deleteItem, "------- >>> DELETED DOC")


    }


    catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')
    }
})



//Users should be able to view all the details of any particular item.


router.get('/particular/:id', async (req, res) => {
    const id = req.params.id
    try {
        if (!validator.isMongoId(id)) {
            return res.status(400).json('Bad request id is undefined')
        }

        const product = await Model.findOne({ _id: id })
        console.log(product,'product')
        if (!product) {
            return res.status(400).json('Bad request   product is undefined')
        }


        res.status(200).json({
            success: true,
            product:
            {
                itemName: product.itemName,
                dateAdded: product.dateAdded,
                currentStock: product.currentStock,
                manufacturingCompany: product.manufacturingCompany

            }
        });

        console.log(product, "  ..---->> All details of any particular item ")

    } catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')
    }
})



//update existing item.......problem


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id

        // if (!validator.isMongoId(id)) {
        //     return res.status(400).json('Bad request')
        // }

        const update = req.body

        if (!update ) {
            return res.status(400).json('Bad request')
        }
        const { itemName, manufacturingCompany, currentStock } = update
        const dateAdded=new Date()
        // if (!itemName ||  validator.isLength(itemName,0,50) || validator.isEmpty(itemName)) {
        //     return res.status(400).json('Bad request')
    
        // }
        // if (!manufacturingCompany || typeof manufacturingCompany !== 'string' || validator.isLength(manufacturingCompany, 0,50) || validator.isEmpty(manufacturingCompany)) {
        //     return res.status(400).json('Bad request')
    
        // }
        // if ( !validator.isNumeric(currentStock) && validator.isEmpty(currentStock)) {
        //     return res.status(400).json('Bad request')
    
        // }

        const updatedValue = await Model.updateOne({ _id: id }, { $set: { itemName, currentStock, manufacturingCompany,dateAdded } })

        if (updatedValue.nModified !== 1) {

            return res.status(400).json('Bad request  ------ nothing modified  ')

        }

        res.status(200).json({
            success: true,
            data: {
                itemName,
                currentStock,
                manufacturingCompany
            }
        });


        console.log(update, "  ------>>>> updated value ")

    }

    catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')
    }
})

//Users should be able to increment and decrement the stock of any particular item.

router.put('/incordec/:id', async (req, res) => {


    try {

        const id = req.params.id
        const counter = req.body.counter
        if (!validator.isMongoId(id)) {
            return res.status(400).json('Bad request id is incorrect')
        }
        console.log(typeof counter)



        const stockChange = await Model.updateOne(
            { _id: id }, { $inc: { currentStock: counter } }
        )
         console.log('data',stockChange)


        if (stockChange.nModified !== 1) {
            return res.status(400).json('Bad request nothing modified')
        }
        
        const showCurStock = await Model.findOne({ _id: id }, { currentStock: 1, _id: 0 })
        if (!showCurStock) {
            return res.status(400).json('Bad request showcurstock is undefined')
        }
        console.log('show--',showCurStock)
        res.status(200).json({
            success: true,
            data:{
                currentStock:showCurStock.currentStock
            }

        });

    }

    catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')


    }
})

//Users should be able to check the stock of any particular item. ...

router.get('/curStock/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (!validator.isMongoId(id)) {
            return res.status(400).json('Bad request id is incorrect')
        }

        const showCurStock = await Model.findOne({ _id: id }, { currentStock: 1, _id: 0 })
        if (!showCurStock) {
            return res.status(400).json('Bad request showcurstock is undefined')
        }

        res.status(200).json({
            success: true,
            data: {
                currentStock: showCurStock.currentStock
            }
        });

    }

    catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')
    }

})

module.exports = router