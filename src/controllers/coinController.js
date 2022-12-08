const axios = require('axios')
const coinModel = require('../models/coinModel')

const getAssets = async function (req,res){
    try {

        var options = {
            method: 'get',
            url: `https://api.coincap.io/v2/assets`,
            headers: {
                Authorization: "Bearer af32d36c-025a-429b-9824-e0f303e1b097",
            }
        }
        let assets = await axios(options)
        let data =  assets.data.data
        data = data.sort((x,y) =>{
            return x.changePercent24Hr-y.changePercent24Hr
        });

        await coinModel.deleteMany({})  
        for(let i = 0 ; i<data.length ; i++){
            var coins = await coinModel.findOne({name :data[i].name,symbol : data[i].symbol});                
        }
        if(!coins){
            var coinData = await coinModel.insertMany(data);
        }
        return res.status(200).send({ status :true,message : "success" ,data: data });
        
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
module.exports = {getAssets}