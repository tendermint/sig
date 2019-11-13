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

    describe('arrayWrap', () => {
        it('wraps an empty array (as a copy)', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value  = [] as any[];
            const actual = Sig.arrayWrap(value);
            expect(actual).toEqual([]);
            expect(actual).not.toBe(value);
        });

        it('wraps a non-empty array (as a copy)', () => {
            const value  = ['a', 'b'];
            const actual = Sig.arrayWrap(value);
            expect(actual).toEqual(value);
            expect(actual).not.toBe(value);
        });

        it('wraps multiple arguments', () => {
            const actual = Sig.arrayWrap('a', 'b', 'c', 'd');
            expect(actual).toEqual(['a', 'b', 'c', 'd']);
        });

        it('wraps multiple arrays (without copying)', () => {
            const value0 = ['a', 'b'];
            const value1 = ['c', 'd'];
            const actual = Sig.arrayWrap(value0, value1);
            expect(actual).toEqual([value0, value1]);
            expect(actual[0]).toBe(value0);
            expect(actual[1]).toBe(value1);
        });

        it('wraps mixed array and non-array arguments', () => {
            const actual = Sig.arrayWrap('a', 'b', ['c', 'd']);
            expect(actual).toEqual(['a', 'b', ['c', 'd']]);
        });

        it('wraps null', () => {
            const actual = Sig.arrayWrap(null);
            expect(actual).toEqual([]);
        });

        it('wraps undefined', () => {
            const actual = Sig.arrayWrap(undefined);
            expect(actual).toEqual([]);
        });
    });
});
