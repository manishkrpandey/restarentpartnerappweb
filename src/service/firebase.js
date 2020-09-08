
import firebase from 'firebase/app'
import 'firebase/storage'
export const FakeAuth = {
    authenticate() {
        if(localStorage.getItem('token')){
            return true;
        }
      return false;
    }
  };

export const firebaseConfig = {
  apiKey: "AIzaSyAxLI-05Nl5BYB-ZUPj1OnSYXt3b8A5TIg",
  projectId: "asaanagent",
  storageBucket: "gs://asaanagent.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
  