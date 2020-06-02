import { bufferToBytes } from '@tendermint/belt';
import { Bytes } from '@tendermint/types';
import createHash from 'create-hash';

/**
 * Hash bytes using SHA256.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function sha256 (bytes: Bytes): Bytes {
    const buffer = createHash('sha256').update(bytes).digest();

    return bufferToBytes(buffer);
}

/**
 * Hash bytes using RIPEMD160.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function ripemd160 (bytes: Bytes): Bytes {
    const buffer = createHash('ripemd160').update(bytes).digest();

    return bufferToBytes(buffer);
}
