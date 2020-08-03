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
    let a = document.getElementById('post-message')
    a.addEventListener('click',(e)=>{
        firebase.auth().signOut().then(function() {
            var ref = firebase.database().ref("usersOnline/" + model.key).remove();
            model.userOnline = []
            model.key = ""
          }).catch(function(error) {
            // An error happened.
          });   
    })  
}
controller.pullMenuRight = (data)=>{
    let arrowBtn = document.getElementById('arrowBtn')
    let menuRight = document.getElementById('slidebar-menu-right')
    let cardInfo = document.getElementsByClassName('card-body')
    for(let x of cardInfo){
        x.style.display = 'none'
    }
    menuRight.style.width = "0px";
    let x = data
    arrowBtn.addEventListener('click',()=>{
        if(x === 'on')
        {   
            for(let x of cardInfo){
                x.style.display = 'none'
            }
            menuRight.style.width = "0px";
            x = 'off'
        }
        else{
            for(let x of cardInfo){
                x.style.display = 'block'
            }
            menuRight.style.width = "250px";
            x = 'on'
        }
    })
}
controller.pullMenuLeft = ()=>{
    let arrowBtn = document.getElementById('arrow-left')
    let menuLeft = document.getElementById('left-menu')
    let wrap = document.getElementsByClassName('wrap')
    for(let x of wrap){
        x.style.display = 'none'
    }
    menuLeft.style.width = "0px";
    let x = "off"
    arrowBtn.addEventListener('click',()=>{
        if(x === 'on')
        {   
            for(let x of wrap){
                x.style.display = 'none'
            }
            menuLeft.style.width = "0px";
            x = 'off'
        }
        else{
            for(let x of wrap){
                x.style.display = 'block'
            }
            menuLeft.style.width = "250px";
            x = 'on'
        }
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