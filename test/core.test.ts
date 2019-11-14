import { fromSeed } from 'bip32';
import * as Sig from '../';

const knownMnemonic = 'rich banner swift brush fury tunnel pause forest dose color luggage length';

const knownSeed = Buffer.from([
    50,
    182,
    171,
    96,
    88,
    98,
    211,
    93,
    116,
    114,
    22,
    181,
    93,
    9,
    59,
    144,
    188,
    240,
    141,
    72,
    221,
    81,
    113,
    195,
    24,
    110,
    0,
    131,
    92,
    111,
    183,
    147,
    69,
    107,
    7,
    11,
    124,
    85,
    27,
    155,
    16,
    172,
    204,
    156,
    120,
    45,
    247,
    103,
    124,
    108,
    186,
    83,
    98,
    159,
    135,
    133,
    109,
    213,
    47,
    238,
    205,
    5,
    206,
    28
]);

const knownMasterKey = fromSeed(knownSeed);

const cosmosAddress = 'cosmos1xkqfeym2enqah7mwww0wyksx8u5qplsnsy8nl7';

const cosmosPrivateKey = new Uint8Array([
    13,
    110,
    241,
    146,
    147,
    67,
    140,
    75,
    50,
    230,
    95,
    50,
    143,
    22,
    234,
    206,
    129,
    111,
    10,
    48,
    75,
    132,
    185,
    212,
    21,
    128,
    43,
    44,
    208,
    85,
    198,
    109
]);

const cosmosPublicKey = new Uint8Array([
    3,
    60,
    164,
    119,
    53,
    116,
    177,
    167,
    2,
    1,
    131,
    86,
    33,
    29,
    56,
    87,
    99,
    24,
    244,
    100,
    113,
    178,
    114,
    89,
    143,
    95,
    177,
    157,
    201,
    73,
    191,
    110,
    121
]);

const cosmosKeyPair = {
    publicKey:  cosmosPublicKey,
    privateKey: cosmosPrivateKey
};

const customPrefix = 'custom';

const customPath = "m/0'/0/0/0";

const customAddress = 'custom1v2h8z97nqaumf9t8c6fhyal2j6f9s6mugvepc5';

const customPrivateKey = new Uint8Array([
    54,
    89,
    88,
    225,
    226,
    154,
    80,
    20,
    212,
    54,
    118,
    144,
    130,
    94,
    70,
    246,
    252,
    199,
    82,
    236,
    214,
    238,
    126,
    196,
    85,
    224,
    18,
    25,
    144,
    98,
    202,
    220
]);

const customPublicKey = new Uint8Array([
    3,
    147,
    159,
    182,
    106,
    235,
    134,
    53,
    180,
    193,
    187,
    140,
    166,
    15,
    246,
    28,
    238,
    201,
    108,
    77,
    92,
    123,
    85,
    2,
    209,
    107,
    254,
    149,
    22,
    211,
    68,
    37,
    74
]);

const tx = {
    'msg':  [
        {
            'type':  'cosmos-sdk/MsgSend',
            'value': {
                'from_address': cosmosAddress,
                'to_address':   cosmosAddress,
                'amount':       [
                    {
                        'denom':  'stake',
                        'amount': '1000000'
                    }
                ]
            }
        }
    ],
    'fee':  {
        'amount': [
            {
                'denom':  'stake',
                'amount': '1'
            }
        ],
        'gas':    '100'
    },
    'memo': 'This is a test.'
};

const signMeta = {
    'account_number': '1',
    'chain_id':       'cosmos',
    'sequence':       '0'
};

const knownSignMsg = {
    'account_number': signMeta['account_number'],
    'chain_id':       signMeta['chain_id'],
    'fee':            tx['fee'],
    'memo':           tx['memo'],
    'msgs':           tx['msg'],
    'sequence':       signMeta['sequence']
};

const knownStdSignature = {
    'signature': 'zbaibf4Dh4wwM0spbZlnUWR9mGN8HwFUqyp29Mf7Ysoa0iVKUZuXrYAfTNP7pmwhMmAgp/3dolIiitQVt9tQIw==',
    'pub_key':   {
        'type':  'tendermint/PubKeySecp256k1',
        'value': 'AzykdzV0sacCAYNWIR04V2MY9GRxsnJZj1+xnclJv255'
    }
};

const knownStdTx = {
    ...tx,
    'signatures': [knownStdSignature]
};

const knownBytes = new Uint8Array([
    123,
    34,
    97,
    99,
    99,
    111,
    117,
    110,
    116,
    95,
    110,
    117,
    109,
    98,
    101,
    114,
    34,
    58,
    34,
    49,
    34,
    44,
    34,
    99,
    104,
    97,
    105,
    110,
    95,
    105,
    100,
    34,
    58,
    34,
    99,
    111,
    115,
    109,
    111,
    115,
    34,
    44,
    34,
    102,
    101,
    101,
    34,
    58,
    123,
    34,
    97,
    109,
    111,
    117,
    110,
    116,
    34,
    58,
    91,
    123,
    34,
    97,
    109,
    111,
    117,
    110,
    116,
    34,
    58,
    34,
    49,
    34,
    44,
    34,
    100,
    101,
    110,
    111,
    109,
    34,
    58,
    34,
    115,
    116,
    97,
    107,
    101,
    34,
    125,
    93,
    44,
    34,
    103,
    97,
    115,
    34,
    58,
    34,
    49,
    48,
    48,
    34,
    125,
    44,
    34,
    109,
    101,
    109,
    111,
    34,
    58,
    34,
    84,
    104,
    105,
    115,
    32,
    105,
    115,
    32,
    97,
    32,
    116,
    101,
    115,
    116,
    46,
    34,
    44,
    34,
    109,
    115,
    103,
    115,
    34,
    58,
    91,
    123,
    34,
    116,
    121,
    112,
    101,
    34,
    58,
    34,
    99,
    111,
    115,
    109,
    111,
    115,
    45,
    115,
    100,
    107,
    47,
    77,
    115,
    103,
    83,
    101,
    110,
    100,
    34,
    44,
    34,
    118,
    97,
    108,
    117,
    101,
    34,
    58,
    123,
    34,
    97,
    109,
    111,
    117,
    110,
    116,
    34,
    58,
    91,
    123,
    34,
    97,
    109,
    111,
    117,
    110,
    116,
    34,
    58,
    34,
    49,
    48,
    48,
    48,
    48,
    48,
    48,
    34,
    44,
    34,
    100,
    101,
    110,
    111,
    109,
    34,
    58,
    34,
    115,
    116,
    97,
    107,
    101,
    34,
    125,
    93,
    44,
    34,
    102,
    114,
    111,
    109,
    95,
    97,
    100,
    100,
    114,
    101,
    115,
    115,
    34,
    58,
    34,
    99,
    111,
    115,
    109,
    111,
    115,
    49,
    120,
    107,
    113,
    102,
    101,
    121,
    109,
    50,
    101,
    110,
    113,
    97,
    104,
    55,
    109,
    119,
    119,
    119,
    48,
    119,
    121,
    107,
    115,
    120,
    56,
    117,
    53,
    113,
    112,
    108,
    115,
    110,
    115,
    121,
    56,
    110,
    108,
    55,
    34,
    44,
    34,
    116,
    111,
    95,
    97,
    100,
    100,
    114,
    101,
    115,
    115,
    34,
    58,
    34,
    99,
    111,
    115,
    109,
    111,
    115,
    49,
    120,
    107,
    113,
    102,
    101,
    121,
    109,
    50,
    101,
    110,
    113,
    97,
    104,
    55,
    109,
    119,
    119,
    119,
    48,
    119,
    121,
    107,
    115,
    120,
    56,
    117,
    53,
    113,
    112,
    108,
    115,
    110,
    115,
    121,
    56,
    110,
    108,
    55,
    34,
    125,
    125,
    93,
    44,
    34,
    115,
    101,
    113,
    117,
    101,
    110,
    99,
    101,
    34,
    58,
    34,
    48,
    34,
    125
]);

const knownSignature = new Uint8Array([
    205,
    182,
    162,
    109,
    254,
    3,
    135,
    140,
    48,
    51,
    75,
    41,
    109,
    153,
    103,
    81,
    100,
    125,
    152,
    99,
    124,
    31,
    1,
    84,
    171,
    42,
    118,
    244,
    199,
    251,
    98,
    202,
    26,
    210,
    37,
    74,
    81,
    155,
    151,
    173,
    128,
    31,
    76,
    211,
    251,
    166,
    108,
    33,
    50,
    96,
    32,
    167,
    253,
    221,
    162,
    82,
    34,
    138,
    212,
    21,
    183,
    219,
    80,
    35
]);

describe('core', () => {
    describe('createWalletFromMnemonic', () => {
        it('with default password, prefix, and path', () => {
            const wallet = Sig.createWalletFromMnemonic(knownMnemonic);
            expect(wallet.address).toBe(cosmosAddress);
            expect(wallet.privateKey).toBeBytes(cosmosPrivateKey);
            expect(wallet.publicKey).toBeBytes(cosmosPublicKey);
        });

        it.skip('with custom password, default prefix, and default path', () => {
        });

        it('with default password, custom prefix, and custom path', () => {
            const wallet = Sig.createWalletFromMnemonic(knownMnemonic, undefined, customPrefix, customPath);
            expect(wallet.address).toBe(customAddress);
            expect(wallet.privateKey).toBeBytes(customPrivateKey);
            expect(wallet.publicKey).toBeBytes(customPublicKey);
        });
    });

    describe('createMasterKeyFromMnemonic', () => {
        it('with known mnemonic', () => {
            const masterKey = Sig.createMasterKeyFromMnemonic(knownMnemonic);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            expect(masterKey.privateKey!).toBeBytes(knownMasterKey.privateKey!);
            expect(masterKey.publicKey).toBeBytes(knownMasterKey.publicKey);
        });
    });

    describe('createWalletFromMasterKey', () => {
        it('with default prefix and path', () => {
            const wallet = Sig.createWalletFromMasterKey(knownMasterKey);
            expect(wallet.address).toBe(cosmosAddress);
            expect(wallet.privateKey).toBeBytes(cosmosPrivateKey);
            expect(wallet.publicKey).toBeBytes(cosmosPublicKey);
        });

        it('with custom prefix and path', () => {
            const wallet = Sig.createWalletFromMasterKey(knownMasterKey, customPrefix, customPath);
            expect(wallet.address).toBe(customAddress);
            expect(wallet.privateKey).toBeBytes(customPrivateKey);
            expect(wallet.publicKey).toBeBytes(customPublicKey);
        });
    });

    describe('createKeyPairFromMasterKey', () => {
        it('with default path', () => {
            const keyPair = Sig.createKeyPairFromMasterKey(knownMasterKey);
            expect(keyPair.privateKey).toBeBytes(cosmosPrivateKey);
            expect(keyPair.publicKey).toBeBytes(cosmosPublicKey);
        });

        it('with custom path', () => {
            const keyPair = Sig.createKeyPairFromMasterKey(knownMasterKey, customPath);
            expect(keyPair.privateKey).toBeBytes(customPrivateKey);
            expect(keyPair.publicKey).toBeBytes(customPublicKey);
        });
    });

    describe('createAddress', () => {
        it('with default prefix', () => {
            const address = Sig.createAddress(cosmosPublicKey);
            expect(address).toBe(cosmosAddress);
        });

        it('with custom prefix', () => {
            const address = Sig.createAddress(customPublicKey, customPrefix);
            expect(address).toBe(customAddress);
        });
    });

    describe('signTx', () => {
        it('with tx, signMeta, and keyPair', () => {
            const stdTx = Sig.signTx(tx, signMeta, cosmosKeyPair);
            expect(stdTx).toEqual(knownStdTx);
        });

        it.skip('with stdTx, signMeta, and keyPair', () => {

        });
    });

    describe('createSignMsg', () => {
        it('with tx and signMeta', () => {
            const signMsg = Sig.createSignMsg(tx, signMeta);
            expect(signMsg).toEqual(knownSignMsg);
        });
    });

    describe('createSignature', () => {
        it('with signMsg and keyPair', () => {
            const stdSignature = Sig.createSignature(knownSignMsg, cosmosKeyPair);
            expect(stdSignature).toEqual(knownStdSignature);
        });
    });

    describe('createSignatureBytes', () => {
        it('with signMsg and privateKey', () => {
            const signature = Sig.createSignatureBytes(knownSignMsg, cosmosPrivateKey);
            expect(signature).toBeBytes(knownSignature);
        });
    });

    describe('sign', () => {
        it('with bytes and privateKey', () => {
            const signature = Sig.sign(knownBytes, cosmosPrivateKey);
            expect(signature).toBeBytes(knownSignature);
        });
    });

    describe('verifyTx', () => {
        it('with stdTx and signMeta', () => {
            const valid = Sig.verifyTx(knownStdTx, signMeta);
            expect(valid).toBe(true);
        });

        it.skip('with empty signatures', () => {

        });

        it.skip('with invalid signatures', () => {

        });

        it.skip('with non-matching signatures', () => {

        });
    });

    describe('verifySignatures', () => {
        it('with signMsg and signatures', () => {
            const valid = Sig.verifySignatures(knownSignMsg, [knownStdSignature]);
            expect(valid).toBe(true);
        });

        it('with signMsg and empty signatures', () => {
            const valid = Sig.verifySignatures(knownSignMsg, []);
            expect(valid).toBe(false);
        });

        it.skip('with signMsg and invalid signatures', () => {

        });

        it.skip('with signMsg and non-matching signatures', () => {

        });
    });

    describe('verifySignature', () => {
        it('with signMsg and signature', () => {
            const valid = Sig.verifySignature(knownSignMsg, knownStdSignature);
            expect(valid).toBe(true);
        });

        it.skip('with signMsg and invalid signature', () => {

        });

        it.skip('with signMsg and non-matching signature', () => {

        });
    });

    describe('verifySignatureBytes', () => {
        it('with signMsg, signature, and publicKey', () => {
            const valid = Sig.verifySignatureBytes(knownSignMsg, knownSignature, cosmosPublicKey);
            expect(valid).toBe(true);
        });

        it.skip('with signMsg, invalid signature, and publicKey', () => {

        });

        it.skip('with signMsg, signature, and invalid publicKey', () => {

        });
    });

    describe('createBroadcastTx', () => {
        it('with stdTx', () => {
            const broadcastTx = Sig.createBroadcastTx(knownStdTx);
            expect(broadcastTx).toEqual({
                tx:   knownStdTx,
                mode: 'sync'
            });
        });

        it('with stdTx and broadcastMode', () => {
            const broadcastTx = Sig.createBroadcastTx(knownStdTx, 'async');
            expect(broadcastTx).toEqual({
                tx:   knownStdTx,
                mode: 'async'
            });
        });
    });
});
