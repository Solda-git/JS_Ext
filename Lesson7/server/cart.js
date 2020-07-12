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

////////////////////Lesson 7//////////////////////////////////////
const del = (cart, req) => {
  //const find = cart.contents.find(el => el.id_product === +req.params.id);
  cart.contents.splice(cart.contents.indexOf(+req.params.id),1);
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
