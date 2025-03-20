module.exports = function(express, pool, jwt, secret) {

    const authRouter = express.Router();
    const bcrypt = require('bcryptjs');

    authRouter.get('/', function (req, res) {
        res.json({message: 'Auth moment.'});
    });



    authRouter.route('/register').post(async function (req, res) {
        req.body.Password = await bcrypt.hash(req.body.Password,10);
        try {
          let rows = await pool.query('INSERT INTO korisnik SET ?', [req.body], function(error, results, fields) {
            res.status(200).send('Status code of 200!');
          });
        } catch(e){
            res.status(400).send('Bad request');
        }
    });
  
    authRouter.route('/login').post(async function (req, res) {
        try {
          let rows = await pool.query('SELECT * FROM korisnik WHERE Username = ?', [req.body.username], async function(error, results, fields) {
            if (results.length>0 && await bcrypt.compare(req.body.password, results[0].Password)) {
              const token = jwt.sign({
                username:results[0].username,
                id:results[0].id,
            }, secret, {
                expiresIn:3600
            });
            res.status(200).json({token:token, user:results[0]});
            }
            else {
                res.status(401).send('UNAUTHORIZED');
            }
          });
  
        } catch (e) {
            res.status(400).send('Bad request');
        }
    });

    return authRouter;
}