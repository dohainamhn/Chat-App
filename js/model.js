const model = {}
model.currentUser = {}
model.register = (data)=>{
    firebase.auth().createUserWithEmailAndPassword(data.email.value, data.password.value).then(
        (res)=>{
            firebase.auth().currentUser.updateProfile({
                displayName: data.lastName.value + data.firstName.value,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                firebase.auth().currentUser.sendEmailVerification()
                alert("Congratulation! you have successfully registed\n please check your email to verify your account. ")
                setActiveScreen("login",data)
            })
    .catch(function(error) {
        controller.authenticate(error)
      });
}
model.login = (data)=>{
    firebase.auth().signInWithEmailAndPassword(data.email.value,data.password.value).then((res)=>{
        if(!res.user.emailVerified){
            alert('please verify your email')
        }
        else
        setActiveScreen('chatScreen',res)
        model.currentUser = res.user
    })
    .catch(function(error) {
        controller.authenticate(error)
      });
}