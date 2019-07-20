import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBuKb70rjgwNFvwrSkgnmur7-3MQz2upok",
    authDomain: "airvatadmin-a8d26.firebaseapp.com",
    databaseURL: "https://airvatadmin-a8d26.firebaseio.com",
    projectId: "airvatadmin-a8d26",
    storageBucket: "airvatadmin-a8d26.appspot.com",
    messagingSenderId: "1025522427130"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const storage = firebase.storage();

export const getUserdetails = () => {
    const data = [];
    db.collection('users').get().then(collection => {
        collection.forEach(childSnapShot => {
            const locker = {
                FirstName: childSnapShot._document.proto.fields.account.mapValue.fields.firstName.stringValue,
                SurName: childSnapShot._document.proto.fields.account.mapValue.fields.surname.stringValue,
                Email: childSnapShot._document.proto.fields.account.mapValue.fields.email.stringValue,
                RecidenceCity: childSnapShot._document.proto.fields.account.mapValue.fields.residenceCity.stringValue,
                RecidenceCountry: childSnapShot._document.proto.fields.account.mapValue.fields.residenceCountry.stringValue,
                LastActive: childSnapShot._document.proto.fields.lastActive.integerValue,
            };
            data.push(locker);
        });

    });
    return data;
}