import jest from 'jest';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R, T> {
            toBeBytes (bytes: Uint8Array | number[]): R;
        }
    }
}

expect.extend({
    toBeBytes (received: Uint8Array, expected: Uint8Array | number[]): jest.CustomMatcherResult {
        if (!(received instanceof Uint8Array)) {
            return {
                message: () => `expected ${ received } to be a Uint8Array`,
                pass:    false
            };
        }

        if (received.length !== expected.length) {
            return {
                message: () => `expected ${ expected.length } bytes, received ${ received.length } bytes`,
                pass:    false
            };
        }

        for (let i = 0; i < received.length; i++) {
            if (received[i] !== expected[i]) {
                return {
                    message: () => `expected byte at index ${ i } to be ${ expected[i] }, received ${ received[i] }`,
                    pass:    false
                };
            }
        }

        return {
            message: () => `expected ${ received } to be ${ expected }`,
            pass:    true
        };
    }
});
