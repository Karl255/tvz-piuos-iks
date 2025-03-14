module.exports = function(express, pool, jwt, secret) {
    const apiRouter = express.Router();
    const bcrypt = require('bcryptjs');

    apiRouter.get('/', function (req, res) {
        res.json({message: 'Dobro dosli na nas API!'});
    });


    apiRouter.route('/register').post(async function (req, res) {
      req.body.Password = await bcrypt.hash(req.body.Password,10);
      try {
        let rows = await pool.query('INSERT INTO korisnik SET ?', [req.body], function(error, results, fields) {
          if (error) throw error;
          res.json({code: "200", message: "Ok!"})
        });
      } catch(e){
        res.json({code: "100", message: "Error"});
      }
    });

    apiRouter.route('/login').post(async function (req, res) {
      console.log(req.body);
      try {
        let rows = await pool.query('SELECT * FROM korisnik WHERE Username = ?', [req.body.username], async function(error, results, fields) {
          if (results.length>0 && await bcrypt.compare(req.body.password, results[0].Password)) {
            const token = jwt.sign({
              username:results[0].username,
              id:results[0].id,
          }, secret, {
              expiresIn:3600
          });
          res.json({status: 200, token:token, user:results[0]});
          }
          else {
            res.json({status: 100, description: 'Username or password is wrong!'});
          }
          if (error) throw error;
        });

      } catch (e) {
        res.json("Error with querry!");
      }
    })




    apiRouter.route('/users').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM korisnik', function (error, results, fields) {
          if (error) throw error;
          res.json({results})
        })
      } catch (e) {
        res.json("Error")
      }
    });

    apiRouter.route('/komentari').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM komentar', function (error, results, fields) {
          if (error) throw error;
          res.json({results})
        })
      } catch (e) {
        res.json("Error")
      }
    });

    apiRouter.route('/objave').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM objava', function (error, results, fields) {
          if (error) throw error;
          res.json({results})
        })
      } catch (e) {
        res.json("Error")
      }
    });

    apiRouter.route('/ld').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM objavalikedislike', function (error, results, fields) {
          if (error) throw error;
          res.json({results})
        })
      } catch (e) {
        res.json("Error")
      }
    });

    apiRouter.route('/poruke').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM poruka', function (error, results, fields) {
          if (error) throw error;
          res.json({results})
        })
      } catch (e) {
        res.json("Error")
      }
    });

    apiRouter.route('/pratitelji').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM pratitelji', function (error, results, fields) {
          if (error) throw error;
          res.json({results})
        })
      } catch (e) {
        res.json("Error")
      }
    });

    apiRouter.route('/razgovori').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM razgovor', function (error, results, fields) {
          if (error) throw error;
          res.json({results})
        })
      } catch (e) {
        res.json("Error")
      }
    });



    apiRouter.route('/login').post(async function (req, res) {
      try {
        let rows = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], function (error, results, fields) {
          if (error) throw error;
          if (results.length>0) {
            const token = "NekiRandomTokenHaha"
            const userId = results[0].id
            res.json({token, userId});
          }
          else {
            res.json({status: 'Korisnicko ime ili lozinka nije tocno'})
          }
        });
      } catch (e){
        console.log(e);
        return res.json({"code" : 100, "status" : "Error with query"});
      }
    });

    apiRouter.route('/test').post(async function (req, res) {
      try {
        const msg = req.body;
        console.log(msg);
        res.json(msg);
      } catch (e) {
        console.log(e);
        return res.json({"code" : 100, "status" : "Error with query"});
      }
    });


    return apiRouter;
}