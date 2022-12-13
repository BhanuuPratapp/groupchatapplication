const express = require('express')
const messagetable = require('../models/messages')
const { Sequelize, Op } = require("sequelize");
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

exports.getmessages = async (req, res) => {
    const id=req.query.id
    console.log("Idddddddddddddddd", id)
   messagetable
      .findAll({where:{msgid:{[Op.gt]:id}, GroupId:null}})
      .then((msgs) => {
        res.json(msgs);
      })
      .catch((err) => console.log(err));
  };

  exports.getallmessages = async(req, res) =>{
    messagetable
      .findAll().then((msgs) =>{
        res.json({allmessages: msgs})
      })
      .catch(err => console.log(err))
  }

  
exports.getgroupmessages=async function(req,res){
    const groupid=req.query.gid
  
    messagetable
      .findAll({where:{GroupId:groupid}})
      .then((msgs) => {
        res.json(msgs);
      })
      .catch((err) => console.log(err));
  
  
  
  }