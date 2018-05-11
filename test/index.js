'use strict';

const assert = require('assert');
const {containsMat, getMats} = require('..');

describe('simple test', () => {
	it('should be true with text contains хуй', () => {
		const text = '  хуй  ';
		assert.equal(containsMat(text), true);
		assert.deepEqual(getMats(text), ['хуй']);
	});

	it('should be true with text contains пизда', () => {
		const text = '  пизда  ';
		assert.equal(containsMat(text), true);
		assert.deepEqual(getMats(text), ['пизда']);
	});

	it('should be false with text contains джигурда', () => {
		const text = '  джигурда  ';
		assert.equal(containsMat(text), false);
		assert.deepEqual(getMats(text), []);
	});
});