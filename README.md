Buy me a chicory coffee: https://boosty.to/ivan_8observer8/donate This service supports PayPal.

Playgrounds:

- Replit: https://replit.com/@8Observer8/Debug-drawer-for-Box2D-WASM-using-Melonjs-and-JS
- Plunker: https://plnkr.co/edit/FPE7qRMIWhAhK5M1?preview
- Glitch: https://glitch.com/edit/#!/sudsy-outstanding-marble

[gif-animation](https://user-images.githubusercontent.com/3908473/254252191-646cb808-909c-4a1a-9312-b5454f6f2847.gif)

Instruction for building and running the project in debug and release using Rollup:

- Install these packages globally with the command:

> npm i -g http-server rollup uglify-js

- Run http-server in the project directory:

> http-server -c-1

Note. The `-c-1` key allows you to disable caching.

- Start development mode with the following command:

> npm run dev

Note. Rollup will automatically keep track of saving changes to files and build a new index.js file ready for debugging. You can debug your project step by step in the browser by setting breakpoints.

- Go to the browser and type the address: localhost:8080/index.html

- Create a compressed file ready for publishing. Stop development mode, for example, with this command Ctrl + C in CMD, if it was launched before and enter the command:

> npm run release

Note. After this command, Rollup will create a compressed index.js file. Compression is done using the uglify-js package.
