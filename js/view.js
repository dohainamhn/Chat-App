function setActiveScreen(x){
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
                    controller.authenticate(data)
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
                    controller.authenticate(data)
                })
                logup.addEventListener('click',()=>{
                    setActiveScreen('logup')
                })
                break;
            }
            
    }
}
window.onload = setActiveScreen