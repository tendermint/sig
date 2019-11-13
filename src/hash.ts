import createHash from 'create-hash';
import { Bytes } from './types';

/**
 * Hash bytes using SHA256.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function sha256 (bytes: Bytes): Buffer {
    return createHash('sha256').update(bytes).digest();
}

/**
 * Hash bytes using RIPEMD160.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function ripemd160 (bytes: Bytes): Buffer {
    return createHash('ripemd160').update(bytes).digest();
}
