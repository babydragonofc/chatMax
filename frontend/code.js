//helcome sir

//login elements

const login = document.querySelector(".login");
const loginForm = document.querySelector(".login__form");
const loginInput = document.querySelector(".login__input");
const loginColor = document.querySelector(".login__color");

//chat elements

const chat = document.querySelector(".chat");
const chatForm = document.querySelector(".chat__form");
const chatInput = document.querySelector(".chat__input");
const chatColor = document.querySelector(".chat__color");
const chatMsg = document.querySelector(".chat__msgs");


//user
    loginColor.value = "#ff0000"

    const user = { id: "", name: "", color: ""};


    let websocket;

    const createMessageSelfElement = (content) => {

        const div = document.createElement("div");

        div.classList.add("msg-Self");

        div.innerHTML = content;

        return div;


    }

    const createMessageOtherElement = (content, sender, senderColor) => {

        const div = document.createElement("div");
        const span = document.createElement("span");


        div.classList.add("msg-Other");
        span.classList.add('message-sender')

        div.appendChild(span)

        span.style.color = senderColor;

        span.innerHTML = sender;
        div.innerHTML += content;

        return div;


    }

    const scrollScreamm = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        })
    }

    const processMessage = ({data}) => {

        const { userId, userName, userColor, content } = JSON.parse(data);

        const message = userId == user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, userName, userColor)
        
        const element = createMessageOtherElement(content, userName, userColor);

        chatMsg.appendChild(message)

        scrollScreamm()
    }
    
    const handleSubmit = (event) => {
        
        event.preventDefault();

        user.id = crypto.randomUUID();
        user.name = loginInput.value;
        user.color = loginColor.value;

        login.style.display = "none";
        chat.style.display = "flex";


        websocket = new WebSocket("wss://chatmax-uskl.onrender.com")
        websocket.onmessage = processMessage;

        //websocket.onopen = () => {websocket.send(`Usuário: ${user.name} entrou no chat!`)}

        console.log(user)

        //websocket.onopen = () => { websocket.send(`Usuário: ${user.name} entrou no chat!`)};
    }

    const sendMessage = (event) => {
        event.preventDefault();

        const message = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value
        }
        websocket.send((JSON.stringify(message)))

        chatInput.value = "";
    }
    loginForm.addEventListener("submit", handleSubmit )

    chatForm.addEventListener("submit", sendMessage )

