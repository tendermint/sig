import { Bytes, JSONValue } from './types';

import { isObject, stringToBytes } from './util';

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
export function toCanonicalJSON (value: any): any {
    if (isObject(value)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sorted = {} as { [key: string]: any };
        const keys   = Object.keys(value).sort();

        for (const key of keys) {
            const keyValue = value[key];
            if (keyValue != null) {
                sorted[key] = toCanonicalJSON(keyValue);
            }
        }

        return sorted;
    }

    if (Array.isArray(value)) {
        return value.map(toCanonicalJSON);
    }

    return (value === undefined) ? null : value;
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
export function toCanonicalJSONClone (value: any): JSONValue {
    const string = toCanonicalJSONString(value);
    return JSON.parse(string);
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
    const json = toCanonicalJSON(value);
    return JSON.stringify(json);
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
    const string = toCanonicalJSONString(value);
    return stringToBytes(string);
}
