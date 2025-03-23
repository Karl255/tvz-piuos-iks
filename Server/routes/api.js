module.exports = function(express, pool, jwt, secret) {
    const apiRouter = express.Router();
    

    apiRouter.get('/', function (req, res) {
        res.json({message: 'Dobro dosli na nas API!'});
    });




    apiRouter.route('/users').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM korisnik', function (error, results, fields) {
          res.status(200).json({results})
        })
      } catch (e) {
        res.status(400).send('Bad request');
      }
    });

    apiRouter.route('/komentari').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM komentar', function (error, results, fields) {
          res.json({results})
        })
      } catch (e) {
        res.status(400).send('Bad request');
      }
    });

    apiRouter.route('/objave').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM objava', function (error, results, fields) {
          res.json({results})
        })
      } catch (e) {
        res.status(400).send('Bad request');
      }
    });

    apiRouter.route('/ld').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM objavalikedislike', function (error, results, fields) {
          res.json({results})
        })
      } catch (e) {
        res.status(400).send('Bad request');
      }
    });

    apiRouter.route('/poruke').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM poruka', function (error, results, fields) {
          res.json({results})
        })
      } catch (e) {
        res.status(400).send('Bad request');
      }
    });

    apiRouter.route('/pratitelji').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM pratitelji', function (error, results, fields) {
          res.json({results})
        })
      } catch (e) {
        res.status(400).send('Bad request');
      }
    });

    apiRouter.route('/razgovori').get(async function (req,res){
      try {
        let rows = await pool.query('SELECT * FROM razgovor', function (error, results, fields) {
          res.json({results})
        })
      } catch (e) {
        res.status(400).send('Bad request');
      }
    });
    return apiRouter;
}