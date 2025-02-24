const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization)
    return res.status(401).json({ msg: "Acceso denegado!" });
  
  try {
    let [type, token] = authorization.split(" ");
    if (type === "Token" || type === "Bearer") {
      const openToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = openToken.user;
      next();
    } else {
      return res.status(401).json({ msg: "No tienes autorización" });
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Token inválido" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expirado" });
    } else {
      return res
        .status(500)
        .json({ msg: "Error interno en la autenticación", error });
    }
  }
};
