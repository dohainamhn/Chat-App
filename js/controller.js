const controller = {}
controller.checkNull = function(data){
    for(let x in data)
    {   
        let error = document.getElementById(`${x}`)
        if(data[x].value.trim() == ""){
            error.innerHTML =`${data[x].name} is required`
            error.style.display = "flex"
        }
        else if(x == 'confirmPassword'){
            if(data[x].value !== data['password'].value)
            {
                error.innerHTML =`${data[x].name} does not match with password`
                error.style.display = "flex"
            }
            else{
                error.style.display = "none"
            }
        }
        else {
            error.style.display = "none"
        }
    }
}
controller.authenticate = function(error){
    if(error.code == 'auth/weak-password'){
        let password = document.getElementById('password')
        password.innerHTML = 'Password must be more than 6 characters.'
        password.style.display = 'flex'
    }
    else if(error.code == 'auth/email-already-in-use')
    {
        let email = document.getElementById('email')
        email.innerHTML = 'Email is already exist.'
        email.style.display = 'flex'
    }
    else if(error.code == "auth/wrong-password"){
        let password = document.getElementById('password')
        password.innerHTML = 'Wrong Password'
        password.style.display = 'flex'
    }
    else if(error.code == "auth/user-not-found"){
        let email = document.getElementById('email')
        email.innerHTML = 'Email does not exist.'
        email.style.display = 'flex'
    }
    else if(error.code =="auth/invalid-email"){
        let email = document.getElementById('email')
        email.innerHTML = 'Email must have (.com) in the end'
        email.style.display = 'flex'
    }
}
controller.logup = function(data){
    if(data.email !== "" &&
        data.firstName.value !== ""&&
        data.lastName.value !== ""&&
        data.password.value !== ""&&
        data.confirmPassword.value !==""&&
        data.confirmPassword.value === data.password.value
    ){
        model.register(data)
    }
}
controller.login = function(data){
    if( data.email !== "" &&
        data.password.value !== ""
    ){
        model.login(data)
    }
}
controller.logOut = function(){
    let a = document.getElementById('logOut')
    a.addEventListener('click',(e)=>{
        firebase.auth().signOut().then(function() {
            var ref = firebase.database().ref("usersOnline/" + model.key).remove();
            model.userOnline = []
            model.key = ""
            model.currentUser = ""
            model.offListenRealTimeDataBase('usersOnline')
          }).catch(function(error) {
            // An error happened.
          });   
    })  
}
controller.getDate = ()=>{
    var today = new Date();  
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}
controller.checkUndefine = (item)=>{
    if(item.data().messages[item.data().messages.length-1]['content'] !== undefined){
        return item.data().messages[item.data().messages.length-1]['content']
    }
}
controller.checkByReceiver = (item)=>{
    if(item.data().checkByReceiver == true) return true
    else return false
}
controller.checkEmail = (item)=>{
    let user = ""
    for(let x of item.data().users)
        {   
            if(x !== firebase.auth().currentUser.email)
            user = x
        }
    return user    
}
controller.sortByTimeStamp = (data)=>{
    let arrAfterSort = data.sort((a,b)=>{
        return  b.createdAt - a.createdAt
    })
    return arrAfterSort
}
controller.convertToTimeStamp = (data)=>{
    let timeStamp = (new Date(data).getTime()/1000)
    return timeStamp
}
controller.makeHtmlForm = (data,message,x,index)=>{
    let html = ""
    if(data.lassMessageOwner == firebase.auth().currentUser.email){
        if(data.lassMessageOwner == firebase.auth().currentUser.email){
            (index == x)
            ? html += `
            <div class="wrap active" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                <div class="info">
                    ${data.email} 
                </div>
                <div class="content">
                    you: ${message}
                </div>
            </div>` 
            : html += `
            <div class="wrap" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                <div class="info">
                    ${data.email} 
                </div>
                <div class="content">
                    you: ${message}
                </div>
            </div>`
        }
        else{
            (index == x)
            ? html += `
            <div class="wrap active" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                <div class="info">
                    ${data.email} 
                </div>
                <div class="content">
                    ${message}
                </div>
            </div>` 
            : html += `
            <div class="wrap" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                <div class="info">
                    ${data.email} 
                </div>
                <div class="content">
                    ${message}
                </div>
            </div>`
        }
    }
    else{
        if(data.check == true){
            if(data.lassMessageOwner == firebase.auth().currentUser.email){
                (index == x)
                ? html += `
                <div class="wrap active" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        you: ${message}
                    </div>
                </div>` 
                : html += `
                <div class="wrap" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        you: ${message}
                    </div>
                </div>`
            }
            else{
                (index == x)
                ? html += `
                <div class="wrap active" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        ${message}
                    </div>
                </div>` 
                : html += `
                <div class="wrap" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        ${message}
                    </div>
                </div>`
            }
        }
        else{
            if(data.lassMessageOwner == firebase.auth().currentUser.email){
                (index == x)
                ? html += `
                <div class="wrap active notcheck" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        you: ${message}
                    </div>
                </div>` 
                : html += `
                <div class="wrap notcheck" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        you: ${message}
                    </div>
                </div>`
            }
            else{
                (index == x)
                ? html += `
                <div class="wrap active notcheck" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        ${message}
                    </div>
                </div>` 
                : html += `
                <div class="wrap notcheck" id="${data.email}" onclick="changeActive('${data.email}','${data.lassMessageOwner}','${data.id}')">
                    <div class="info">
                        ${data.email} 
                    </div>
                    <div class="content">
                        ${message}
                    </div>
                </div>`
            }
        }
    }
    return html
}
    

