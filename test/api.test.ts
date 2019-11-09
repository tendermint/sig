import { fromSeed } from 'bip32';
import * as Sig from '../src';

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

const knownBytes = new Uint8Array([]);

const knownSignature = new Uint8Array([]);

describe('Sig', () => {
    describe('createWalletFromMnemonic', () => {
        it('with default prefix and path', () => {
            const wallet = Sig.createWalletFromMnemonic(knownMnemonic);
            expect(wallet.address).toBe(cosmosAddress);
            expect(wallet.privateKey).toBeBytes(cosmosPrivateKey);
            expect(wallet.publicKey).toBeBytes(cosmosPublicKey);
        });

        it('with custom prefix and path', () => {
            const wallet = Sig.createWalletFromMnemonic(knownMnemonic, customPrefix, customPath);
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

    describe.skip('createSignatureBytes', () => {
        it.skip('with signMsg and privateKey', () => {

        });
    });

    describe.skip('sign', () => {
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

    describe.skip('verifySignatures', () => {
        it.skip('with signMsg and signatures', () => {

        });

        it.skip('with signMsg and empty signatures', () => {

        });

        it.skip('with signMsg and invalid signatures', () => {

        });

        it.skip('with signMsg and non-matching signatures', () => {

        });
    });

    describe.skip('verifySignature', () => {
        it('with signMsg and signature', () => {
            const valid = Sig.verifySignature(knownSignMsg, knownStdSignature);
            expect(valid).toBe(true);
        });
    });

    describe.skip('verifySignatureBytes', () => {
        it('with signMsg, signature, and publicKey', () => {
            const valid = Sig.verifySignatureBytes(knownSignMsg, knownSignature, cosmosPublicKey);
            expect(valid).toBe(true);
        });

        it.skip('with invalid signature', () => {

        });

        it.skip('with invalid publicKey', () => {

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
