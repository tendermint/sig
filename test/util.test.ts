import * as Sig from '../';

const knownBase64 = 'AA==';
const knownBytes  = [0];
const knownString = '\u0000';

const knownJSON           = {
    b:         'b',
    a:         'a',
    undefined: undefined,
    null:      null,
    object:    {
        d:         'd',
        c:         'c',
        undefined: undefined,
        null:      null
    },
    array:     [{
        i:         'i',
        h:         'h',
        undefined: undefined,
        null:      null
    }, {
        g:         'g',
        f:         'f',
        undefined: undefined,
        null:      null
    }]
};
const canonicalJSON       = {
    a:      'a',
    array:  [{
        h: 'h',
        i: 'i'
    }, {
        f: 'f',
        g: 'g'
    }],
    b:      'b',
    object: {
        c: 'c',
        d: 'd'
    }
};
const canonicalJSONString = '{"a":"a","array":[{"h":"h","i":"i"},{"f":"f","g":"g"}],"b":"b","object":{"c":"c","d":"d"}}';
const canonicalJSONBytes  = [
    123,
    34,
    97,
    34,
    58,
    34,
    97,
    34,
    44,
    34,
    97,
    114,
    114,
    97,
    121,
    34,
    58,
    91,
    123,
    34,
    104,
    34,
    58,
    34,
    104,
    34,
    44,
    34,
    105,
    34,
    58,
    34,
    105,
    34,
    125,
    44,
    123,
    34,
    102,
    34,
    58,
    34,
    102,
    34,
    44,
    34,
    103,
    34,
    58,
    34,
    103,
    34,
    125,
    93,
    44,
    34,
    98,
    34,
    58,
    34,
    98,
    34,
    44,
    34,
    111,
    98,
    106,
    101,
    99,
    116,
    34,
    58,
    123,
    34,
    99,
    34,
    58,
    34,
    99,
    34,
    44,
    34,
    100,
    34,
    58,
    34,
    100,
    34,
    125,
    125
];

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

    describe('toCanonicalJSON', () => {
        const actual = Sig.toCanonicalJSON(canonicalJSON);
        expect(actual).toEqual(canonicalJSON);
    });

    describe('toCanonicalJSONString', () => {
        const actual = Sig.toCanonicalJSONString(knownJSON);
        expect(actual).toBe(canonicalJSONString);
    });

    describe('toCanonicalJSONBytes', () => {
        const actual = Sig.toCanonicalJSONBytes(knownJSON);
        expect(actual).toBeBytes(canonicalJSONBytes);
    });

    describe('isObject', () => {
        for (const [value, expected] of [
            [{}, true],
            [new Date, false],
            [[], false],
            [() => {
            }, false],
            ['', false],
            [0, false],
            [true, false],
            [null, false],
            [undefined, false]
        ]) {
            const actual = Sig.isObject(value);
            expect(actual).toBe(expected);
        }
    });

    describe('canonicalizeJSON', () => {
        const actual = Sig.toCanonicalJSON(knownJSON);
        expect(actual).toEqual(canonicalJSON);
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
