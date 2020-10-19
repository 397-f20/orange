import * as firebase from 'firebase';

import 'firebase/auth'
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDSofku7uliUxCRisDrQ2S4lG_PwhWUT78",
    authDomain: "reqtrack-d84a6.firebaseapp.com",
    databaseURL: "https://reqtrack-d84a6.firebaseio.com",
    projectId: "reqtrack-d84a6",
    storageBucket: "reqtrack-d84a6.appspot.com",
    messagingSenderId: "476358211600",
    appId: "1:476358211600:web:e0a09ebadfb09d26157295"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
