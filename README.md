# Sig

Sig is a signing library for Cosmos, supported in Node.js and browsers.

Sig provides JavaScript functions and TypeScript types for

  - Deriving a wallet (private key, public key, and address) from a mnemonic
  - Deriving an address from a public key
  - Structuring a transaction
  - Signing a transaction
  - Verifying signatures for a transaction
  - Preparing a transaction for broadcast

Sig **does not** provide functions for

  - Generating a mnemonic
  - Storing keys or other secrets
  - Obtaining data from a chain
  - Broadcasting transactions

Sig is designed to work well with other libraries like
  - [`bip39`](https://github.com/bitcoinjs/bip39)
  - [`bip32`](https://github.com/bitcoinjs/bip32)
  - [`@tendermint/amino-js`](https://github.com/cosmos/amino-js)

Sig is experimental and not recommended for use in production yet. Please help us test and improve it!

As always, please be careful to protect any mnemonic phrases, passwords, and private keys.

### Demo

  - [Node.js](https://repl.it/repls/DodgerblueAshamedTest)
  - [Browser](https://jsfiddle.net/pbc6zkeh/)

### Documentation

**https://cosmos.github.io/sig/**

### Install

Please note that the NPM package name is `@tendermint/sig` rather than `@cosmos/sig`.

#### Yarn
```shell
yarn add @tendermint/sig
```

#### NPM
```shell
npm install --save @tendermint/sig
```

### Usage

#### Derive a wallet (private key, public key, and address) from a mnemonic

```typescript
import { createWalletFromMnemonic } from '@tendermint/sig';

const mnemonic = 'trouble salon husband push melody usage fine ensure blade deal miss twin';

const wallet = createWalletFromMnemonic(mnemonic); // BIP39 mnemonic string
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

#### Derive a Bech32 address from a public key

```typescript
import { createAddress } from '@tendermint/sig';

const address = createAddress(publicKey); // Buffer or Uint8Array
// 'cosmos1asm039pzjkkg9ghlvj267p5g3whtxd2t4leg5c'
```

#### Sign a transaction

```typescript
import { signTx } from '@tendermint/sig';

const tx = {
    fee:  {
        amount: [{ amount: '0', denom: '' }],
        gas:    '10000'
    },
    memo: '',
    msg:  [{
        type:  'cosmos-sdk/MsgSend',
        value: {
            from_address: 'cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66',
            to_address:   'cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt',
            amount:       [{ amount: '1', denom: 'STAKE' }]
        }
    }]
};

const signMeta = {
    account_number: '1',
    chain_id:       'cosmos',
    sequence:       '0'
};

const stdTx = signTx(tx, signMeta, wallet); // Wallet or privateKey / publicKey pair; see example above
/*
{
    fee:        {
        amount: [{
            amount: '0',
            denom:  ''
        }],
        gas:    '10000'
    },
    memo:       '',
    msg:        [{
        type:  'cosmos-sdk/MsgSend',
        value: {
            from_address: 'cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66',
            to_address:   'cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt',
            amount:       [{
                amount: '1',
                denom:  'STAKE'
            }]
        }
    }],
    signatures: [{
        signature: 'GLhQW+t36tjJW83avsBz6e7WUpkJyeAsmkrCJsnk/fkfA4q5nIVVwTF5HPQhFdkhMfAVKPFuvDmigRp+VQCwtg==',
        pub_key:   {
            type:  'tendermint/PubKeySecp256k1',
            value: 'A58jKYIwA/eL8nEpyLBJG2boceJQuGuQ2ViXFRa5RBzT'
        }
    }]
}
*/
```

#### Verify a transaction

```typescript
import { verifyTx } from '@tendermint/sig';

const valid = verifyTx(stdTx, signMeta); // signed transaction and metadata; see example above
// true
```

Please see the [documentation](https://cosmos.github.io/sig/) for the full API.

### Building

```shell
git clone https://github.com/cosmos/sig.git
cd sig
yarn install
yarn setup
yarn test
```

### Contributing

Sig is very new! Questions, feedback, use cases, issues, and code are all very, very welcome.

Thank you for helping us help you help us all. 🎁

### Alternatives

A number of other projects exist that help with signing for Cosmos.

Please check them out and see if they are right for you!

- [`@lunie/cosmos-keys`](https://github.com/luniehq/cosmos-keys)
- [`@cosmostation/cosmosjs`](https://github.com/cosmostation/cosmosjs)
- [`@iov/cosmos`](https://github.com/iov-one/iov-core/tree/1220-cosmos-codec/packages/iov-cosmos)
- [`@everett-protocol/cosmosjs`](https://github.com/everett-protocol/cosmosjs)
- [`js-cosmos-wallet`](https://github.com/okwme/js-cosmos-wallet)
- [`cosmos-client-ts`](https://github.com/lcnem/cosmos-client-ts)
- [`lotion`](https://github.com/nomic-io/lotion)
