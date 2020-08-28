# Extension For Chrome

> BlockChain Passbook

## Project Struct

```textarea
--+ root
-----+ build                                  // Build root
-------+ Release                              // publish zip
-----+ ci                                     // ci scripts
-------- secret.env.js                        // project ignore file,store personal  data js
-------- webpack.*.js                         // webpack config
-------- utils.js
-------- **
-----+ config                                 // project source config
-------- index.js
-------- paths.js
-------- wrapper.env.js                       // tiny wrap env
-----+ dist                                   //
-----+ docs                                   // develop & api documnets
-----+ src
-------+ app                                  // App root
---------- **/*                               // views widgets ...
-------+ assets                               // common assets ,icons,svgs ,font ...
---------- icons                              //
---------- **
-------+ corejs                               // common js
---------- helper
---------- infura
---------- network
---------- web3js
-------+ popup                                // popup page root
---------- **/*                               // views widgets layouts ...
-------+ plugins                              // common plugins
---------- **/*                               // vuetify,i18n
-------+ store                                // vuex
-------+ styles                               // global scss
```

## Test
