const express = require('express');
const router = express.Router();
const db = require('./genericDbService');

router.route('/segment')
    .post(async (req, res, next)=>{
        try {
            const body = req.body;
            const result = await db.create('segment_data', body);
            res.status(200).send({data:result})
        } catch (error) {
            console.log(error);
            res.status(500).send({error})
        }
    })

module.exports = router;