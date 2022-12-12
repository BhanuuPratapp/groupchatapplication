const express = require('express')
const messagetable = require('../models/messages')

exports.sendmsg = async (req, res, next) => {
   
   
    const message = req.body.message;
    const username = req.user.name;
    const groupid = req.body.groupid;

    if(!groupid)
    {
        req.user.createMessage({message: message, Username: username}).then(() =>{
            res.sendStatus(200)
        })
    }
    else
    {
        req.user.createMessage({message: message, Username: username, GroupId:groupid}).then(() =>{
            res.sendStatus(200)
        })
    }
}