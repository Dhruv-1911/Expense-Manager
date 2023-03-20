

const Jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

module.exports.constant = {
    JWT: Jwt,
    JWT_Secret: '2a0162e3ca5aa0a3a15e0c5b23636f713dc9af9f4968989cf5f5b8b933ffcb3077aabe',
    PASS: "adjueccrbftfzysi",
    SALT: 10,
    nodemailer: nodemailer,
    bcrypt: bcrypt,
    Email: 'kakadiyadhruv868@gmail.com'
}