import chai from 'chai';
import { csvParser } from '../utils/csvParser.utils.js';

const expect = chai.expect;

describe('csvParser util', () => {
	it('parses a simple CSV string into objects', () => {
		const input = 'file,text,number,hex\nfile1,Some text,123,abc123';
		const out = csvParser(input);

		expect(out).to.be.an('array').with.lengthOf(1);
		expect(out[0]).to.deep.equal({
			file: 'file1',
			text: 'Some text',
			number: '123',
			hex: 'abc123'
		});
	});

	it('returns an empty array for empty input', () => {
		const out = csvParser('');
		expect(out).to.be.an('array').that.is.empty;
	});

	it('skips rows with mismatched number of columns', () => {
		const input = 'a,b\n1,2\n3';
		const out = csvParser(input);

		// second row ("3") should be skipped
		expect(out).to.be.an('array').with.lengthOf(1);
		expect(out[0]).to.deep.equal({ a: '1', b: '2' });
	});

	it('handles input with trailing whitespace/newlines (trim)', () => {
		const input = "a,b\n1,2\n\n\n"; // trailing newlines should be ignored by trim
		const out = csvParser(input);
		expect(out).to.be.an('array').with.lengthOf(1);
		expect(out[0]).to.deep.equal({ a: '1', b: '2' });
	});

	it('skips rows when a value is empty', () => {
		const input = 'a,b\n1,'; // b is empty -> row should be skipped
		const out = csvParser(input);
		expect(out).to.be.an('array').that.is.empty;
	});

	it('skips rows when a number field contains a non-numeric value', () => {
		const input = 'a,number\n1,not-a-number';
		const out = csvParser(input);
		expect(out).to.be.an('array').that.is.empty;
	});

	it('parses rows when number field is numeric', () => {
		const input = 'file,number\nfile1,42';
		const out = csvParser(input);

		expect(out).to.be.an('array').with.lengthOf(1);
		expect(out[0]).to.deep.equal({ file: 'file1', number: '42' });
	});
});
