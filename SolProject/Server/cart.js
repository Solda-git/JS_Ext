const logger = require('./logger');
const moment = require ('moment');

const add = (cart, req) => {
  cart.contents.push(req.body);
  cart.amount = req.body.price * req.body.quantity + cart.amount;
  cart.countGoods += +req.body.quantity;
  logger(moment().format(), req.body.id_product, 'add');//////
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  cart.amount = find.price * req.body.quantity + cart.amount;
  cart.countGoods += req.body.quantity;
  logger(moment().format(), req.body.id_product, 'change');
  return JSON.stringify(cart, null, 4);
};

const del = (cart, req) => {
  console.log(`Looking for: ${req.body.id_product}!`)
  const findIndex = cart.contents.findIndex((el, index) => {
    if (el.id_product === req.body.id_product) {
      return el;
    } else {
      return false;
    }
  });
  cart.contents.splice(findIndex,1);
  cart.amount = cart.amount - (req.body.price * req.body.quantity);
  cart.countGoods -= req.body.quantity;
  logger(moment().format(), req.body.id_product,'delete');////////
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
