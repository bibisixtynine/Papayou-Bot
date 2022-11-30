//=======================================================//
//
// index.ts
// 21 novembre 18:01
//

import './style.css';
import firebase from 'firebase/app';
import 'firebase/database';
import { Bot, UUID } from './libs/utils';

//=======================================================//
//
// Initialize the chatbot
//
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Bibil Bot is ready !</h1>`;

let bot = new Bot('🤖');
bot.sayHello();
bot.say('🤩 so nice man 😍!');
bot.say('💪🏻great 🥳');
bot.say(`${UUID()}🥇`);
//
//=======================================================//

console.log('#Bibil: Bot is READY')

//=======================================================//
//
// FIREBASE 8
//
// 2. init
const firebaseConfig = {
  databaseURL:
    'https://my-papayou-2-default-rtdb.europe-west1.firebasedatabase.app/',
};
//
// 3. Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
//

//
// 4. Add a record de the db
//
// 4.1 writeData, the write function !
function writeData(path: string, key:string, value: object) {
  firebase
    .database()
    .ref(path + '/' + key)
    .set(value);
}
//
// 4.2 some type definition to describe the data
type UserData = {
  username: string;
  email: string;
  profile_picture: string;
};

type LogMsg = {
  message: string;
};
//
// 4.3 let's send some data
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
// 5. read data if changed
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
//=======================================================//