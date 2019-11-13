import * as Sig from '../';

describe('constants', () => {
    describe('COSMOS_PREFIX', () => {
        it("is 'cosmos'", () => {
            expect(Sig.COSMOS_PREFIX).toBe('cosmos');
        });
    });

    describe('COSMOS_PATH', () => {
        it(`is "m/44'/118'/0'/0/0"`, () => {
            expect(Sig.COSMOS_PATH).toBe("m/44'/118'/0'/0/0");
        });
    });

    describe('BROADCAST_MODE_SYNC', () => {
        it("is 'sync'", () => {
            expect(Sig.BROADCAST_MODE_SYNC).toBe('sync');
        });
    });

    describe('BROADCAST_MODE_ASYNC', () => {
        it("is 'async'", () => {
            expect(Sig.BROADCAST_MODE_ASYNC).toBe('async');
        });
    });

    describe('BROADCAST_MODE_BLOCK', () => {
        it("is 'block'", () => {
            expect(Sig.BROADCAST_MODE_BLOCK).toBe('block');
        });
    });
});
