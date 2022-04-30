let username;

let chatLog = [];
let responseLog = [];
let inactiveCounter;
let timeSinceLastChat;

let memeTimer;

let bot;
let botReady;

let memes = [];
let harpImages = [];
let memeCluster;

let triggerNames = [
    //IMAGES
    'angelimages',
    'harp',
    'harpporn',
    'selfie',
    'stainedglass',
    //GIFS
    'angel',
    'angelbby',
    'angeldevil',
    'angelflirt',
    'angelgeneric',
    'angelsad',
    'angelsassy',
    'angelsexy',
    'beauty',
    'bitcoin',
    'bored',
    'catchall',
    'christmas',
    'cryemote',
    'cute',
    'devil',
    'dreamy',
    'explode',
    'flirt',
    'flirthistory',
    'flirtlove',
    'genplay',
    'gliss',
    'good',
    'harpangel',
    'harpgeneric',
    'harpqueen',
    'heaven',
    'hello',
    'irish',
    'laughter',
    'matrix',
    'missyou',
    'morning',
    'night',
    'noresponse',
    'popculture',
    'popmean',
    'random',
    'sarcasm',
    'stupid',
    'swordharp',
    'vacay',
    'wrong',
    'zuck',


];

let triggerLengths = [
    //IMAGES
    11,
    26,
    7,
    13,
    7,
    //GIFS
    1,
    1,
    3,
    12,
    6,
    3,
    1,
    9,
    1,
    5,
    3,
    1,
    1,
    3,
    2,
    3,
    2,
    3,
    8,
    1,
    3, //FLIRTLOVE
    26,
    5,
    2,
    11,
    3,
    5,
    7,
    1,
    1,
    5,
    5,
    2,
    1,
    10,
    2,
    12,
    10,
    5,
    4,
    2, //STUPID
    1,
    1,
    1,
    5,

];
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
        chatWindow.style('bottom', '5%');

        bgLoop.loop();
        outputVolume(0.3);

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
    memeTimer = 1200;
    memeCluster = true;

}

function draw(){
    if (botReady){
        if (timeSinceLastChat >= 30000){
            inactiveChat();
            
        } else {
            timeSinceLastChat += deltaTime;
        }
    }

    if (memeTimer > 0){
        memeTimer-= deltaTime;
    } else {
        let trigger = triggerNames[int(random(triggerNames.length))];
        memeThrower97(convertTriggerToType(trigger), trigger);
        if (memeCluster){
            memeTimer = random(100, 500);
            if (random() > 0.5){
                memeCluster = false;
            }
        } else {
            memeTimer = random(1000, 20000);
            if (random() < 0.6){
                memeCluster = true;
            }
        }
    }
}

function andTheReply(_reply){
    responseLog.push(_reply);
    let trigger;

    if (_reply.includes('&&')){
        trigger = _reply.substring(
            _reply.indexOf('&')+2,
            _reply.lastIndexOf('&')-1
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

    if (trigger != null){
        memeThrower97(convertTriggerToType(trigger), trigger);
    }
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

async function memeThrower97(type, trigger){
    let memeChoice;
    let memeLength = triggerLengths[triggerNames.indexOf(trigger)];

    let newWindow = createDiv().addClass('window');
    newWindow.id('meme');

    let titleBar = createDiv();
    titleBar.addClass('title-bar');

    let titleText;
    let newMeme;

    /// THIS PART WILL BE TYPE DEPENDENT
    memeChoice = int(random(memeLength));
    // console.log(memeChoice);
    
    if (type == 'img'){

        titleText = createDiv('' + trigger.toUpperCase() + '_' + memeChoice + ".PNG");
        newMeme = createImg('' + window.location.href + '/assets/img/memes/' + trigger + '/' + trigger + '_' + memeChoice + '.png');
        
    }
    else if (type == 'gif'){
        titleText = createDiv('' + trigger.toUpperCase() + '_' + memeChoice + ".GIF");
        newMeme = createImg('' + window.location.href + '/assets/gifs/' + trigger + '/' + trigger + '_' + memeChoice + '.gif');
    }

    
    console.log(newMeme);
    // newMeme.attribute('type', 'image');
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

function imgLoadSuccess(){
    console.log('hooray the image loaded!');
}


function convertTriggerToType(trigger){
    let type;
    let t = trigger;
    if (t == "harp" | 
        t == "harpporn" |
        t == "angelimages" |
        t == "selfie" |
        t == "stainedglass")
    {
        type = "img";
    }
    else {
        type = "gif";
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

    console.log("a meme has been purged!");
}

function panic(){
    for (i=0;i<memes.length;i++){
        memes[i].style('top', '150vh');
        memes[i].addClass('dead');
       
    }
    setTimeout(memeCleanup, 3000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function modalOpen(modalName){
    let modal = select(modalName);
    modal.style('top', '5vh');
}

function modalClose(modalName){
    let modal = select(modalName);
    modal.style('top', '-100vh');
}

function mousePressed(){
    userStartAudio();
}

function touchStarted(){
    userStartAudio();
}

function fileExists(url){

    var http = new XMLHttpRequest();

    http.open('HEAD', url, false);
    http.send();

    return http.status != 404;
}

