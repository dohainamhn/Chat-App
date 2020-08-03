const model = {}
model.currentUser = {}
model.userOnline = []
model.allConversations = []
model.register = (data)=>{
    firebase.auth().createUserWithEmailAndPassword(data.email.value, data.password.value)
    .then((res)=>{
            firebase.auth().currentUser.updateProfile({
                displayName: data.lastName.value + data.firstName.value,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(()=>{
                    model.addFireStore("users",
                    {
                        name: res.user.displayName,
                        email: res.user.email
                    });
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
    firebase.auth().signInWithEmailAndPassword(data.email.value,data.password.value)
    .then((res)=>{
        if(!res.user.emailVerified){
            alert('please verify your email')
        }
        else{
            model.currentUser = firebase.auth().currentUser
            // model.addFireStore("usersOnline",
            //     {
            //         name: res.user.displayName,
            //         email: res.user.email
            //     });
            setActiveScreen('chatScreen',res)
        }
        
    })
    .catch(function(error) {
        controller.authenticate(error)
    });
}

model.onDisconected = ()=>{
    var ref = firebase.database().ref("usersOnline/" + model.key);
        ref.set({
        name: firebase.auth().currentUser.displayName,
        email: model.currentUser.email
        
    });
        ref.onDisconnect().remove();
}
model.onListenRealTimeDataBase = (collection)=>{
    let db = firebase.database().ref('usersOnline');
    db.on('child_added', function(data) {
        addUserOnline({
            id: data.key,
            name: data.val().name,
            email: data.val().email
        })
      });
      
    db.on('child_removed', function(data) {
        removeUserOnline(data.key)
      });
}
// ------------------------firesotre---------------------------------
model.pushFirebaseStore = (collection,document,data,field)=>{
    var db = firebase.firestore();
    if(!field) db.collection(collection).doc(document).update(data)
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
                        console.log("New: ", change.doc.data());
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
                        addUserOnline(model.userOnline)
                    }
                    if (change.type === "modified") {
                        console.log("Modified: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed: ",change.doc.data());
                        for(let x in model.userOnline){
                            if(model.userOnline[x]["id"] == change.doc.id){
                                model.userOnline.splice(x,1)
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
    db.collection("users").where('email','==',firebase.auth().currentUser.email)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((item)=>{
            model.key = item.id
            console.log('get id :'+ model.key)
            model.onDisconected()
            model.onListenRealTimeDataBase()
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
model.getAllDataFromFireStore = (collection)=>{
    var db = firebase.firestore();
    db.collection(collection).where('users','array-contains',firebase.auth().currentUser.email)
    .get()
    .then((querySnapshot)=>{
        let data = []
        querySnapshot.forEach((item)=>{
            data.push({
                id: item.id,
                createdAt: controller.convertToTimeStamp(item.data().messages[item.data().messages.length-1]['createdAt']),
                lastMessage: controller.checkUndefine(item),
                owner: controller.checkEmail(item)
            })
        })
       model.allConversations = controller.sortByTimeStamp(data)
       if(model.allConversations[0] !== undefined){
            creatConversation(model.allConversations[0]["owner"])
       }
    })
}


