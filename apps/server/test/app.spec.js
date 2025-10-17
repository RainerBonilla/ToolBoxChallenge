import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../app.js";

const expect = chai.expect;

chai.use(chaiHttp);

describe('My App', () => {
    describe('/files/data', ()=>{
        it('should return a list of files', (done) => {
            chai.request(app)
            .get('/files/data')
            .end((err, res) => {
                expect(res).to.have.status(200);

                // check data
                expect(res.body[0]).to.have.property('file');
                expect(res.body[0]).to.have.property('text');
                expect(res.body[0]).to.have.property('number');
                expect(res.body[0]).to.have.property('hex');
                done();
            });
        });
    });
});