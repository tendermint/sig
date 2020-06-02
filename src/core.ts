import {
    base64ToBytes,
    bufferToBytes,
    bytesToBase64,
    toCanonicalJSONBytes
} from '@tendermint/belt';

import {
    Bech32String,
    Bytes
} from '@tendermint/types';

import {
    encode as bech32Encode,
    toWords as bech32ToWords
} from 'bech32';

import {
    BIP32Interface,
    fromSeed as bip32FromSeed
} from 'bip32';

import { mnemonicToSeedSync as bip39MnemonicToSeed } from 'bip39';

import {
    publicKeyCreate as secp256k1PublicKeyCreate,
    ecdsaSign as secp256k1EcdsaSign,
    ecdsaVerify as secp256k1EcdsaVerify
} from 'secp256k1';

import {
    COSMOS_PREFIX,
    COSMOS_PATH,
    BROADCAST_MODE_SYNC
} from './constants';

import {
    ripemd160,
    sha256
} from './hash';

import {
    BroadcastMode,
    BroadcastTx,
    KeyPair,
    StdSignature,
    StdSignMsg,
    StdTx,
    Tx,
    SignMeta,
    Wallet
} from './types';

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
export function createWalletFromMnemonic (mnemonic: string, prefix: string = COSMOS_PREFIX, path: string = COSMOS_PATH): Wallet {
    const masterKey = createMasterKeyFromMnemonic(mnemonic);

    return createWalletFromMasterKey(masterKey, prefix, path);
}

/**
 * Derive a BIP32 master key from a mnemonic.
 *
 * @param   mnemonic - BIP39 mnemonic seed
 *
 * @returns BIP32 master key
 * @throws  will throw if the provided mnemonic is invalid
 */
export function createMasterKeyFromMnemonic (mnemonic: string): BIP32Interface {
    const seed = bip39MnemonicToSeed(mnemonic);

    return bip32FromSeed(seed);
}

/**
 * Create a {@link Wallet|`Wallet`} from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
 * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
 *
 * @returns a keypair and address derived from the provided master key
 */
export function createWalletFromMasterKey (masterKey: BIP32Interface, prefix: string = COSMOS_PREFIX, path: string = COSMOS_PATH): Wallet {
    const { privateKey, publicKey } = createKeyPairFromMasterKey(masterKey, path);

    const address = createAddress(publicKey, prefix);

    return {
        privateKey,
        publicKey,
        address
    };
}

/**
 * Derive a keypair from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
 *
 * @returns derived public and private key pair
 * @throws  will throw if a private key cannot be derived
 */
export function createKeyPairFromMasterKey (masterKey: BIP32Interface, path: string = COSMOS_PATH): KeyPair {
    const buffer = masterKey.derivePath(path).privateKey;
    if (!buffer) {
        throw new Error('could not derive private key');
    }

    const privateKey = bufferToBytes(buffer);
    const publicKey  = secp256k1PublicKeyCreate(privateKey, true);

    return {
        privateKey,
        publicKey
    };
}

/**
 * Derive a Bech32 address from a public key.
 *
 * @param   publicKey - public key bytes
 * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
 *
 * @returns Bech32-encoded address
 */
export function createAddress (publicKey: Bytes, prefix: string = COSMOS_PREFIX): Bech32String {
    const hash1 = sha256(publicKey);
    const hash2 = ripemd160(hash1);
    const words = bech32ToWords(hash2);

    return bech32Encode(prefix, words);
}

/**
 * Sign a transaction.
 *
 * This combines the {@link Tx|`Tx`} and {@link SignMeta|`SignMeta`} into a {@link StdSignMsg|`StdSignMsg`}, signs it,
 * and attaches the signature to the transaction. If the transaction is already signed, the signature will be
 * added to the existing signatures.
 *
 * @param   tx      - transaction (signed or unsigned)
 * @param   meta    - metadata for signing
 * @param   keyPair - public and private key pair (or {@link Wallet|`Wallet`})
 *
 * @returns a signed transaction
 */
export function signTx (tx: Tx | StdTx, meta: SignMeta, keyPair: KeyPair): StdTx {
    const signMsg    = createSignMsg(tx, meta);
    const signature  = createSignature(signMsg, keyPair);
    const signatures = (('signatures' in tx) && (tx.signatures != null)) ? [...tx.signatures, signature] : [signature];

    return {
        ...tx,
        signatures
    };
}

/**
 * Create a transaction with metadata for signing.
 *
 * @param   tx   - unsigned transaction
 * @param   meta - metadata for signing
 *
 * @returns a transaction with metadata for signing
 */
export function createSignMsg (tx: Tx, meta: SignMeta): StdSignMsg {
    return {
        account_number: meta.account_number,
        chain_id:       meta.chain_id,
        fee:            tx.fee,
        memo:           tx.memo,
        msgs:           tx.msg,
        sequence:       meta.sequence
    };
}

/**
 * Create a signature from a {@link StdSignMsg|`StdSignMsg`}.
 *
 * @param   signMsg - transaction with metadata for signing
 * @param   keyPair - public and private key pair (or {@link Wallet|`Wallet`})
 *
 * @returns a signature and corresponding public key
 */
export function createSignature (signMsg: StdSignMsg, { privateKey, publicKey }: KeyPair): StdSignature {
    const signatureBytes = createSignatureBytes(signMsg, privateKey);

    return {
        signature: bytesToBase64(signatureBytes),
        pub_key:   {
            type:  'tendermint/PubKeySecp256k1',
            value: bytesToBase64(publicKey)
        }
    };
}

/**
 * Create signature bytes from a {@link StdSignMsg|`StdSignMsg`}.
 *
 * @param   signMsg    - transaction with metadata for signing
 * @param   privateKey - private key bytes
 *
 * @returns signature bytes
 */
export function createSignatureBytes (signMsg: StdSignMsg, privateKey: Bytes): Bytes {
    const bytes = toCanonicalJSONBytes(signMsg);

    return sign(bytes, privateKey);
}

/**
 * Sign the sha256 hash of `bytes` with a secp256k1 private key.
 *
 * @param   bytes      - bytes to hash and sign
 * @param   privateKey - private key bytes
 *
 * @returns signed hash of the bytes
 * @throws  will throw if the provided private key is invalid
 */
export function sign (bytes: Bytes, privateKey: Bytes): Bytes {
    const hash = sha256(bytes);

    const { signature } = secp256k1EcdsaSign(hash, privateKey);

    return signature;
}

/**
 * Verify a signed transaction's signatures.
 *
 * @param   tx   - signed transaction
 * @param   meta - metadata for signing
 *
 * @returns `true` if all signatures are valid and match, `false` otherwise or if no signatures were provided
 */
export function verifyTx (tx: StdTx, meta: SignMeta): boolean {
    const signMsg = createSignMsg(tx, meta);

    return verifySignatures(signMsg, tx.signatures);
}

/**
 * Verify a {@link StdSignMsg|`StdSignMsg`} against multiple {@link StdSignature|`StdSignature`}s.
 *
 * @param   signMsg    - transaction with metadata for signing
 * @param   signatures - signatures
 *
 * @returns `true` if all signatures are valid and match, `false` otherwise or if no signatures were provided
 */
export function verifySignatures (signMsg: StdSignMsg, signatures: StdSignature[]): boolean {
    if (signatures.length > 0) {
        return signatures.every(function (signature: StdSignature): boolean {
            return verifySignature(signMsg, signature);
        });
    }
    else {
        return false;
    }
}

/**
 * Verify a {@link StdSignMsg|`StdSignMsg`} against a {@link StdSignature|`StdSignature`}.
 *
 * @param   signMsg   - transaction with metadata for signing
 * @param   signature - signature
 *
 * @returns `true` if the signature is valid and matches, `false` otherwise
 */
export function verifySignature (signMsg: StdSignMsg, signature: StdSignature): boolean {
    const signatureBytes = base64ToBytes(signature.signature);
    const publicKey      = base64ToBytes(signature.pub_key.value);

    return verifySignatureBytes(signMsg, signatureBytes, publicKey);
}

/**
 * Verify a signature against a {@link StdSignMsg|`StdSignMsg`}.
 *
 * @param   signMsg   - transaction with metadata for signing
 * @param   signature - signature bytes
 * @param   publicKey - public key bytes
 *
 * @returns `true` if the signature is valid and matches, `false` otherwise
 */
export function verifySignatureBytes (signMsg: StdSignMsg, signature: Bytes, publicKey: Bytes): boolean {
    const bytes = toCanonicalJSONBytes(signMsg);
    const hash  = sha256(bytes);

    return secp256k1EcdsaVerify(signature, hash, publicKey);
}

/**
 * Prepare a signed transaction for broadcast.
 *
 * @param   tx   - signed transaction
 * @param   mode - broadcast mode
 *
 * @returns a transaction broadcast
 */
export function createBroadcastTx (tx: StdTx, mode: BroadcastMode = BROADCAST_MODE_SYNC): BroadcastTx {
    return {
        tx,
        mode
    };
}
