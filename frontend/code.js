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

//chat create elements
const chatBtnCreate = document.querySelector("#chat__btn__create");
const chatCreateConteiner = document.querySelector(".chats__list");
const chatCreateNameInput = document.querySelector(".chatName__input");
const chatCreateCard = document.querySelector(".chat__card");
const chatCreateCloseBtn = document.querySelector(".chatFormClose");
const chatNewBtn = document.querySelector(".chatName__button");
const chatChangeBtn = document.querySelector(".ChangeConteinerServers");
const chatSideBar = document.querySelector("#chats__sidebar");

//user

var localChats = {}

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
        const { type } = JSON.parse(data);

        if ( type === "message") {
        
        const { userId, userName, userColor, content } = JSON.parse(data);

        const message = userId == user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, userName, userColor)
        
        const element = createMessageOtherElement(content, userName, userColor);

        chatMsg.appendChild(message)

        scrollScreamm()

        }

        else if (type === "newChat") {

            const { creatorId, creatorName, content } = JSON.parse(data);

            const newChatButton = document.createElement("button"); 

            newChatButton.innerHTML = content;
    
            chatCreateConteiner.appendChild(newChatButton);

            const chatNameId = "Chat-" + content;
            const Chat = eval("{ " + chatNameId + ":{creatorId, creatorName, content} }")

            Object.assign(localChats, Chat);

            console.log(localChats)


            localChats.push(content)


        }

    }
    
    const handleSubmit = (event) => {
        
        event.preventDefault();

        user.id = crypto.randomUUID();
        user.name = loginInput.value;
        user.color = loginColor.value;

        login.style.display = "none";
        chat.style.display = "flex";


        websocket = new WebSocket("https://chatmax-backend.onrender.com") //https://chatmax-backend.onrender.com
        websocket.onmessage = processMessage;

        //websocket.onopen = () => {websocket.send(`Usuário: ${user.name} entrou no chat!`)}

        console.log(user)

        websocket.onopen = () => { websocket.send(`Usuário: ${user.name} entrou no chat!`)};
    }

    const sendMessage = (event) => {

        event.preventDefault();

        const message = {
            type: "message",
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value
        }

        websocket.send((JSON.stringify(message)))

        chatInput.value = "";
    }

    const NewChat = (event) => {

        event.preventDefault(); // Prevent form submission if the button is in a form.
    
        chatCreateCard.style.display = "none";
    
        // Create the button *inside* the NewChatLog function.
        
        
            const newChatInfo = {
                type: "newChat",

                creatorId: user.id,
                creatorName: user.name,
                content: chatCreateNameInput.value // Get value from input field
            };
            chatCreateNameInput.value = ""; // Clear input field after sending message.

            websocket.send((JSON.stringify(newChatInfo)))

    }
    
    

    const NewChatLog = (event) => {

        event.preventDefault();

        chatCreateCard.style.display = "flex";

    }

    const CloseNewChatLog = () => {

        chatCreateCard.style.display = "none";

    }

    const ChangeNewContainerStatus = () => {

        if (chatSideBar.classList.contains('chats__containerOpen')) {

            chatSideBar.classList.remove('chats__containerOpen');
            chatSideBar.classList.add('chats__containerClose');

        } else {

            chatSideBar.classList.add('chats__containerOpen');
            chatSideBar.classList.remove('chats__containerClose');

        }

    }


    chatCreateCloseBtn.addEventListener("click", CloseNewChatLog)

    //chatCreateNameInput.addEventListener("submit", NewChat)

    chatNewBtn.addEventListener("click", NewChat)

    chatBtnCreate.addEventListener("click", NewChatLog)
    
    loginForm.addEventListener("submit", handleSubmit)

    chatForm.addEventListener("submit", sendMessage)

    chatChangeBtn.addEventListener("click", ChangeNewContainerStatus)


