/**
 * A `Uint8Array` of binary data
 */
export type Bytes = Uint8Array;

/**
 * A Base64-encoded string.
 */
export type Base64String = string;

/**
 * A Bech32-encoded string.
 */
export type Bech32String = string;

/**
 * A "raw" binary-encoded string.
 */
export type BinaryString = string;

/**
 * A JSON-encoded string.
 */
export type JSONString = string;

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
 * A transaction with metadata for signing.
 *
 * Essentially the union of {@link Tx|`Tx`} and {@link TxMeta|`TxMeta`} with slightly different fields (`msg` / `msgs`).
 */
export interface StdSignMsg {
    account_number: string;
    chain_id: string;
    fee: StdFee;
    memo: string;
    msgs: Msg[];
    sequence: string;
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
 * Metadata for signing a transaction.
 */
export interface TxMeta {
    account_number: string;
    chain_id: string;
    sequence: string;
}

/**
 * A signed transaction.
 */
export interface StdTx extends Tx {
    signatures: StdSignature[];
}

/**
 * A transaction broadcast mode.
 */
export type BroadcastMode = 'sync' | 'async' | 'block';

/**
 * A signed transaction for broadcasting.
 */

// the broadcast body consists of the signed tx and a return type
// returnType can be block (inclusion in block), async (right away), sync (after checkTx has passed)
export interface BroadcastTx {
    tx: StdTx;
    mode: BroadcastMode;
}

/**
 * A JSON object.
 */
export interface JSONObject {
    [key: string]: JSONValue;
}

/**
 * A JSON array.
 */
export interface JSONArray extends Array<JSONValue> {
}

/**
 * A JSON value.
 */
export type JSONValue =
    string |
    number |
    boolean |
    null |
    JSONArray |
    JSONObject;
