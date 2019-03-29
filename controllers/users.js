var User = require('../models/user');
var mongoose = require('mongoose');

function usersIndex(req,res){
    User.find((err,users)=>{
        res.render("users/index",{users:users });
    });
}

function usersCreate(req,res){
    var user = new User(req.body);
    user.save((err)=>{
        res.redirect("/users")
    })
}

function usersShow(req,res){
    var id= req.params.id;
    User.findById({_id:id},(err,user)=>{
        console.log(user);
        res.render("users/show",{user:user});
    })
}

function usersNew(req,res){
    res.render("users/edit");
}

function usersEdit(req,res){
    res.render("users/edit")
}
function usersUpdate(req,res){
    var id = req.params.id;

    User.findById({_id: id},(err,user)=>{
        user.save((err)=>{
        
        })
    })
}

function usersDestroy(req,res){
    var id = req.params.id;

    User.remove({_id:id},(err)=>{

    })
}


module.exports ={
    usersIndex: usersIndex,
    usersCreate: usersCreate,
    usersNew: usersNew,
    usersEdit: usersEdit,
    usersShow: usersShow,
    usersUpdate: usersUpdate,
    usersDestroy: usersDestroy
}