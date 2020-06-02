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
    const buffer1 = (bytes instanceof Buffer) ? bytes : Buffer.from(bytes);
    const buffer2 = createHash('sha256').update(buffer1).digest();

    return bufferToBytes(buffer2);
}

/**
 * Hash bytes using RIPEMD160.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function ripemd160 (bytes: Bytes): Bytes {
    const buffer1 = (bytes instanceof Buffer) ? bytes : Buffer.from(bytes);
    const buffer2 = createHash('ripemd160').update(buffer1).digest();

    return bufferToBytes(buffer2);
}
