const port = process.env.PORT || 3000

const express = require('express')
const path = require('path')
const app = express()
const { bots, playerRecord } = require('./data')
const {shuffleArray} = require('./utils')


var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '541e00e95ed740ad820c9523910f25b2',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
rollbar.log('Assessment 6 rollbar events!')


app.put('/put', function(req, res) {
    rollbar.info('Put request sent')
    res.send('Put data sent')
    .catch((err) => {
        const Error = err
        Rollbar.error(Error)
     })

    })
    app.post('/post', function(req, res) {
        rollbar.info('This is a post for you')
        res.send('I just posted for you')
        .catch((err) => {
            const Error = err
            Rollbar.error(Error)
         })
    })

    app.delete('/delete', function(req, res){
        rollbar.info('Can I please delete you')
        res.send('I will delete you now')
        .catch((err) => {
            const Error = err
            Rollbar.error(Error)
        })
    })

    rollbar.critical('This is a critical event happening!!!!')


















//css and jsfiles added for assessment
app.use(express.static("public"));

app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.css"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.js"));
});




app.use(express.json())

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(botsArr)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})



app.listen(port, () => { console.log(`Listening on port ${port}`)
})



