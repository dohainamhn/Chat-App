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
<div class="container-login">
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
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
`
components.chatScreen = `
<div class="chat-container">
    <div class="top">
        <div class"top-title>Mindx-Chat</div>
        <div class="logout-Button" id="logOut"><i class="fas fa-sign-out-alt"></i></div>
    </div>
    <div id="title" class="first-conversation">First Conversation</div>
    <div class="main">
    <div class="left-menu" id="left-menu">
        <div class="inner-left-menu" id="inner-left-menu">
        
        </div>
    </div>
        <div class="chat-box">
            <div class="message-box" id="message-box">
                <div class="send-message" id="send-message">
                    
                </div>
            </div>
            <div class="post-message" >
                <input id="input" type="text" name="message" placeholder="Type a message">
                <button id="post-message" type="submit"><i class="fas fa-paper-plane"></i></button>
            </div>
            <div class="arrow-left" id="arrow-left">
            <i class="far fa-hand-point-right"></i>
            </div>
            <div class="arrow-right" id="arrowBtn">
            <i class="far fa-hand-point-left"></i>
            </div>
        </div>
        <div class="slidebar-menu-right" id="slidebar-menu-right">
            <div class="card-body" id="card-body">
                
            </div>
    </div>
    </div>
</div>`