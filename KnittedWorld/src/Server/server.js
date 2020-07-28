const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/api/cart', cartRouter); // /api/cart/../.../..

const catalogJSONPath = path.resolve(__dirname, 'db/products.JSON');
console.log(__dirname);
console.log(catalogJSONPath);


app.get('/api/products', (req, res) => {
  fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

///////страница продукта!////////
app.get('/api/product/:id', (req, res) => { 
  fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      console.log(`id_product: ${req.params.id}`);
      console.log(`typeof data: ${typeof(data)}`);
      const cart = JSON.parse(data);
      const find = cart.find(el => el.id_product === +req.params.id);
      res.send(JSON.stringify(find));
    }
  });
});
/////////////////////////////////


const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
