let username;

let chatLog = [];
let responseLog = [];
let inactiveCounter;
let timeSinceLastChat;

let bot;
let botReady;

let memes = [];
let harpImages = [];

let bgLoop;

p5.disableFriendlyErrors = true; // disables FES

function preload(){
    bgLoop = loadSound('./assets/audio/bg_loop_v2.wav');
}

function setup(){
    noCanvas();
    
    bot = new RiveScript();
    botReady = false;

    bot.loadFile([
        "./rive/subs.rive",
        "./rive/brain.rive"
      ]).then(brainReady).catch(brainError);

    function brainReady(){
        console.log("angel bb chatbot is ready");

        username = "local-user";

        // Now the replies must be sorted!
        bot.sortReplies();

        botReady = true;

        //slide in chat window
        let chatWindow = select('#chat-window');
        chatWindow.style('right', '10%');

        bgLoop.loop();

    }

    function brainError(){
        console.log("error loading angel bb chatbot");
    }

    let button = select('#submit');
    let userinput = select('#user_input');
    let output = select('#output');

    let inputField = document.getElementById("user_input");
    inputField.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            chat();
        }
        });

    button.mousePressed(chat);

    async function chat(){
        let outputDiv = document.getElementById('output');
        let chat = userinput.value();
        chatLog.push(chat);
        inactiveCounter = 0;
        timeSinceLastChat = 0;
        
        let chatP = createP(">> " + chat);
        chatP.id('user');
        chatP.parent(output);
        userinput.value('');
        outputDiv.scrollTop = outputDiv.scrollHeight;

        await sleep(2000);

        bot.reply(username, chat).then(function(reply){
            andTheReply(reply);
        });
        
    }

    inactiveCounter = 0;
    timeSinceLastChat = 0;

}

function draw(){
    if (botReady){
        if (timeSinceLastChat >= 30000){
            inactiveChat();
        } else {
            timeSinceLastChat += deltaTime;
        }
    }
}

function andTheReply(_reply){
    responseLog.push(_reply);
    let trigger;

    if (_reply.includes('&&')){
        trigger = _reply.substring(
            _reply.indexOf('&'),
            _reply.lastIndexOf('&')+1
        );
        console.log(trigger);
            
        _reply = _reply.slice(
            _reply.lastIndexOf('&')+1
        );
        
    }

    let outputDiv = document.getElementById('output');
    let newReply = createP(">> " + _reply);
    newReply.id('bb');
    newReply.parent(output);
    outputDiv.scrollTop = outputDiv.scrollHeight;

    memeThrower97(convertTriggerToType(trigger));
}

function inactiveChat(){
    if (inactiveCounter < 3){
        let code;
        if (chatLog.length == 0){
            code = "absent user";
        } else {
            code = "inactive user";
        }

        bot.reply(username, code).then(function(reply){
            andTheReply(reply);
        });

        inactiveCounter++;

        timeSinceLastChat = 0;
    }
}

function memeThrower97(type){
    let memeChoice;

    let memeLength = 2;

    let newWindow = createDiv().addClass('window');
    newWindow.id('meme');
    
    let titleBar = createDiv();
    titleBar.addClass('title-bar');

    let titleText;
    let newMeme;

    /// THIS PART WILL BE TYPE DEPENDENT
    memeChoice = int(random(2));
    titleText = createDiv('HARP_' + memeChoice + ".PNG");
    newMeme = createImg('../assets/img/memes/harp/HARP' + memeChoice + '.png');
    /// END TYPE DEPENDENT

    titleText.addClass('title-bar-text');

    let titleControls = createDiv().addClass('title-bar-controls');
    let closeButton = createButton().attribute('aria-label', 'Close');
    closeButton.html('');

    closeButton.mousePressed(function(){
        newWindow.style('top', '150vh');
        newWindow.addClass('dead');
        setTimeout(memeCleanup, 3000);
    });
    
    let windowBody = createDiv().addClass('windowBody');

    titleText.parent(titleBar);
    closeButton.parent(titleControls);
    titleControls.parent(titleBar);
    titleBar.parent(newWindow);

    newMeme.parent(windowBody);
    windowBody.parent(newWindow);

    newWindow.style('transform', 'rotate(' + random(-12, 12) + 'deg)');
    newWindow.style('width', '' + random(20, 40) + '%');
    newWindow.position(random(0, windowWidth*.6), random(100, windowHeight*.5));

    memes.push(newWindow);
    
}

function convertTriggerToType(trigger){
    let type;
    if (trigger.includes("harptrig")){
        type = 0;
    }

    return type;

}

function memeCleanup(){
    for (i=0;i<memes.length;i++){
        if (memes[i].hasClass('dead')){
            memes[i].remove();
            memes.splice(i,1);
            console.log(memes);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



