import './setup';
import * as Sig from '../';

const knownBase64 = 'AA==';
const knownBytes  = [0];
const knownString = '\u0000';

describe('util', () => {
    describe('base64ToBytes', () => {
        it('converts base64 to bytes', () => {
            const bytes = Sig.base64ToBytes(knownBase64);
            expect(bytes).toBeBytes(knownBytes);
        });
    });

    describe('bytesToBase64', () => {
        it('converts bytes to base64', () => {
            const base64 = Sig.bytesToBase64(new Uint8Array(knownBytes));
            expect(base64).toBe(knownBase64);
        });
    });

    describe('bytesToString', () => {
        it('converts bytes to string', () => {
            const string = Sig.bytesToString(new Uint8Array(knownBytes));
            expect(string).toBe(knownString);
        });
    });

    describe('stringToBytes', () => {
        it('converts string to bytes', () => {
            const bytes = Sig.stringToBytes(knownString);
            expect(bytes).toBeBytes(knownBytes);
        });
    });

    describe('isObject', () => {
        for (const [type, value, expected] of [
            ['object literal', {}, true],
            ['object without prototype', Object.create(null), true],
            ['date', new Date, false],
            ['array', [], false],
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            ['function', function () {
            }, false],
            ['string', '', false],
            ['number', 0, false],
            ['boolean', true, false],
            ['null', null, false],
            ['undefined', undefined, false]
        ]) {
            it(`${ type } ${ expected ? 'is' : "isn't" } an object`, () => {
                const actual = Sig.isObject(value);
                expect(actual).toBe(expected);
            });
        }
    });
});
