import * as Sig from '../src';

const tx = {
    'msg':  [
        {
            'type':  'cosmos-sdk/MsgSend',
            'value': {
                'from_address': 'cosmos1ek9cd8ewgxg9w5xllq9um0uf4aaxaruvcw4v9e',
                'to_address':   'cosmos16fx9h80tjqdlu5q3wktzvmap5r6ctw03myypaq',
                'amount':       [
                    {
                        'denom':  'stake',
                        'amount': '10000000'
                    }
                ]
            }
        }
    ],
    'fee':  {
        'amount': [
            {
                'denom':  'stake',
                'amount': '40'
            }
        ],
        'gas':    '40038'
    },
    'memo': '(Sent via Lunie)'
};

const signMeta = {
    account_number: '1',
    chain_id:       'cosmos',
    sequence:       '0'
};

describe('Sig', () => {
    it('creates wallet, signs, and verifies', () => {
        const mnemonic = 'trouble salon husband push melody usage fine ensure blade deal miss twin';
        const wallet   = Sig.createWalletFromMnemonic(mnemonic);
        const signedTx = Sig.signTx(tx, signMeta, wallet);
        const valid    = Sig.verifyTx(signedTx, signMeta);

        expect(valid).toBe(true);
    });
});
