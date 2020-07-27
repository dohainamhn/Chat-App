const controller = {}
controller.authenticate = function(data){
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
