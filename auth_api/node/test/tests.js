import chai from 'chai';
import 'babel-polyfill';
import { loginFunction } from '../services/login'
import { protectFunction } from '../services/protected'


const expect = chai.expect;

describe('loginFunction()', function() {
    it('Test login', async function() {
        var result = await loginFunction("admin", "secret")
        expect(200).to.be.equal(result.status);
    });
});

describe('protectFunction()', function() {
    it('Test protected', function() {
        var result = protectFunction("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI")
        expect("You are under protected data").to.be.equal(result.data);
    });
});