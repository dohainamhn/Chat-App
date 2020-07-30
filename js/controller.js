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
        let password = document.getElementById('email')
        password.innerHTML = 'Email is already exist.'
        password.style.display = 'flex'
    }
    else if(error.code == "auth/wrong-password"){
        let password = document.getElementById('password')
        password.innerHTML = 'Wrong Password'
        password.style.display = 'flex'
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
