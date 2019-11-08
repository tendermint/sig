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

@TODO: expand to show the full API

```typescript
import { createWalletFromMnemonic, signTx, verifyTx } from '@tendermint/sig';

const tx = {
    fee:  {
        amount: [{
            amount: '0',
            denom:  ''
        }],
        gas:    '10000'
    },
    memo: '',
    msgs: [{
        type:  'cosmos-sdk/Send',
        value: {
            inputs:  [{
                address: 'cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66',
                coins:   [{
                    amount: '1',
                    denom:  'STAKE'
                }]
            }],
            outputs: [{
                address: 'cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt',
                coins:   [{
                    amount: '1',
                    denom:  'STAKE'
                }]
            }]
        }
    }]
};

const signMeta = {
    account_number: '1',
    chain_id:       'cosmos',
    sequence:       '0'
};

const mnemonic = 'trouble salon husband push melody usage fine ensure blade deal miss twin';
const wallet   = createWalletFromMnemonic(mnemonic);
const stdTx    = signTx(tx, signMeta, wallet);
const isValid  = verifyTx(stdTx, signMeta);
```

### Contributing

`sig` is very new! Questions, feedback, use cases, issues, and code are all very, very welcome.

Thank you for helping us help you help us all. 🎁
