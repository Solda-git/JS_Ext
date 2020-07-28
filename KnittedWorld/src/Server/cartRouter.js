const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();
const path = require('path');

const cartJSONPath = path.resolve(__dirname, 'db/userCart.json');

router.get('/', (req, res) => {
  console.log(`Get. cartJSONPath:${cartJSONPath}`);

  fs.readFile(cartJSONPath, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  handler(req, res, 'add', cartJSONPath);
});
// localhost:5555/api/cart/123 // req.params.id
// localhost:5555/api/cart/?var1='sfsf'&var2='ada' // req.query
router.put('/:id', (req, res) => {
  handler(req, res, 'change', cartJSONPath);
});

router.delete('/', (req, res) => {
    handler(req, res, 'del', cartJSONPath);
});

module.exports = router;
