const Express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cookieParser = require("cookie-parser");

const jwksHost = process.env.HANKO_API_URL;

const app = new Express();
app.use(cookieParser());
app.use(
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 2,
      jwksUri: `${jwksHost}/.well-known/jwks.json`,
    }),
    algorithms: ["RS256"],
    getToken: function fromCookieOrHeader(req: {
      headers: { authorization: string };
      cookies: { hanko: any };
    }) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.hanko) {
        return req.cookies.hanko;
      }
      return null;
    },
  })
);

// The decoded JWT is available through the `req.auth` property (the exact property
// making it available can be customized through the `requestProperty` option on
// middleware creation).
// see: https://github.com/auth0/express-jwt#api
app.get(
  "/protected",
  function (
    req: { auth: string },
    res: { sendStatus: (arg0: number) => void }
  ) {
    if (!req.auth.sub) return res.sendStatus(401);
    res.sendStatus(200);
  }
);
