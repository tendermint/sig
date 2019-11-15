import { Base64String, Bech32String, Bytes } from '@tendermint/types';

/**
 * A private and public key pair.
 */
export interface KeyPair {
    privateKey: Bytes;
    publicKey: Bytes;
}

/**
 * A {@link KeyPair|`KeyPair`} with a Bech32-encoded address derived from the public key.
 */
export interface Wallet extends KeyPair {
    address: Bech32String;
}

/**
 * A transaction message.
 */
export interface Msg {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

/**
 * A denominated amount.
 */
export interface Coin {
    denom: string;
    amount: string;
}

/**
 * A fee for a transaction.
 */
export interface StdFee {
    amount: Coin[];
    gas: string;
}

/**
 * Metadata for signing a transaction.
 */
export interface SignMeta {
    account_number: string;
    chain_id: string;
    sequence: string;
}

/**
 * A transaction with metadata for signing.
 */
export interface StdSignMsg extends SignMeta {
    fee: StdFee;
    memo: string;
    msgs: Msg[];
}

/**
 * A public key.
 */
export interface PubKey {
    type: string;
    value: Base64String;
}

/**
 * A signature and corresponding public key.
 */
export interface StdSignature {
    signature: Base64String;
    pub_key: PubKey;
}

/**
 * An unsigned transaction.
 */
export interface Tx {
    msg: Msg[];
    fee: StdFee;
    memo: string;
}

/**
 * A signed transaction.
 */
export interface StdTx extends Tx {
    signatures: StdSignature[];
}

/**
 * A transaction broadcast mode.
 *
 * - `'sync'`  defines a transaction broadcasting mode where the client returns immediately.
 * - `'async'` defines a transaction broadcasting mode where the client waits for a `CheckTx` execution response only.
 * - `'block'` defines a transaction broadcasting mode where the client waits for the transaction to be committed in a block.
 */
export type BroadcastMode = 'sync' | 'async' | 'block';

/**
 * A signed transaction with a mode for broadcast.
 */
export interface BroadcastTx {
    tx: StdTx;
    mode: BroadcastMode;
}
