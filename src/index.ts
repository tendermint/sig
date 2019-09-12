import {
    generateMnemonic,
    mnemonicToSeedSync,
    validateMnemonic
} from 'bip39';

import {
    BIP32Interface,
    fromSeed
} from 'bip32';

import {
    encode as bech32Encode,
    toWords as bech32ToWords
} from 'bech32';

import {
    instantiateRipemd160,
    instantiateSecp256k1,
    instantiateSha256,
    Ripemd160,
    Secp256k1,
    Sha256
} from 'bitcoin-ts';

import {
    Bech32String,
    BroadcastMode,
    BroadcastTx,
    Bytes,
    KeyPair,
    StdSignature,
    StdSignMsg,
    StdTx,
    Tx,
    TxMeta,
    Wallet
} from './types';

export * from './types';

import {
    base64ToBytes,
    bytesToBase64,
    toCanonicalJSONBytes
} from './util';

export * from './util';

/**
 * The core API.
 *
 * Must be asynchronously {@link instantiate|instantiated}.
 */
export interface API {
    /**
     * Create a {@link Wallet|`Wallet`} from a random mnemonic.
     *
     * @param   prefix - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
     * @param   path   - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
     *
     * @returns a keypair and address derived from a random mnemonic
     */
    createWallet (prefix?: string, path?: string): Wallet;

    /**
     * Create a {@link Wallet|`Wallet`} from a known mnemonic.
     *
     * @param   mnemonic - BIP39 mnemonic seed
     * @param   prefix   - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
     * @param   path     - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
     *
     * @returns a keypair and address derived from the provided mnemonic
     * @throws  will throw if the provided mnemonic is invalid
     */
    createWalletFromMnemonic (mnemonic: string, prefix?: string, path?: string): Wallet;

    /**
     * Create a {@link Wallet|`Wallet`} from a BIP32 master key.
     *
     * @param   masterKey - BIP32 master key
     * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
     * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
     *
     * @returns a keypair and address derived from the provided master key
     */
    createWalletFromMasterKey (masterKey: BIP32Interface, prefix?: string, path?: string): Wallet;

    /**
     * Derive a BIP32 master key from a mnemonic.
     *
     * @param   mnemonic - BIP39 mnemonic seed
     *
     * @returns BIP32 master key
     * @throws  will throw if the provided mnemonic is invalid
     */
    createMasterKeyFromMnemonic (mnemonic: string): BIP32Interface;

    /**
     * Derive a keypair from a BIP32 master key.
     *
     * @param   masterKey - BIP32 master key
     * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
     *
     * @returns derived public and private key pair
     * @throws  will throw if a private key cannot be derived
     */
    createKeyPairFromMasterKey (masterKey: BIP32Interface, path?: string): KeyPair;

    /**
     * Derive a Bech32 address from a public key.
     *
     * @param   publicKey - public key bytes
     * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
     *
     * @returns Bech32-encoded address
     */
    createAddress (publicKey: Bytes, prefix?: string): Bech32String;

    /**
     * Sign the sha256 hash of `bytes` with a secp256k1 private key.
     *
     * @param   bytes      - bytes to hash and sign
     * @param   privateKey - private key bytes
     *
     * @returns signed hash of the bytes
     * @throws  will throw if the provided private key is invalid
     */
    sign (bytes: Bytes, privateKey: Bytes): Bytes;

    /**
     * Create signature bytes from a {@link StdSignMsg|`StdSignMsg`}.
     *
     * @param   signMsg    - transaction with metadata for signing
     * @param   privateKey - private key bytes
     *
     * @returns signature bytes
     */
    createSignatureBytes (signMsg: StdSignMsg, privateKey: Bytes): Bytes;

    /**
     * Verify a signature against a {@link StdSignMsg|`StdSignMsg`}.
     *
     * @param   signMsg   - transaction with metadata for signing
     * @param   signature - signature bytes
     * @param   publicKey - public key bytes
     *
     * @returns `true` if the signature is valid and matches, `false` otherwise
     */
    verifySignatureBytes (signMsg: StdSignMsg, signature: Bytes, publicKey: Bytes): boolean;

    /**
     * Create a signature from a {@link StdSignMsg|`StdSignMsg`}.
     *
     * @param   signMsg - transaction with metadata for signing
     * @param   keyPair - public and private key pair (or {@link Wallet|`Wallet`})
     *
     * @returns a signature and corresponding public key
     */
    createSignature (signMsg: StdSignMsg, keyPair: KeyPair): StdSignature;

    /**
     * Verify a {@link StdSignMsg|`StdSignMsg`} against a {@link StdSignature|`StdSignature`}.
     *
     * @param   signMsg   - transaction with metadata for signing
     * @param   signature - signature
     *
     * @returns `true` if the signature is valid and matches, `false` otherwise
     */
    verifySignature (signMsg: StdSignMsg, signature: StdSignature): boolean;

    /**
     * Verify a {@link StdSignMsg|`StdSignMsg`} against multiple {@link StdSignature|`StdSignature`}s.
     *
     * @param   signMsg    - transaction with metadata for signing
     * @param   signatures - signatures
     *
     * @returns `true` if all signatures are valid and match, `false` otherwise or if no signatures were provided
     */
    verifySignatures (signMsg: StdSignMsg, signatures: StdSignature[]): boolean;

    /**
     * Create a transaction with metadata for signing.
     *
     * @param   tx   - unsigned transaction
     * @param   meta - metadata for signing
     *
     * @returns
     */
    createSignMsg (tx: Tx, meta: TxMeta): StdSignMsg;

    /**
     * Sign a transaction.
     *
     * This combines the {@link Tx|`Tx`} and {@link TxMeta|`TxMeta`} into a {@link StdSignMsg|`StdSignMsg`}, signs it,
     * and attaches the signature to the transaction. If the transaction is already signed, the signature will be
     * added to the existing signatures.
     *
     * @param   tx      - transaction (signed or unsigned)
     * @param   meta    - metadata for signing
     * @param   keyPair - public and private key pair (or {@link Wallet|`Wallet`})
     *
     * @returns a signed transaction
     */
    signTx (tx: Tx | StdTx, meta: TxMeta, keyPair: KeyPair): StdTx;

    /**
     * Verify a signed transaction's signatures.
     *
     * @param   tx   - signed transaction
     * @param   meta - metadata for signing
     *
     * @returns `true` if all signatures are valid and match, `false` otherwise or if no signatures were provided
     */
    verifyTx (tx: StdTx, meta: TxMeta): boolean;

    /**
     * Prepare a signed transaction for broadcast.
     *
     * @param   tx   - signed transaction
     * @param   mode - broadcast mode
     *
     * @returns a transaction broadcast
     */
    broadcastTx (tx: StdTx, mode?: BroadcastMode): BroadcastTx;
}

/**
 * Bech32 prefix for Cosmos addresses.
 */
export const COSMOS_PREFIX = 'cosmos';

/**
 * BIP32 derivation path for Cosmos keys.
 */
// @formatter:off
export const COSMOS_PATH = "m/44'/118'/0'/0/0";
// @formatter:on

/**
 * Asynchronously instantiate the core API.
 *
 * This loads WASM interfaces for sha256, ripemd160, and secp256k1 cryptographic functions.
 *
 * @param   randomSeed - a 32-byte random seed used to randomize the secp256k1 context
 *
 * @returns a Promise resolving with the core API
 */
export function instantiate (randomSeed?: Bytes): Promise<API> {
    return Promise.all([
        instantiateSha256(),
        instantiateRipemd160(),
        instantiateSecp256k1(randomSeed)
    ]).then(api);
}

function api ([sha256, ripemd160, secp256k1]: [Sha256, Ripemd160, Secp256k1]): API {
    function createWallet (prefix: string = COSMOS_PREFIX, path: string = COSMOS_PATH): Wallet {
        const mnemonic = generateMnemonic();

        return createWalletFromMnemonic(mnemonic, prefix, path);
    }

    function createWalletFromMnemonic (mnemonic: string, prefix: string = COSMOS_PREFIX, path: string = COSMOS_PATH): Wallet {
        const masterKey = createMasterKeyFromMnemonic(mnemonic);

        return createWalletFromMasterKey(masterKey, prefix, path);
    }

    function createWalletFromMasterKey (masterKey: BIP32Interface, prefix: string = COSMOS_PREFIX, path: string = COSMOS_PATH): Wallet {
        const { privateKey, publicKey } = createKeyPairFromMasterKey(masterKey, path);

        const address = createAddress(publicKey, prefix);

        return {
            address,
            privateKey,
            publicKey
        };
    }

    function createMasterKeyFromMnemonic (mnemonic: string): BIP32Interface {
        if (!validateMnemonic(mnemonic)) {
            throw new Error('invalid mnemonic');
        }

        const seed = mnemonicToSeedSync(mnemonic);

        return fromSeed(seed);
    }

    function createKeyPairFromMasterKey (masterKey: BIP32Interface, path: string = COSMOS_PATH): KeyPair {
        const { privateKey } = masterKey.derivePath(path);
        if (!privateKey) {
            throw new Error('could not derive private key');
        }

        const publicKey = secp256k1.derivePublicKeyCompressed(privateKey);

        return {
            privateKey,
            publicKey
        };
    }

    function createAddress (publicKey: Bytes, prefix: string = COSMOS_PREFIX): Bech32String {
        const hash = ripemd160.hash(sha256.hash(publicKey));

        // bech32.toWords takes a Buffer, which subclasses Uint8Array
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const words = bech32ToWords(hash as any);

        return bech32Encode(prefix, words);
    }

    function sign (bytes: Bytes, privateKey: Bytes): Bytes {
        const hash = sha256.hash(bytes);

        return secp256k1.signMessageHashCompact(privateKey, hash);
    }

    function createSignatureBytes (signMsg: StdSignMsg, privateKey: Bytes): Bytes {
        const bytes = toCanonicalJSONBytes(signMsg);

        return sign(bytes, privateKey);
    }

    function verifySignatureBytes (signMsg: StdSignMsg, signature: Bytes, publicKey: Bytes): boolean {
        const bytes = toCanonicalJSONBytes(signMsg);
        const hash  = sha256.hash(bytes);

        return secp256k1.verifySignatureCompact(signature, publicKey, hash);
    }

    function createSignature (signMsg: StdSignMsg, { privateKey, publicKey }: KeyPair): StdSignature {
        const signatureBytes = createSignatureBytes(signMsg, privateKey);

        return {
            signature: bytesToBase64(signatureBytes),
            pub_key:   {
                type:  'tendermint/PubKeySecp256k1',
                value: bytesToBase64(publicKey)
            }
        };
    }

    function verifySignature (signMsg: StdSignMsg, signature: StdSignature): boolean {
        const signatureBytes = base64ToBytes(signature.signature);
        const publicKey      = base64ToBytes(signature.pub_key.value);

        return verifySignatureBytes(signMsg, signatureBytes, publicKey);
    }

    function verifySignatures (signMsg: StdSignMsg, signatures: StdSignature[]): boolean {
        if (signatures.length > 0) {
            return signatures.every(function (signature: StdSignature): boolean {
                return verifySignature(signMsg, signature);
            });
        }
        else {
            return false;
        }
    }

    function createSignMsg (tx: Tx, meta: TxMeta): StdSignMsg {
        return {
            account_number: meta.account_number,
            chain_id:       meta.chain_id,
            fee:            tx.fee,
            memo:           tx.memo,
            msgs:           tx.msg,
            sequence:       meta.sequence
        };
    }

    function signTx (tx: Tx | StdTx, meta: TxMeta, keyPair: KeyPair): StdTx {
        const signMsg    = createSignMsg(tx, meta);
        const signature  = createSignature(signMsg, keyPair);
        const signatures = ('signatures' in tx) ? [...tx.signatures, signature] : [signature];

        return {
            ...tx,
            signatures
        };
    }

    function verifyTx (tx: StdTx, meta: TxMeta): boolean {
        const signMsg = createSignMsg(tx, meta);

        return verifySignatures(signMsg, tx.signatures);
    }

    function broadcastTx (tx: StdTx, mode: BroadcastMode = 'sync'): BroadcastTx {
        return {
            tx,
            mode
        };
    }

    return {
        createWallet,
        createWalletFromMnemonic,
        createWalletFromMasterKey,
        createMasterKeyFromMnemonic,
        createKeyPairFromMasterKey,
        createAddress,
        sign,
        createSignatureBytes,
        verifySignatureBytes,
        createSignature,
        verifySignature,
        verifySignatures,
        createSignMsg,
        signTx,
        verifyTx,
        broadcastTx
    };
}
