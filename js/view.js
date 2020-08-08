let currentChatID = "MvE5TcYcf0aeMDdcLKpD"
let collectionName = "conversations"
function setActiveScreen(x,data){
    switch(x)
    {
        case "logup":
            {
                let screen= document.getElementById('app')
                screen.innerHTML = components.logup
                let register = document.getElementById('register-form')
                let login  = document.getElementById('login')
                register.addEventListener('submit',(x)=>{
                    x.preventDefault()
                    const data = {
                        firstName: {
                            value:register.firstName.value,
                            name: 'First name'
                        },
                        lastName: {
                            value:register.lastName.value,
                            name: 'Last name'
                        },
                        email: {
                            value:register.email.value,
                            name: 'Email'
                        },
                        password: {
                            value: register.password.value,
                            name: 'Password'
                        },
                        confirmPassword: {
                            value: register.confirmPassword.value,
                            name: 'Confirm password'
                        }
                    }
                    controller.checkNull(data)
                    controller.logup(data)
                })
                login.addEventListener('click',()=>{
                    setActiveScreen('login')
                })
                break;
            }
        case "login":
            {
                let screen= document.getElementById('app')
                screen.innerHTML = components.login
                let login = document.getElementById('login-form')
                let logup = document.getElementById('logup')
                login.addEventListener('submit',(x)=>{
                    x.preventDefault()
                    login.email.value = login.email.value.trim();
                    const data = {
                        email:{
                            value: login.email.value,
                            name: 'Email'
                        },
                        password: {
                            value:login.password.value,
                            name:'Password'
                        }
                    }
                    controller.checkNull(data)
                    controller.login(data)
                })
                logup.addEventListener('click',()=>{
                    setActiveScreen('logup')
                })
                break;
            }
        case "chatScreen":{
            let screen= document.getElementById('app')
            screen.innerHTML = components.chatScreen
            let input = document.getElementById('input')
            input.addEventListener('keyup',(e)=>{
                e.preventDefault()
                if(input.value.trim() !== ""){
                    if(e.keyCode == 13){
                        model.pushFirebaseStore(collectionName,currentChatID,{owner:model.currentUser.email,content:input.value,createdAt:controller.getDate()},"messages")
                        controller.pullMenuRight('off')
                        controller.pullMenuLeft("off")
                        input.value=""
                    }
                }
               else if(e.keyCode == 13){
                    input.value=""
                }
            })
            model.getAllDataFromFireStore(collectionName)
            controller.pullMenuLeft("off")
            controller.pullMenuRight('off')
            model.getKeyAfterLoadPage()
            controller.logOut()
            console.log('ok')
            
        }
    }
}

function addNewMessage(input){
    let sendMessage = document.getElementById('send-message')
    let messageBox = document.getElementById('message-box')
    if(input.length === undefined){
        if(input.owner == model.currentUser.email){
            let html = `<div class="send-message-box"><div class="send-message-content">${input.content}</div></div>`
            sendMessage.innerHTML += html
        }
        else{
            let html = `
            <div class="receive-message">
            <div class="receiver">${input.owner}</div>
            <div class="receive-message-content">${input.content}</div>
            </div>
            `
            sendMessage.innerHTML += html
        }
    }
    else{
        sendMessage.innerHTML = ""
        for(let item of input){
            if(item.owner == model.currentUser.email){
                let html = `<div class="send-message-box"><div class="send-message-content">${item.content}</div></div>`
                sendMessage.innerHTML += html
            }
            else{
                let html = `
                <div class="receive-message">
                <div class="receiver">${item.owner}</div>
                <div class="receive-message-content">${item.content}</div>
                </div>
                `
                sendMessage.innerHTML += html
            }
        }
    }
    messageBox.scrollTop = sendMessage.scrollHeight
}

function addUserOnline(data){
    let view = document.getElementById('card-body')
    let check = model.userOnline.find((item)=> item == data.id)
    if(check == undefined){
        model.userOnline.push(data.id)
        let html =""
        if(data.email !== firebase.auth().currentUser.email){
             html +=`
            <div class="inner-body-card" id="${data.id}" >
                <a href="#" onclick="creatConversation('${data.email}')"> 
                    <div class="img-card">
                        <img src="" class="rounded-circle" alt="">
                    </div>
                    <div class="card-info ml-3">
                        <h6>${data.name}</h6>
                        <p>${data.email}</p>
                    </div>
                </a>
            </div>  
            `
        } 
        view.innerHTML += html
    }    
}

function removeUserOnline(data){
   let item = document.getElementById(data)
   console.log('removed')
   item.innerHTML = ""
   item.remove()
}

function creatConversation(email){
    model.currentConversation()
    model.listenRealTimeFireStore(collectionName,email)
    let db = firebase.firestore();
    var conversations = db.collection(collectionName);
    conversations
    .where("users","in",[[email,firebase.auth().currentUser.email],[firebase.auth().currentUser.email,email]])
    .get()
    .then((item)=>{
        if(!item.empty){
            let data = []
            item.forEach((users)=>{
                currentChatID = users.id
                users.data().messages.forEach((item)=>{
                let message = {
                    owner: item.owner,
                    content: item.content
                }
                data.push(message)
               })
            })
            addNewMessage(data)
            console.log(data)
        }
        else{
            conversations.add({
                creatAt:"",
                messages:[],
                tittle:"",
                users:[email,firebase.auth().currentUser.email]
            }).then(function(docRef) {
                console.log("conversation is created with ID: ", docRef.id);
                currentChatID = docRef.id
            })
            .catch(function(error) {
                console.error("Error creating conversation: ", error);
            });
        }
    }) 
}

window.onload = setActiveScreen