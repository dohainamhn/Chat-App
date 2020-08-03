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
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      if (user.emailVerified == true) {
        setActiveScreen('chatScreen')
        model.currentUser.email = user.email
      }
      else{
        setActiveScreen('login')
      }
    }
    else{
      setActiveScreen('login')
    }
  });
}



// function a(){
//   var db = firebase.firestore();
//   db.collection("users").get()
//   .then(function(response) {
//       console.log(response.data());
//   })
//   .catch(function(error) {
//       console.error("Error adding document: ", error);
//   });
// }


window.onload = init