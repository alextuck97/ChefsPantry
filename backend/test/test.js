var chai = require("chai");
var chaiHttp = require("chai-http");
var enableDestroy = require("server-destroy");

var app = require("../app").app;


chai.use(chaiHttp);
chai.should();

describe('Recipe Routes', function () {

    before(function(done) {
        if(app.dbConnected){
            process.nextTick(done);
        } else {
            app.on('dbConnected', ()  => {
                done();
            });
        }
    })

   
    describe('GET recipes/id/:id', function () {
        it('should return one recipe', function (done) {
            chai.request(app)
                .get("/recipes/id/5f04f3452be79d51af283a69")
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
            
        });

    describe('GET recipes/ingredients', function () {
        it('should return no recipes', function(done) {
            chai.request(app)
                .get("/recipes/ingredients")
                .end(function(err, res) {
                    res.should.have.status(400);
                    done();
                })
        })

        it('should return an object', function (done) {
            chai.request(app)
                .get("/recipes/ingredients?ing=olive oil&ing=yellow onion")
                .end(function(err, res) {
                    res.should.have.status(200);
                    
                    res.body.length.should.equal(12);
                    //res.body.should.have.all.keys('olive oil', 'yellow onion');
                    //res.body['olive oil'].length.should.equal(6);
                    //res.body['yellow onion'].length.should.equal(3);
                    done();
                })
        })

        it('should return olive oil with 6 docs', function (done) {
            chai.request(app)
                .get("/recipes/ingredients?ing=yellow onion&")
                .end(function(err, res) {
                    res.should.have.status(200);
                    //res.body.should.have.all.keys('olive oil');
                    res.body.length.should.equal(3);
                    done();
                })
        })

        it('should reject the query because it\'s too big', function(done) {
            chai.request(app)
                .get("/recipes/ingredients?ing=1&ing=2&ing=2&ing=2&ing=2&ing=2")
                .end(function(err, res) {
                    res.should.have.status(400);
                    done();
                })
        })
    })

  });

  

  
});

after(() => process.exit());
