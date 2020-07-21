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
            console.log("Waiting on connection");
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

        it('should return nothing because this id does not exist', function (done) {
            chai.request(app)
                .get("/recipes/id/5f04f3452be79d51af283a12")
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
            
        });


        it('should return nothing because 123 is not a 12 byte id string', function (done) {
            chai.request(app)
                .get("/recipes/id/123")
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.body.name.should.equal('Error');
                    done();
                })
            
        });
    })
       

    describe('GET recipes/ingredients', function () {
        it('should return no recipes', function(done) {
            chai.request(app)
                .get("/recipes/ingredients")
                .end(function(err, res) {
                    res.should.have.status(400);
                    done();
                })
        })

        it('should return an empty list', function(done) {
            chai.request(app)
                .get("/recipes/ingredients?ing=1234")
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.length.should.equal(0);
                    done();
                })
        })

        it('should return a list with length 12', function (done) {
            chai.request(app)
                .get("/recipes/ingredients?ing=olive oil&ing=yellow onion")
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.length.should.equal(12);
                    done();
                })
        })

        it('should return a list with length 3', function (done) {
            chai.request(app)
                .get("/recipes/ingredients?ing=yellow onion&")
                .end(function(err, res) {
                    res.should.have.status(200);
                    //res.body.should.have.all.keys('olive oil');
                    res.body.length.should.equal(3);
                    done();
                })
        })

        it('should return a list with length 3', function (done) {
            chai.request(app)
                .get("/recipes/ingredients?ing=YELLOW onION&")
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

  

  


after(() => process.exit());
