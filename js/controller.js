const controller = {}
controller.authenticate = function(data){
    for(let x in data)
    {
        let error = document.getElementById(`${x}`)
        if(data[x].value == ""){
            error.innerHTML =`${data[x].name} is required`
            error.style.display = "flex"
        }
        else if(x == 'confirmPassword'){
            if(data[x].value !== data['password'])
            {
                error.innerHTML =`${data[x].name} does not match with password`
                error.style.display = "flex"
            }
        }
        else {
            error.style.display = "none"
        }
    }
}
