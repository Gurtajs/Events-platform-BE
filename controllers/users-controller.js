const {getAllUsersData, getUserData, postUserData, getAllEventsByUserData, getEventByUserData, postEventByUserData, deleteEventByUserData, getUserByEmailData} = require("../models/users-models")

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

function getAllEventsByUser(req, res, next) {
  const {user_id} = req.params
  getAllEventsByUserData(user_id).then((events) => {
    res.status(200).send({events})
  }).catch(next)
}

function getEventByUser(req, res, next) {
  const {user_id, event_id} = req.params
  getEventByUserData(user_id, event_id).then((event) => {
    res.status(200).send({event})
  }).catch(next)
}

function postEventByUser(req, res, next) {
  const event = req.body
  postEventByUserData(event).then((event)=> {
    res.status(201).send({event})
  }).catch(next)
}

function deleteEventByUser(req, res, next) {
  const {user_id, event_id} = req.params
  deleteEventByUserData(user_id, event_id).then(() => {
    res.sendStatus(204)
  }).catch(next)
}

function getUserByEmail(req, res, next) {
  const {email} = req.params
  console.log(email)
  getUserByEmailData(email).then((user) => {
    res.status(200).send({user})
  }).catch(next)
}

module.exports = {getAllUsers, getUser, postUser, getAllEventsByUser, getEventByUser, postEventByUser, deleteEventByUser, getUserByEmail}