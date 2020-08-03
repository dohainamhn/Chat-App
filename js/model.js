const model = {}
model.currentUser = {}
model.userOnline = []
model.register = (data)=>{
    firebase.auth().createUserWithEmailAndPassword(data.email.value, data.password.value)
    .then((res)=>{
            firebase.auth().currentUser.updateProfile({
                displayName: data.lastName.value + data.firstName.value,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                firebase.auth().currentUser.sendEmailVerification()
                alert("Congratulation! you have successfully registed\n please check your email to verify your account. ")
                // model.addFireStore("users",
                // {
                //     name: res.user.displayName,
                //     email: res.user.email
                // });
                // console.log(res.user.displayName)
                setActiveScreen("login",data)
            })
    .catch(function(error) {
        controller.authenticate(error)
    });
}
model.login = (data)=>{
    firebase.auth().signInWithEmailAndPassword(data.email.value,data.password.value)
    .then((res)=>{
        if(!res.user.emailVerified){
            alert('please verify your email')
        }
        else{
            model.currentUser = res.user
            model.addFireStore("usersOnline",
                {
                    name: res.user.displayName,
                    email: res.user.email
                });
            setActiveScreen('chatScreen',res)
        }
        
    })
    .catch(function(error) {
        controller.authenticate(error)
    });
}

model.onDisconected = ()=>{
    var ref = firebase.database().ref("users/" + "dohainamhn2");
        ref.update({
        onlineState: true,
        status: "I'm online."
    });
        ref.onDisconnect().update({
        onlineState: false,
        status: "I'm offline."
    });
}
// ------------------------firesotre---------------------------------
model.pushFirebaseStore = (collection,document,data,field)=>{
    var db = firebase.firestore();
    if(!field) db.collection(collection).doc(document).set(data)
    else{
        db.collection(collection).doc(document).update({
            messages: firebase.firestore.FieldValue.arrayUnion(data)
        })
    }
}
model.removeFirebaseStore = (collection,document) =>{
    var db = firebase.firestore();
    db.collection(collection).doc(document).delete()
}
model.listenRealTimeFireStore = async (collection,email)=>{
        var db = firebase.firestore();
        console.log(email)
        if(collection === "conversations"){
            db.collection(collection).where("users","in",[[email,firebase.auth().currentUser.email],[firebase.auth().currentUser.email,email]])
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        console.log("New city: ", change.doc.data());
                    }
                    if (change.type === "modified") {
                        let message = {
                            content:change.doc.data().messages[change.doc.data().messages.length-1]["content"],
                            owner:change.doc.data().messages[change.doc.data().messages.length-1]["owner"]
                        }
                        addNewMessage(message)
                        console.log("Modified city: ", change.doc.data().messages[change.doc.data().messages.length-1]["content"]);
                    }
                });
            });
        }
        else{
            db.collection(collection).onSnapshot(function (snapshot){
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        console.log("New city: ", change.doc.data());
                        let count = 0;
                        for(let x in model.userOnline){
                            if(model.userOnline[x]["id"] == change.doc.id){
                               count++
                            }
                        }
                        if(count == 0)
                            {
                                model.userOnline.push({
                                    id:change.doc.id,
                                    email:change.doc.data().email,
                                    name:change.doc.data().name
                                })
                            }
                        else console.log('ko add');
                        addUserOnline(model.userOnline)
                    }
                    if (change.type === "modified") {
                        console.log("Modified city: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed city: ",change.doc.data());
                        for(let x in model.userOnline){
                            if(model.userOnline[x]["id"] == change.doc.id){
                                model.userOnline.splice(x,1)
                                console.log('deleted')
                            }
                        }
                        removeUserOnline(change.doc.id)
                    }
                });
              });
          
        }
}
model.getKeyAfterLoadPage = ()=>{
    var db = firebase.firestore();
    db.collection("usersOnline").where('email','==',firebase.auth().currentUser.email)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((item)=>{
            model.key = item.id
            console.log('get id :'+ model.key)
        })
    })
}
model.addFireStore = (collection,data)=>{
    var db = firebase.firestore();
    db.collection(collection).add(data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        model.key = docRef.id
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}