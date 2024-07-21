import jwt from "jsonwebtoken";

// Middleware function verify token
export function verifyToken(req, res, next) {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "aditya", (err, result) => {
      if (!err) {
        console.log("Passing it to the main function");
        next();
      } else {
        res.status(403).send({ message: "Invalid Token" });
      }
    });
  } else {
    res.send({ message: "No Token sent" });
  }
}
