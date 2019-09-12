import { instantiate, API } from '../';

let api: API;

beforeAll(async function (): Promise<void> {
    api = await instantiate();
});

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

const txMeta = {
    account_number: '1',
    chain_id:       'cosmos',
    sequence:       '0'
};

describe('Sig', () => {
    it('creates wallet, signs, and verifies', () => {
        const wallet   = api.createWallet();
        const signedTx = api.signTx(tx, txMeta, wallet);
        const valid    = api.verifyTx(signedTx, txMeta);

        expect(valid).toBe(true);
    });
});
