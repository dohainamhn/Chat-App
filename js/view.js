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
            let sendMessage = document.getElementById('send-message')
            let a = document.getElementById('post-message')
            let messageBox = document.getElementById('message-box')
            a.addEventListener('click',(e)=>{
                console.log(firebase.auth().currentUser)
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                  }).catch(function(error) {
                    // An error happened.
                  });   
            })
            let input = document.getElementById('input')
            input.addEventListener('keyup',(e)=>{
                e.preventDefault()
                if(input.value.trim() !== ""){
                    if(e.keyCode == 13){
                        addNewMessage(input,sendMessage)
                        messageBox.scrollTop = sendMessage.scrollHeight
                    }
                }
               else if(e.keyCode == 13){
                    input.value=""
                }
            })
        }
            
    }
}

function addNewMessage(input,sendMessage){
    const message = {
        content: input.value,
        owner: model.currentUser.email
    }
    if(message.owner == model.currentUser.email){
        let html = `<div class="send-message-content">${message.content}</div>`
        sendMessage.innerHTML += html
    }
    else{
        let html = `
        <div class="receiver">${message.owner}</div>
        <div class="receive-message-content">${message.content}</div>`
        sendMessage.innerHTML += html
    }
    input.value=""
}

window.onload = setActiveScreen