import './setup';
import * as Sig from '../';

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

describe('canonical', () => {
    describe('toCanonicalJSON', () => {
        it('converts json to canonical json', () => {
            const actual = Sig.toCanonicalJSON(knownJSON);
            expect(actual).toEqual(canonicalJSON);
        });
    });

    describe('toCanonicalJSONClone', () => {
        it('converts json to canonical json clone', () => {
            const actual = Sig.toCanonicalJSONClone(canonicalJSON);
            expect(actual).toEqual(canonicalJSON);
        });
    });

    describe('toCanonicalJSONString', () => {
        it('converts json to canonical json string', () => {
            const actual = Sig.toCanonicalJSONString(knownJSON);
            expect(actual).toBe(canonicalJSONString);
        });
    });

    describe('toCanonicalJSONBytes', () => {
        it('converts json to canonical json bytes', () => {
            const actual = Sig.toCanonicalJSONBytes(knownJSON);
            expect(actual).toBeBytes(canonicalJSONBytes);
        });
    });
});
