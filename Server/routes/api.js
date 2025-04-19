module.exports = function(express, pool, jwt, secret) {
    const apiRouter = express.Router();
    

    apiRouter.get('/', function (req, res) {
        res.json({message: 'Dobro dosli na nas API!'});
    });


    apiRouter.route('/makepost').post(async function (req,res){
      try {
        let rows = await pool.query('call MakePost(?, ?, ?)', [req.body.idKorisnik, req.body.content, req.body.visibility], function (error, results, fields) {
          res.status(200).json({message: 'Success!'});
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/makecomment').post(async function (req,res){
      try {
        let rows = await pool.query('call MakeComment(?, ?, ?)', [req.body.idKorisnik, req.body.idPost, req.body.content], function (error, results, fields) {
          res.status(200).json({message: 'Success!'});
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/follow').post(async function (req,res){
      try {
        let rows = await pool.query('call Follow(?, ?)', [req.body.idKorisnik, req.body.idZapratiti], function (error, results, fields) {
          res.status(200).json({message: 'Success!'});
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    }).delete(async function (req,res){
      try {
        let rows = await pool.query('call Unfollow(?, ?)', [req.body.idKorisnik, req.body.idZapratiti], function (error, results, fields) {
          res.status(200).json({message: 'Success!'});
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    });


    apiRouter.route('/rate').post(async function (req,res){
      try {
        let rows = await pool.query('call RatePost(?, ?, ?)', [req.body.idKorisnik, req.body.idPost, req.body.value], function (error, results, fields) {
          res.status(200).json({message: 'Success!'});
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    }).delete(async function (req,res){
      try {
        let rows = await pool.query('call UnratePost(?, ?)', [req.body.idKorisnik, req.body.idPost], function (error, results, fields) {
          res.status(200).json({message: 'Success!'});
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    })

    apiRouter.route('/ratings').post(async function (req,res){
      try {
        let rows = await pool.query('call GetRatings(?)', [req.body.idKorisnik], function (error, results, fields) {
          res.status(200).json(results[0]);
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    })



    apiRouter.route('/objave').post(async function (req,res){
      try {
        let rows = await pool.query('call GetPost(?)', [req.body.idKorisnik], function (error, results, fields) {
          res.status(200).json(results[0]);
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/profileposts').post(async function (req,res){
      try {
        let rows = await pool.query('call GetProfilePosts(?)', [req.body.idKorisnik], function (error, results, fields) {
          res.status(200).json(results[0]);
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/objavepratitelja').post(async function (req,res){
      try {
        let rows = await pool.query('call GetPostFollowed(?)', [req.body.idKorisnik], function (error, results, fields) {
          res.status(200).json(results[0]);
        })
      } catch (e) {
        res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/profile').post(async function (req, res) {
      try {
        let rows = await pool.query('call GetProfile(?)', [req.body.idKorisnik], function(error, results, fields) {
          res.status(200).json(results[0][0]);
        });
      } catch(e){
          res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/followers').post(async function (req, res) {
      try {
        let rows = await pool.query('call GetFollowers(?)', [req.body.idKorisnik], function(error, results, fields) {
          res.status(200).json(results[0]);
        });
      } catch(e){
          res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/followed').post(async function (req, res) {
      try {
        let rows = await pool.query('call GetFollowed(?)', [req.body.idKorisnik], function(error, results, fields) {
          res.status(200).json(results[0]);
        });
      } catch(e){
          res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/comments').post(async function (req, res) {
      try {
        let rows = await pool.query('call GetComments(?)', [req.body.idObjava], function(error, results, fields) {
          res.status(200).json(results[0]);
        });
      } catch(e){
          res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/chats').post(async function (req, res) {
      try {
        let rows = await pool.query('call GetChat(?)', [req.body.idKorisnik], function(error, results, fields) {
          res.status(200).json(results[0]);
        });
      } catch(e){
          res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/newchat').post(async function (req, res) {
      try {
        let rows = await pool.query('call MakeChat(?, ?)', [req.body.idKorisnik1, req.body.idKorisnik2], function(error, results, fields) {
          res.status(200).json({message: 'Success!'});
        });
      } catch(e){
          res.status(400).json({message: 'Bad request'});
      }
    });

    apiRouter.route('/sendmessage').post(async function (req, res) {
      try {
        let rows = await pool.query('call MakeMessage(?, ?, ?)', [req.body.idChat, req.body.idKorisnik, req.body.content], function(error, results, fields) {
          res.status(200).json({message: 'Success!'});
        });
      } catch(e){
          res.status(400).json({message: 'Bad request'});
      }
    });



    return apiRouter;
}