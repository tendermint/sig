import { Base64String, BinaryString, Bytes, JSONValue } from './types';

let TextDecoder: { new (): { decode (bytes: Bytes): string } };
let TextEncoder: { new (): { encode (string: string): Bytes } };
let atob: (base64: Base64String) => BinaryString;
let btoa: (binary: BinaryString) => Base64String;

if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    ({ TextDecoder, TextEncoder } = require('util'));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Buffer } = require('buffer');

    atob = function (base64: Base64String): BinaryString {
        return Buffer.from(base64, 'base64').toString('binary');
    };
    btoa = function (binary: BinaryString): Base64String {
        return Buffer.from(binary, 'binary').toString('base64');
    };
}
else {
    ({ atob, btoa, TextDecoder, TextEncoder } = window);
}

const decoder = new TextDecoder;
const encoder = new TextEncoder;

/**
 * Decode bytes from Base64.
 *
 * @param   base64 - string to decode
 *
 * @returns bytes from Base64-encoded string
 */
export function base64ToBytes (base64: Base64String): Bytes {
    const binary = atob(base64);
    const length = binary.length;
    const bytes  = new Uint8Array(new ArrayBuffer(length));

    for (let i = 0; i < length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

/**
 * Encode bytes as Base64.
 *
 * @param   bytes - bytes to encode
 *
 * @returns Base64-encoded string from bytes
 */
export function bytesToBase64 (bytes: Bytes): Base64String {
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
}

/**
 * Decode a string from bytes.
 *
 * @param   bytes - bytes to decode as a string
 *
 * @returns string decoded from bytes
 * @throws  will throw if decoding fails
 */
export function bytesToString (bytes: Bytes): string {
    return decoder.decode(bytes);
}

/**
 * Encode a string as bytes.
 *
 * @param   string - string to encode as bytes
 *
 * @returns bytes encoded from string
 * @throws  will throw if encoding fails
 */
export function stringToBytes (string: string): Bytes {
    return encoder.encode(string);
}

/**
 * Canonicalize JSON for signing, encode it as a string, then decode the string as JSON.
 *
 * @param   value - JSON value
 *
 * @returns the canonical JSON
 * @throws  will throw if encoding or decoding fails
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toCanonicalJSON (value: any): JSONValue {
    return JSON.parse(toCanonicalJSONString(value));
}

/**
 * Canonicalize JSON for signing, then encode it as a string.
 *
 * @param   value - JSON value
 *
 * @returns the canonical JSON string
 * @throws  will throw if encoding fails
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toCanonicalJSONString (value: any): string {
    return JSON.stringify(canonicalizeJSON(value));
}

/**
 * Canonicalize JSON for signing, encode it as a string, then encode the string as bytes.
 *
 * @param   value - JSON value
 *
 * @returns the canonical JSON bytes
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toCanonicalJSONBytes (value: any): Bytes {
    return stringToBytes(toCanonicalJSONString(value));
}

/**
 * Check if a value is a plain object.
 *
 * @param   value - value to check
 *
 * @returns `true` if the value is a plain object, `false` otherwise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject (value: any): boolean {
    return (Object.prototype.toString.call(value) === '[object Object]');
}

/**
 * Canonicalize JSON for signing.
 *
 * This recursively sorts objects by key, removing any keys with `null` or `undefined` values, and replaces other
 * `undefined` values with `null`.
 *
 * @param   value - any value (but usually a JSON object)
 *
 * @returns canonical JSON
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function canonicalizeJSON (value: any): any {
    if (isObject(value)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sorted = {} as { [key: string]: any };
        const keys   = Object.keys(value).sort();

        for (const key of keys) {
            const keyValue = value[key];
            if (keyValue != null) {
                sorted[key] = canonicalizeJSON(keyValue);
            }
        }

        return sorted;
    }

    if (Array.isArray(value)) {
        return value.map(canonicalizeJSON);
    }

    return (value === undefined) ? null : value;
}

/**
 * Wrap arguments in an array. If only one argument is provided:
 *
 * - if it's `null` or `undefined`, return an empty array
 * - if it's an array, return a copy of it
 * - otherwise, return a new array containing it
 *
 * @param   first - first argument
 * @param   rest  - other arguments
 *
 * @returns an array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrayWrap (first: any, ...rest: any[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let array: any[];
    if (arguments.length > 1) {
        array = [first, ...rest];
    }
    else if (first == null) {
        array = [];
    }
    else if (Array.isArray(first)) {
        array = [...first];
    }
    else {
        array = [first];
    }
    return array;
}
