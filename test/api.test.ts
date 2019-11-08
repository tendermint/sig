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

const customPrefix = 'custom';

const customPath = "m/0'/0/0/0";

const customAddress = 'custom1v2h8z97nqaumf9t8c6fhyal2j6f9s6mugvepc5';

const customPrivateKey = new Uint8Array([
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

const customPublicKey = new Uint8Array([
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
            const address = Sig.createAddress(cosmosPublicKey, customPrefix);
            expect(address).toBe(customAddress);
        });
    });
});
