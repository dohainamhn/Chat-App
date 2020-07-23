const components = {}
components.logup = `
<div class="container">
        <div class="wrapper">
            <h1>Mindx Chat</h1>
            <form  class="form" id="register-form">
                <div class="name">
                    <div class="inputFirstName">
                        <input type="text" name="firstName" placeholder="First name...">
                        <div class="error" id="firstName">asdsa</div>
                    </div>
                    <div class="inputLastName">
                        <input type="text" name="lastName" placeholder="Last name...">
                        <div class="error" id="lastName"></div>
                    </div>
                </div>
                <div class="name">
                    <div class="inputWrapper">
                        <input type="email" name="email" placeholder="Email...">
                        <div class="error" id="email"></div>
                    </div>
                </div>
                <div class="name">
                    <div class="inputWrapper">
                        <input type="password" name="password" placeholder="Password...">
                        <div class="error" id="password"></div>
                    </div>
                </div>
                <div class="name">
                    <div class="inputWrapper">
                        <input type="password" name="confirmPassword" placeholder="Confirm Password...">
                        <div class="error"id="confirmPassword"></div>
                    </div>
                </div>
                
                <div class="name justify-content-spacebetween">
                    <span>Already have an account? <a id="login" href="#">Login</a></span>
                    <button class="btn" type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
`
components.login = `
<div class="container">
        <div class="wrapper">
            <h1>Mindx Chat</h1>
            <form  class="form" id="login-form">
                <div class="name">
                    <div class="inputWrapper">
                        <input type="email" name="email" placeholder="Email...">
                        <div class="error" id="email"></div>
                    </div>
                </div>
                <div class="name">
                    <div class="inputWrapper">
                        <input type="password" name="password" placeholder="Password...">
                        <div class="error" id="password"></div>
                    </div>
                </div>
                <div class="name justify-content-spacebetween">
                    <span>Don't have an account? <a id="logup" href="#">Register</a></span>
                    <button class="btn"  type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
`