const jwtconfig = require("./JWT.json");

const validateDiscordBot = async (req, res, next) => {
  if ((!req.headers.authorization || !req.headers.authorization.startsWith("Bearer "))) {
    console.error("No token was passed as a Bearer token in the Authorization header.",
        "Make sure you authorize your request by providing the following HTTP header:",
        "Authorization: Bearer <Firebase ID Token>",
        "or by passing a \"__session\" cookie.");
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    console.log("Found \"Authorization\" header");
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    // No cookie
    res.status(403).send("Unauthorized");
    return;
  }
  console.log(jwtconfig.botKey);
  console.log(idToken);
  if (idToken === jwtconfig.botKey) {
    next();
  } else {
    res.status(403).send("Unauthorized");
  }
};

module.exports = {validateDiscordBot};
