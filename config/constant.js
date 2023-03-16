

const Jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

module.exports.constant={
    JWT:Jwt,
    JWT_Secret:"ABC!@#$",
    PASS:"adjueccrbftfzysi",
    SALT:10,
    nodemailer:nodemailer,
    bcrypt:bcrypt,
    Email:'kakadiyadhruv868@gmail.com'
}