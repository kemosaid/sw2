// show home page 
function showHome(req , res) {
    res.render('pages/index.ejs');
}



module.exports = { 
    showHome , 
}