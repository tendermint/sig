import { Base64String, BinaryString, Bytes } from './types';

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
