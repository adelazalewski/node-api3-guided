const users = require("./users-model");
function checkUserID() {
    return (req, res, next) => {
    users.findById(req.params.id)
    .then((user) => {
        if (user) {
            //res.status(200).json(user)
            //set a value to the request so it can be accessed later in the middleware stack
            req.user = user
            next()
        } else {
            res.status(404).json({
                message: "User not found",
            })
        }
    })
    .catch((error) => {
        // console.log(error)
        // res.status(500).json({
        //     message: "Error retrieving the user",
        // })
        next(error)
    })
}
};

function checkNameAndEmail() {
    return (req, res, next) => {
        if (!req.body.name || !req.body.email) {
             res.status(400).json({
                message: "Missing user name or email",
            })
            
        }else{
            next()
        }
    
    }
}


module.exports = {
    checkUserID,
    checkNameAndEmail,
}