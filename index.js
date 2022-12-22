const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()


app.get('/jwt', (req,res) => {
    res.json({
        text: 'Api inicial funcionando'
    })
})

app.post('/jwt/login', (req,res) => {
    const user = {id: 1}
    const token = jwt.sign({user}, 'my_secret_key')

    res.json({token})
})

const correctToken = (req,res,next)=> {
    const header = req.headers['authorization']
    console.log(header)
    if(typeof header !== 'undefined'){
        const portador = header.split(" ")
        console.log(portador)
        const portadorToken = portador[1]
        req.token = portadorToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.get('/jwt/protected', correctToken ,(req,res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                text: 'Ruta protegida respondiendo correctamente'
            })
        }
    })
})



app.listen(3001, () => {
    console.log('Aplicacion corriendo en puerto 3001')
})