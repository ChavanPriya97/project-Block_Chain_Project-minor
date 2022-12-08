const axios = require('axios')
const coinModel = require('../models/coinModel')

const getAssets = async function (req,res){
    try {

        var options = {
            method: 'get',
            url: `https://api.coincap.io/v2/assets`,
            headers: { Authorization: "Bearer XXXXXXXXXX"}

        }
        let assets = await axios(options)
        let data =  assets.data.data
        data = data.sort((x,y) =>{
            return x.changePercent24Hr-y.changePercent24Hr
        });

        await coinModel.deleteMany({})  
        var arr = []
        for(let i = 0 ; i<data.length ; i++){
            object = {
                name :data[i].name,
                symbol : data[i].symbol,
                marketCapUsd: data[i].marketCapUsd,
                priceUsd: data[i].priceUsd
            }
            arr.push(object)

            var coins = await coinModel.findOne({name :data[i].name,symbol : data[i].symbol});                
        }
        if(!coins){
            var coinData = await coinModel.insertMany(arr);
        }
        return res.status(200).send({ status :true,message : "success" ,data: data });
        
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
module.exports = {getAssets}