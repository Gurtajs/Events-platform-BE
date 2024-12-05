const {getAllUsersData, getUserData, postUserData} = require("../models/users-models")

function getAllUsers(req, res, next) {
  getAllUsersData().then((users) => {
    res.status(200).send({users})
  }).catch(next)
}


function getUser(req, res, next) {
  const {user_id} = req.params
  getUserData(user_id).then((user)=>{
    res.status(200).send({user})
  }).catch(next)
}

function postUser(req, res, next) {
  const user = req.body
  postUserData(user).then((user) => {
    res.status(201).send({user})
  }).catch(next)
}

module.exports = {getAllUsers, getUser, postUser}