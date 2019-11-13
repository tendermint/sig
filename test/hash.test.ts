import * as Sig from '../';

const emptyBytes = new Uint8Array([]);

const emptySha256 = new Uint8Array([
    227,
    176,
    196,
    66,
    152,
    252,
    28,
    20,
    154,
    251,
    244,
    200,
    153,
    111,
    185,
    36,
    39,
    174,
    65,
    228,
    100,
    155,
    147,
    76,
    164,
    149,
    153,
    27,
    120,
    82,
    184,
    85
]);

const emptyRipemd160 = new Uint8Array([
    156,
    17,
    133,
    165,
    197,
    233,
    252,
    84,
    97,
    40,
    8,
    151,
    126,
    232,
    245,
    72,
    178,
    37,
    141,
    49
]);

const knownBytes = new Uint8Array([
    84,
    104,
    101,
    32,
    113,
    117,
    105,
    99,
    107,
    32,
    98,
    114,
    111,
    119,
    110,
    32,
    102,
    111,
    120,
    32,
    106,
    117,
    109,
    112,
    115,
    32,
    111,
    118,
    101,
    114,
    32,
    116,
    104,
    101,
    32,
    108,
    97,
    122,
    121,
    32,
    100,
    111,
    103,
    46
]);

const knownSha256 = new Uint8Array([
    239,
    83,
    127,
    37,
    200,
    149,
    191,
    167,
    130,
    82,
    101,
    41,
    169,
    182,
    61,
    151,
    170,
    99,
    21,
    100,
    213,
    215,
    137,
    194,
    183,
    101,
    68,
    140,
    134,
    53,
    251,
    108
]);

const knownRipemd160 = new Uint8Array([
    252,
    133,
    1,
    105,
    177,
    242,
    206,
    114,
    227,
    248,
    170,
    10,
    235,
    92,
    168,
    125,
    111,
    133,
    25,
    198
]);

describe('hash', () => {
    describe('sha256', () => {
        it('hashes empty bytes', () => {
            const hash = Sig.sha256(emptyBytes);
            expect(hash).toBeBytes(emptySha256);
        });

        it('hashes known bytes', () => {
            const hash = Sig.sha256(knownBytes);
            expect(hash).toBeBytes(knownSha256);
        });
    });

    describe('ripemd160', () => {
        it('hashes empty bytes', () => {
            const hash = Sig.ripemd160(emptyBytes);
            expect(hash).toBeBytes(emptyRipemd160);
        });

        it('hashes known bytes', () => {
            const hash = Sig.ripemd160(knownBytes);
            expect(hash).toBeBytes(knownRipemd160);
        });
    });
});
