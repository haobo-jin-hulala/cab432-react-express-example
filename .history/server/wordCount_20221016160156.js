
const express = require('express')
const router = express.Router()
const axios = require('axios');

const redis = require('redis');
const redisClient = redis.createClient();


redisClient.connect()
    .catch((err) => {
        console.log(err);
    });

/* router.get('/positive/:query', (req, res) => {
   // const tag = "dog pictures"
     const tag = req.params.query
    let wordCountList = [];
    const redisKey = `${tag}`
    redisClient.get(redisKey).then((result) => {
        const resultJSON = JSON.parse(result);
        console.log("resultJSON")
        console.log(resultJSON)
        let arr = [];
        resultJSON
            .filter((items) => items.sentiment == "positive")
            .map((items) => {
                const text = items.text;
                text
                    .split(" ")
                    .filter((item) => (item.search("http") == -1) && (item.search("\n") == -1))
                    .map((items) => {
                        arr.push(items)
                    })
            })

        res.send(arr)
    })

}
) */
/* router.get('/negative/:query', (req, res) => {
    //const tag = "dog pictures" 
    const tag = req.params.query
    let wordCountList = [];
    const redisKey = `${tag}`
    redisClient.get(redisKey).then((result) => {
        const resultJSON = JSON.parse(result);
        console.log("resultJSON")
        console.log(resultJSON)
        let arr = [];
        resultJSON
            .filter((items) => items.sentiment == "nagetive")
            .map((items) => {
                const text = items.text;
                text
                    .split(" ")
                    .filter((item) => (item.search("http") == -1) && (item.search("\n") == -1))
                    .map((items) => {
                        arr.push(items)
                    })
            })

        res.send(arr)
    })

}
) */

router.get('/negative/:query', (req, res) => {

    const tag = req.params.query
    let wordCountList = [];
    const redisKey = `${tag}`
    redisClient.get(redisKey).then((result) => {
        const resultJSON = JSON.parse(result);
        console.log("resultJSON")
        console.log(resultJSON)
        // resultJSON
        // ?? ?? .filter((items) => items.sentiment == "positive")
        // ?? ?? .map((items) => {
        // ?? ?? ?? ?? const text = items.text;
        // ?? ?? ?? ?? text
        // ?? ?? ?? ?? ?? ?? .split(" ")
        // ?? ?? ?? ?? ?? ?? .filter((item) => (item.search("http") == -1) && (item.search("\n") == -1))
        // ?? ?? ?? ?? ?? ?? .map((items) => {
        // ?? ?? ?? ?? ?? ?? ?? ?? arr.push(items)
        // ?? ?? ?? ?? ?? ?? })
        // ?? ?? })

        resultJSON
            .filter((items) => items.sentiment == "negative")
            .map((items) => {

                const text = items.text;
                text
                    .split(" ")
                    .filter((item) => (item.search("http") == -1) && (item.search("\n") == -1))
                    .map((items) => {
                        let object = {}
                        object.word = (items)
                        wordCountList.push(object)
                    })

            })
        //res.json(wordCountList)
        res.send(wordCountList)
    })

}
)


router.get('/positive/:query', (req, res) => {

    const tag = req.params.query
    let wordCountList = [];
    const redisKey = `${tag}`
    redisClient.get(redisKey).then((result) => {
        const resultJSON = JSON.parse(result);
        console.log("resultJSON")
        console.log(resultJSON)
        // resultJSON
        // ?? ?? .filter((items) => items.sentiment == "positive")
        // ?? ?? .map((items) => {
        // ?? ?? ?? ?? const text = items.text;
        // ?? ?? ?? ?? text
        // ?? ?? ?? ?? ?? ?? .split(" ")
        // ?? ?? ?? ?? ?? ?? .filter((item) => (item.search("http") == -1) && (item.search("\n") == -1))
        // ?? ?? ?? ?? ?? ?? .map((items) => {
        // ?? ?? ?? ?? ?? ?? ?? ?? arr.push(items)
        // ?? ?? ?? ?? ?? ?? })
        // ?? ?? })

        resultJSON
            .filter((items) => items.sentiment == "positive")
            .map((items) => {

                const text = items.text;
                text
                    .split(" ")
                    .filter((item) => (item.search("http") == -1) && (item.search("\n") == -1))
                    .map((items) => {
                        let object = {}
                        object.word = (items)
                        wordCountList.push(object)
                    })

            })
        //res.json(wordCountList)
        res.send(wordCountList)
    })

}
)


module.exports = router;