function deny() {
return (req, res, next) => {
//50/50 chance of getting deniied
if(Math.random() < 0.5){
//give a successful response here
next();
}else{
    res.status(418).json({
        message: "you shall not pass"
    })
}
}
}
module.exports = {
    deny,
};
//deny is a higher order function that returns a middleware function