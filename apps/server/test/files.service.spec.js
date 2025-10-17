import chai from 'chai';
import nock from 'nock';
import { listFiles, getFile, getAllFiles } from '../services/files.service.js';

const expect = chai.expect;

describe('files.service', () => {
    const base = ' https://echo-serv.tbxnet.com'; // note: service file has a leading space in baseUrl

    afterEach(() => {
        nock.cleanAll();
    });

    it('listFiles should return files array when endpoint responds', async () => {
        const resp = { files: ['a.csv', 'b.csv'] };

        nock(base)
            .get('/v1/secret/files')
            .reply(200, resp);

        const out = await listFiles();
        expect(out).to.be.an('object');
        expect(out.files).to.deep.equal(resp.files);
    });

    it('getFile should fetch file content and parse CSV into objects', async () => {
        const fileName = 'a.csv';
        const csv = 'file,text,number,hex\nfile1,Some text,123,abc123';

        nock(base)
            .get(`/v1/secret/file/${fileName}`)
            .reply(200, csv);

        const out = await getFile(fileName);
        expect(out).to.be.an('array').with.lengthOf(1);
        expect(out[0]).to.have.property('file', 'file1');
    });

    it('getAllFiles should combine parsed file data and skip empty results', async () => {
        const filesResp = { files: ['a.csv', 'b.csv', 'c.csv'] };

        nock(base)
            .get('/v1/secret/files')
            .reply(200, filesResp);

        // a.csv returns one row
        nock(base)
            .get('/v1/secret/file/a.csv')
            .reply(200, 'file,text\na,hello');

        // b.csv returns mismatched columns (will be skipped)
        nock(base)
            .get('/v1/secret/file/b.csv')
            .reply(200, 'a,b\n1');

        // c.csv returns one row
        nock(base)
            .get('/v1/secret/file/c.csv')
            .reply(200, 'file,text\nc,world');

        const out = await getAllFiles();
        expect(out).to.be.an('array');
        // should include rows from a.csv and c.csv only
        expect(out.find(r => r.file === 'a')).to.exist;
        expect(out.find(r => r.file === 'c')).to.exist;
        // b.csv produced no rows
        expect(out.find(r => r.file === '1')).to.not.exist;
    });
});
