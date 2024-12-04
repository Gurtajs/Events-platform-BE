const {getUserData} = require("../models/user-models")

function getUser(req, res, next) {
  const {user_id} = req.params
  getUserData(user_id).then((user)=>{
    res.status(200).send({user})
  }).catch(next)
}

module.exports = {getUser}