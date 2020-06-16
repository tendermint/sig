import './setup';
import * as Sig from '../';

const mnemonic = 'supreme enter index swallow path achieve annual picnic quantum reason theme wisdom';

const tx = {
    'msg':        [{
        'type':  'dither/CreatePost',
        'value': {
            'creator':    'cosmos18cd5t4msvp2lpuvh99rwglrmjrrw9qx5h3f3gz',
            'body':       'foo',
            'likes':      null,
            'channel_id': '8cfbc3f6-c080-4a3f-a149-5dffb5465cb2'
        }
    }],
    'fee':        {
        'amount': [],
        'gas':    '200000'
    },
    'signatures': null,
    'memo':       ''
};

const signMeta = {
    account_number: '6',
    chain_id:       'dither',
    sequence:       '0'
};

const knownStdSignature = {
    signature: '541HQBWQpuGxHAWgzM6y8lauYqnbGatYxjTBGePl2ZIfFfvXAkP6vF9b7e2oW83HTAyeCkaS313JRRU/1ztUog==',
    pub_key:   {
        type:  'tendermint/PubKeySecp256k1',
        value: 'A5lfll1RiMbiBRmCkuP5PjehJez6Lymko3/nohbZCYGs'
    }
};

const knownStdTx = {
    ...tx,
    signatures: [knownStdSignature]
};

describe('dither', () => {
    it('signs and verifies', () => {
        const wallet = Sig.createWalletFromMnemonic(mnemonic);

        const stdTx = Sig.signTx(tx, signMeta, wallet);

        expect(stdTx).toEqual(knownStdTx);

        const valid = Sig.verifyTx(stdTx, signMeta);

        expect(valid).toBe(true);
    });
});
