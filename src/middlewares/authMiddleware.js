function ensureAdmin(req,res,next){
  if(!req.session.user){
    return res.redirect("/login"); 
  }

  if(req.session.user.role !== "admin"){
    return res.status(403).send("Acesso restrito apenas para administradores.")
  }

  next()
}

module.exports = ensureAdmin; 