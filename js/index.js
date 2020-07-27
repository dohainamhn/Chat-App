const init = function(x){
   // Your web app's Firebase configuration
  var firebaseConfig = {
   apiKey: "AIzaSyCHwB8S2pGDecPzik0xB1JNyluCVohyTlk",
   authDomain: "chat-app-bc2a8.firebaseapp.com",
   databaseURL: "https://chat-app-bc2a8.firebaseio.com",
   projectId: "chat-app-bc2a8",
   storageBucket: "chat-app-bc2a8.appspot.com",
   messagingSenderId: "922317285890",
   appId: "1:922317285890:web:fbac59705c66cf64a7551b"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 console.log(firebase.app().name)
   setActiveScreen('login')
}
window.onload = init