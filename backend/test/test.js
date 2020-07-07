var chai = require("chai");
var chaiHttp = require("chai-http");
var enableDestroy = require("server-destroy");

var app = require("../app").app;


chai.use(chaiHttp);
chai.should();

describe('Routes', function () {

    before(function(done) {
        if(app.dbConnected){
            process.nextTick(done);
        } else {
            app.on('dbConnected', ()  => {
                done();
            });
        }
    })

   

    describe('Listing GET/', function () {
        it('should return one record', function (done) {
            chai.request(app)
                .get("/listing/10006546/")
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
            
        });

  });

  

  
});

after(() => process.exit());
