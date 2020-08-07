// https://www.smashingmagazine.com/2017/11/safe-password-resets-with-json-web-tokens/

const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const jwt = require('jwt-simple');
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/passwordreset', function (req, res) {
    var emailAddress = req.body.email;

    var payload = {
        id: 1,
        email: emailAddress
    };
    var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';
    var token = jwt.encode(payload, secret);

    res.send('"/resetpassword/' + payload.id + '/' + token + '"');
});

server.get('/resetpassword/:id/:token', function(req, res) {
    var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';
    var payload = jwt.decode(req.params.token, secret);

    res.send(payload);
});

server.post('/resetpassword', function(req, res) {
    var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675';

    var payload = jwt.decode(req.body.token, secret);

    res.send(payload);
});

server.use(router);
server.listen(process.env.PORT || 5000, () => {
    console.log(`JSON Server is running on port ${port}`);
});