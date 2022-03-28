

# Pokedex App  

This is a react native app where you can find pokemons and see more details about them such as moves, height, species, etc.
The app shows any pokemon from any region.

## Time
![Time of development](https://github.com/WRCrys/pokedex/blob/main/time.png)

  

## Technologies and libraries

 - [React Native](https://reactjs.org/)
	 - Typescript
 - [Redux Toolkit](https://redux-toolkit.js.org/)
 - [Ant Design](https://rn.mobile.ant.design/)
 - [React Native Paper](https://callstack.github.io/react-native-paper/index.html)
 - [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
 - [React Navigation](https://reactnavigation.org/)

## Dependecies

- NodeJs (lasted version LTS)
- npm or yarn
- Android Studio
- Java
- [Server App Pokedex - GitHub](https://github.com/WRCrys/server-app-pokedex)

## Run

Run this project is pretty simple, you have to install dependencies above, clone the server called [Server App Pokedex - GitHub](https://github.com/WRCrys/server-app-pokedex) to help you with login and run some commands.

First command will download all packages from your `package.json`

    npm install

or

    yarn install

Before you start app, you must run the server app pokedex.
Run server is pretty simple, you just need this commands

    npm run db
or

    yarn run db

This command will start json server, after start server you will need start ngrok for app to reach server.
For this step you will need to create an account in ngrock and register your device, it is pretty simple. After run commands below, ngrok will teach you how can you do that.

    npm run tunnel
or

    yarn run tunnel

### Pay Attention
You have pay attention on link provided from ngrok.
Probably ngrok will provide a different link.
Copy this link and update the file link inside the src folder:

    services/api.ts

There are two axios instaces, you will update first instance.


### Finally
Finally, you are able to start the application, then run:

For android device:

    npx react-native run-android
For ios device

    npx react-native run-ios
   
For enjoy app you have to use this credentials:

email: ashketchum@gmail.com
password: Pikachu


###  Thank You! 😁
  
