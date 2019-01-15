const express = require('express');

const app = express();

const fs = require('fs')

app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.render('index',{})
})


app.listen(8080)