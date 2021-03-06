const model = {}
model.listenConversations = ()=>{};
model.currentConversationID = {}
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
        console.log(error);
        controller.authenticate(error)
    });
}
model.login = (data)=>{
    firebase.auth().signInWithEmailAndPassword(data.email.value,data.password.value)
    .then((res)=>{
        if(res.user.emailVerified){
            model.currentUser = firebase.auth().currentUser
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
model.offListenRealTimeDataBase = (collection)=>{
    firebase.database().ref(collection).off()
}
model.onListenRealTimeDataBase = (collection)=>{
    let db = firebase.database().ref(collection);
        db.on('child_added', function(data) {
            addUserOnline({
                id: data.key,
                name: data.val().name,
                email: data.val().email
            })
          });
          
        db.on('child_removed', function(data) {
            removeUserOnline(data.key)
            console.log(model.userOnline.indexOf(data.key))
            if(model.userOnline.indexOf(data.key) !== -1){
                console.log('removed :' + data.key)
                model.userOnline.splice(model.userOnline.indexOf(data.key),1)
            }
          });
}
// ------------------------firesotre---------------------------------
model.pushFirebaseStore = (collection,document,data,check)=>{
    var db = firebase.firestore();
    console.log(collection)
    console.log(document);
    console.log(data);
   if(data !== null){
    db.collection(collection).doc(document).update({
        messages: firebase.firestore.FieldValue.arrayUnion(data),
        checkByReceiver: check
    })
   }
   else{
    db.collection(collection).doc(document).update({
        checkByReceiver: check
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
            model.listenConversations = db.collection(collection)
            .where("users","array-contains",firebase.auth().currentUser.email)
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        // console.log("add:");
                        // console.log(change.doc.data());
                    }
                    if (change.type === "modified") {
                       if(change.doc.id == model.currentConversationID.id){
                        let message = {
                            content:change.doc.data().messages[change.doc.data().messages.length-1]["content"],
                            owner:change.doc.data().messages[change.doc.data().messages.length-1]["owner"]
                        }
                        addNewMessage(message)
                        console.log('push');
                       }
                       console.log(change.doc.id);
                        let lastMessage = change.doc.data().messages[change.doc.data().messages.length-1]["content"]
                        let lastMessageOwner = change.doc.data().messages[change.doc.data().messages.length-1]["owner"]
                        let email = change.doc.data().users.find((item)=>item !== firebase.auth().currentUser.email)
                        let div = document.getElementById(email)
                        let leftMenu = document.getElementById('inner-left-menu')
                        let message = "";
                        let html = "";
                        (lastMessage.length > 10)? message = `${lastMessage.slice(0,20)}...` : message = lastMessage;
                        if(lastMessageOwner == firebase.auth().currentUser.email)
                        {
                            html = `
                            <div class="wrap active" id="${email}" onclick="changeActive('${email}','${lastMessageOwner}','${change.doc.id}')">
                                <div class="info">
                                    ${email} 
                                </div>
                                <div class="content">
                                   you: ${message}
                                </div>
                            </div>`
                        }
                        else{
                            (model.currentConversationID.id === change.doc.id)?
                            html = `
                            <div class="wrap active" id="${email}" onclick="changeActive('${email}','${lastMessageOwner}','${change.doc.id}')">
                                <div class="info">
                                    ${email} 
                                </div>
                                <div class="content">
                                    ${message}
                                </div>
                            </div>`
                            :html = `
                            <div class="wrap notcheck" id="${email}" onclick="changeActive('${email}','${lastMessageOwner}','${change.doc.id}')">
                                <div class="info">
                                    ${email} 
                                </div>
                                <div class="content">
                                    ${message}
                                </div>
                            </div>`
                        }
                        div.remove()
                        leftMenu.insertAdjacentHTML("afterbegin",html)
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
    let firstRun = true
    var db = firebase.firestore();
    db.collection("users").where('email','==',firebase.auth().currentUser.email)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((item)=>{
            model.key = item.id
            console.log('get id :'+ model.key)
        })
        model.onDisconected()
        model.onListenRealTimeDataBase('usersOnline')
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
    .then(async (querySnapshot)=>{
        let data = []
        querySnapshot.forEach((item)=>{
           if(item.data().messages[0] !== undefined){
            data.push({
                id: item.id,
                createdAt: controller.convertToTimeStamp(item.data().messages[item.data().messages.length-1]['createdAt']),
                lastMessage: controller.checkUndefine(item),
                owner: controller.checkEmail(item),
                check: controller.checkByReceiver(item),
                lassMessageOwner: item.data().messages[item.data().messages.length-1]['owner'],
                email: item.data().users.filter((item)=>item !== model.currentUser.email)
            })
           }
        })
       model.allConversations = controller.sortByTimeStamp(data)
       if(model.allConversations[0] !== undefined){
           var count = undefined;
           for(let x of model.allConversations){
               if(x.lassMessageOwner == firebase.auth().currentUser.email){
                    creatConversation(x["owner"])
                    model.currentConversationID.id = x.id
                    count = model.allConversations.indexOf(x);
                    break;
               }
               else{
                    if(x.check == true){
                        creatConversation(x["owner"])
                        model.currentConversationID.id = x.id
                        count = model.allConversations.indexOf(x);
                        break;
                    }
               }
               
           }
            addListMessage(model.allConversations,count)
       }
       else 
       {
            addListMessage()
       }
    })
}

