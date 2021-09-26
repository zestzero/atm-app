# ATM web application

## Installations
- Nodejs
- Yarn
- Docker

## Development
- Install dependencies
```sh
$ yarn install
```
- Start client application
```sh
$ yarn start
```
- Run unit test
```sh
$ yarn test
```
- Run cypress test
```sh
$ yarn cypress:open
```

## Future improvement
- Add web worker to stop UI frozen from recursively execution of [knapsack](https://github.com/zestzero/atm-app/blob/master/src/utils/knapsack.ts).