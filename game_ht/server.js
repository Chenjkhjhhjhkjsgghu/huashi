const epxress = require('express');

const app = epxress();

app.use(epxress.static('public'));
app.use(epxress.static('ht'));


app.listen(8081)