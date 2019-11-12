# `sig`

**EXPERIMENTAL. DO NOT USE THIS YET.**

A signing library for Cosmos.

Supported in Node.js and browsers.

### Demo

@TODO: add demo links

### Documentation

**https://cosmos.github.io/sig/**

### Install

Please note that the NPM package name is `@tendermint/sig` rather than `@cosmos/sig`.

##### Yarn
```shell
yarn add @tendermint/sig
```

##### NPM
```shell
npm install --save @tendermint/sig
```

### Usage

##### Derive a wallet (private key, public key, and address) from a mnemonic

```typescript
import { createWalletFromMnemonic } from '@tendermint/sig';

const mnemonic = 'trouble salon husband push melody usage fine ensure blade deal miss twin';

const wallet = createWalletFromMnemonic(mnemonic);
/*
{
    address:    'cosmos1asm039pzjkkg9ghlvj267p5g3whtxd2t4leg5c',
    privateKey: Uint8Array [
        202,  60, 140, 106, 178, 180,  60,   1,
        186,  68, 206, 224, 207, 179,  79,  81,
        119,  98,  98,   1, 207, 170, 209, 161,
          1, 124, 151, 236, 205, 151,   3, 229
    ],
    publicKey:  Uint8Array [
          3, 159,  35,  41, 130,  48,   3, 247,
        139, 242, 113,  41, 200, 176,  73,  27,
        102, 232, 113, 226,  80, 184, 107, 144,
        217,  88, 151,  21,  22, 185,  68,  28,
        211
    ]
}
*/
```

##### Derive an address from a public key

```typescript
import { createAddress } from '@tendermint/sig';

const publicKey = new Uint8Array([
      3, 159,  35,  41, 130,  48,   3, 247,
    139, 242, 113,  41, 200, 176,  73,  27,
    102, 232, 113, 226,  80, 184, 107, 144,
    217,  88, 151,  21,  22, 185,  68,  28,
    211
]);

const address = createAddress(publicKey);
// 'cosmos1asm039pzjkkg9ghlvj267p5g3whtxd2t4leg5c'
```

##### Sign a transaction

```typescript
import { signTx } from '@tendermint/sig';

const tx = {
    fee:  {
        amount: [{ amount: '0', denom: '' }],
        gas:    '10000'
    },
    memo: '',
    msgs: [{
        type:  'cosmos-sdk/Send',
        value: {
            inputs:  [{
                address: 'cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66',
                coins:   [{ amount: '1', denom: 'STAKE' }]
            }],
            outputs: [{
                address: 'cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt',
                coins:   [{  amount: '1', denom: 'STAKE' }]
            }]
        }
    }]
};

const signMeta = {
    account_number: '1',
    chain_id:       'cosmos',
    sequence:       '0'
};

const wallet = {
    address:    'cosmos1asm039pzjkkg9ghlvj267p5g3whtxd2t4leg5c',
    privateKey: new Uint8Array([
        202,  60, 140, 106, 178, 180,  60,   1,
        186,  68, 206, 224, 207, 179,  79,  81,
        119,  98,  98,   1, 207, 170, 209, 161,
          1, 124, 151, 236, 205, 151,   3, 229
    ]),
    publicKey:  new Uint8Array([
          3, 159,  35,  41, 130,  48,   3, 247,
        139, 242, 113,  41, 200, 176,  73,  27,
        102, 232, 113, 226,  80, 184, 107, 144,
        217,  88, 151,  21,  22, 185,  68,  28,
        211
    ])
};

const stdTx = signTx(tx, signMeta, wallet);
/*
{
    fee:        { amount: [{ amount: '0', denom: '' }], gas: '10000' },
    memo:       '',
    msgs:       [{
        type:  'cosmos-sdk/Send',
        value: {
            inputs:  [{
                'address': 'cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66',
                'coins':   [{ amount: '1', denom: 'STAKE' }]
            }],
            outputs: [{
                address: 'cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt',
                coins:   [{ amount: '1', denom: 'STAKE' }]
            }]
        }
    }],
    signatures: [{
        signature: 'uwQQzsubfzk/EwedKbZI/IDiXru5M6GuEBA2DZ+U7LVBwO80MFhU6ULA/5yjT8F0Bdx113VzS/GtbntazzNPwQ==',
        pub_key:   { type: 'tendermint/PubKeySecp256k1', value: 'A58jKYIwA/eL8nEpyLBJG2boceJQuGuQ2ViXFRa5RBzT' }
    }]
}
*/
```

##### Verify a transaction

```typescript
import { verifyTx } from '@tendermint/sig';

const stdTx = {
    fee:        { amount: [{ amount: '0', denom: '' }], gas: '10000' },
    memo:       '',
    msgs:       [{
        type:  'cosmos-sdk/Send',
        value: {
            inputs:  [{
                'address': 'cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66',
                'coins':   [{ amount: '1', denom: 'STAKE' }]
            }],
            outputs: [{
                address: 'cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt',
                coins:   [{ amount: '1', denom: 'STAKE' }]
            }]
        }
    }],
    signatures: [{
        signature: 'uwQQzsubfzk/EwedKbZI/IDiXru5M6GuEBA2DZ+U7LVBwO80MFhU6ULA/5yjT8F0Bdx113VzS/GtbntazzNPwQ==',
        pub_key:   { type: 'tendermint/PubKeySecp256k1', value: 'A58jKYIwA/eL8nEpyLBJG2boceJQuGuQ2ViXFRa5RBzT' }
    }]
};

const signMeta = {
    account_number: '1',
    chain_id:       'cosmos',
    sequence:       '0'
};

const valid = verifyTx(stdTx, signMeta);
// true
```

Please see the [documentation](https://cosmos.github.io/sig/) for the full API.

### Contributing

`sig` is very new! Questions, feedback, use cases, issues, and code are all very, very welcome.

Thank you for helping us help you help us all. 🎁
