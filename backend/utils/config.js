const { JWT_SECRET = "dev-secret" } = process.env;
console.log("JWT_SECRET is:", JWT_SECRET); // Should print your secret
module.exports = { JWT_SECRET };
