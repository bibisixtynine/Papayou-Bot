//=======================================================
//
// index.ts
// 30 novembre 12:42
//

import './style.css';

import firebase from 'firebase/app';
import 'firebase/database';

import { Bot, UUID } from './libs/utils';

//=======================================================
//
// Initialize the chatbot
//
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Bibil Botoipi is ready !</h1>`;

let bot = new Bot('🤖');
bot.sayHello();
bot.say('🤩 so nice man 😍!');
bot.say('💪🏻great 🥳');
bot.say(`${UUID()}🥇`);
//
//=======================================================

// console.log('#Bibil: Bot is READY')

//=======================================================
//
// FIREBASE 8
//
// 1. init
const firebaseConfig = {
  databaseURL:
    'https://my-papayou-2-default-rtdb.europe-west1.firebasedatabase.app/',
};
//
// 2. Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
//

//
// 3. Add a record de the db
//
// 3.1 writeData, the write function !
function writeData(path: string, key:string, value: object) {
  firebase
    .database()
    .ref(path + '/' + key)
    .set(value);
}
//
// 3.2 datas typedefs
type UserData = {
  username: string;
  email: string;
  profile_picture: string;
};

type LogMsg = {
  message: string;
};
//
// 3.3 let's send some data
writeData('dataDeJerome', UUID(), {nom:'robert',prenom:'redford'})

let userData: UserData = {
  username: 'toto',
  email: 'toto@me.com',
  profile_picture: 'http://toto.com'
}
writeData('user',UUID(),userData );

let message: LogMsg = {
  message: `${'new message'} - ${Math.round(Math.random() * 100)}`,
};
writeData('log', `${Date.now()}`, message);
//
// 4. read data if changed
var newLogData = firebase.database().ref('log');
newLogData.on('value', (snapshot) => {
  const data = snapshot.val();
  bot.say('I received some data !');
  for (const property in data) {
    let logMsg: LogMsg = data[property];
    bot.say(`${property}: ${logMsg.message}`)
    console.log(`${property}: ${logMsg.message}`);
  }
});
//
//=======================================================