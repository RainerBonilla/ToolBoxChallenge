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

	it('throws when a value is empty (current behavior)', () => {
		// The implementation assigns to a const when a value is falsy which causes a runtime error.
		// This test documents the current behavior: an empty field causes an exception.
		const input = 'a,b\n1,'; // b is empty
		expect(() => csvParser(input)).to.throw();
	});
});
