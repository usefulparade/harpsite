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
let clusterCounter;

let yawnAudio = []
let explosionAudio = []
let glissAudio = []
let heavenAudio = [];

let audioTour, audioMerch, audioAcknowledgments, audioSocialize, audioPanic, audioClose, audioMainGliss, audioUserChat, audioAngelChat;

let unpromptedTriggerNames = [
    'angelimg',
    'angelgeneric',
    'dreamy',
    'flirt',
    'genplay',
    'harpgeneric',
    'heaven',
    'popculture',
    'harp',
    'selfie',
    'tour'
];

let triggerNames = [
    //IMAGES
    'angelimg',
    'harp',
    'harpporn',
    'hello',
    'selfie',
    'stainedglass',
    'tour',
    //GIFS
    'angel', // HAS AUDIO, HEAVEN       // PLUS STAINEDGLASS, PLUS ANGELIMG
    'angelbby',                         
    'angeldevil',
    'angelflirt',
    'angelgeneric',
    'angelsad',
    'angelsassy',
    'angelsexy',
    'beauty',                           // PLUS SELFIE
    'bitcoin',
    'bored', // HAS AUDIO, YAWN
    'catchall',
    'christmas',
    'cryemote',
    'cute',
    'devil',
    'dreamy',
    'explode', // HAS AUDIO, EXPLODE
    'flirt',
    'flirthistory',
    'flirtlove',
    'genplay',
    'gliss', // HAS AUDIO, GLISS
    'good', 
    'harpangel',
    'harpgeneric',                      // PLUS HARP
    'harpqueen',                        // PLUS HARPQUEENIMG
    'heaven', // HAS AUDIO, HEAVEN
    'hello',
    'irish',
    'laughter',
    'matrix',
    'missyou',
    'morning',
    'night',
    'noresponse',
    'popculture', // HAS AUDIO, GLISS
    'popmean',
    'random',
    'sarcasm',
    'stupid',
    'swordharp',
    'vacay',
    'wrong',
    'zuck',
    // 'yawn' // THIS TRIGGER ONLY HAS AUDIO, YAWN
];

let triggerLengths = [
    //IMAGES
    11,
    26,
    7,
    1,
    13,
    7,
    3,
    //GIFS
    1,
    3,
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
    2,
    4,
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

let videoURLs = [
    "https://www.youtube.com/embed/dcQqjKpPgQw",
    "https://www.youtube.com/embed/Nmd2sGFbdDg",
    "https://www.youtube.com/embed/Nz15gbUa-k4",
    "https://www.youtube.com/embed/vVTPbLhlbfI",
    "https://www.youtube.com/embed/3VjgLer8uGg"
];

let bgLoop;

p5.disableFriendlyErrors = true; // disables FES

function preload(){
    bgLoop = loadSound('./assets/audio/bg_loop_v2.wav');
    audioMainGliss = loadSound('./assets/audio/MAINPAGE/maingliss.mp3');
    audioClose = loadSound('./assets/audio/MAINPAGE/close.mp3');
    audioAcknowledgments = loadSound('./assets/audio/MAINPAGE/acknowledgments.mp3');
    audioTour = loadSound('./assets/audio/MAINPAGE/tour.mp3');
    audioSocialize = loadSound('./assets/audio/MAINPAGE/socialize.mp3');
    audioAngelChat = loadSound('./assets/audio/MAINPAGE/chat-angel.mp3');
    audioUserChat = loadSound('./assets/audio/MAINPAGE/chat-user.mp3');
    audioPanic = loadSound('./assets/audio/MAINPAGE/panic_0.mp3');
    audioMerch = loadSound('./assets/audio/MAINPAGE/merch.mp3');

    for (i=0;i<9;i++){
        explosionAudio[i] = loadSound('./assets/audio/EXPLODE/EXPLODE_' + i + '.mp3');
    }

    for (j=0;j<11;j++){
        glissAudio[j] = loadSound('./assets/audio/GLISS/GLISS_' + j + '.mp3');
    }

    for (k=0;k<2;k++){
        heavenAudio[k] = loadSound('./assets/audio/HEAVEN/HEAVEN_' + k + '.mp3');
        yawnAudio[k] = loadSound('./assets/audio/YAWN/YAWN_' + k + '.mp3');
    }


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

        audioUserChat.play();

        await sleep(2000);

        bot.reply(username, chat).then(function(reply){
            andTheReply(reply);
        });
        
    }

    let merchBody = document.getElementById('merch-body')

    for (i=0;i<merchBody.children.length;i++){
        randomizeAnimationTiming(merchBody.children[i]);
    }

    inactiveCounter = 0;
    timeSinceLastChat = 0;
    memeTimer = 12000;
    memeCluster = true;
    clusterCounter = 0;

}

function draw(){
    if (botReady){
        if (timeSinceLastChat >= 30000){
            inactiveChat();
            
        } else {
            timeSinceLastChat += deltaTime;
        }
    }

    //meme repeater!!

    if (memeTimer >= 600){
        
    } else if (memeTimer > 0 && memeTimer < 600){ // if you're in a cluster, keep hitting zero
        memeTimer-= deltaTime;
    } else {
        let trigger = unpromptedTriggerNames[int(random(unpromptedTriggerNames.length))];
        memeThrower97(convertTriggerToType(trigger), trigger);
        if (memeCluster){
            memeTimer = random(100, 500);
            clusterCounter++;
            if (random() > 0.5 || clusterCounter > 3){
                memeCluster = false;
            }
        } else {
            memeTimer = random(6000, 30000);
            // if (random() < 0.6){
            //     memeCluster = true;
            // }
        }
    }
}

function andTheReply(_reply){
    responseLog.push(_reply);
    audioAngelChat.play();
    let trigger;
    let multiple = false;

    if (_reply.includes('&&')){
        trigger = _reply.substring(
            _reply.indexOf('&')+2,
            _reply.lastIndexOf('&')-1
        );

        if (trigger.includes('&&')){
           trigger = trigger.split('&&');
           multiple = true;
        }
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
        if (!multiple){
            memeThrower97(convertTriggerToType(trigger), trigger);
        } else {
            for (i=0;i<trigger.length;i++){
                memeThrower97(convertTriggerToType(trigger[i]), trigger[i]);
            }
        }
        
    }
}

function inactiveChat(){
    if (inactiveCounter < 10){
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

        memeTimer = 0;
        memeCluster = true;

        timeSinceLastChat = 0;
    }
}

async function memeThrower97(type, trigger){
    let memeChoice;
    let memeLength;

    if (type == 'audioOnly'){
        return;
    }
    if (type == 'video'){
        memeLength = videoURLs.length;
    } else {
        memeLength = triggerLengths[triggerNames.indexOf(trigger)];
    }

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
        newMeme = createImg('./assets/img/memes/' + trigger.toUpperCase() + '/' + trigger.toUpperCase() + '_' + memeChoice + '.png');
        
    }
    else if (type == 'gif'){
        titleText = createDiv('' + trigger.toUpperCase() + '_' + memeChoice + ".GIF");
        newMeme = createImg('./assets/gifs/' + trigger.toUpperCase() + '/' + trigger.toUpperCase() + '_' + memeChoice + '.gif');
    } else if (type == 'video'){
        titleText = createDiv('' + trigger.toUpperCase() + '_' + memeChoice + ".MOV");
        newMeme = createDiv('<iframe width="560" height="315" src="' + videoURLs[memeChoice] + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    }

    
    console.log(newMeme);
    // newMeme.attribute('type', 'image');
    /// END TYPE DEPENDENT

    titleText.addClass('title-bar-text');

    let titleControls = createDiv().addClass('title-bar-controls');
    let closeButton = createButton().attribute('aria-label', 'Close');
    closeButton.html('');

    closeButton.mousePressed(function(){
        audioClose.play();
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

    if (windowWidth > 720){
        newWindow.style('width', '' + random(20, 40) + '%');
    } else {
        newWindow.style('width', '' + random(35, 60) + '%'); // big memez for small screenz
    }

    newWindow.position(random(0, windowWidth*.7), random(50, windowHeight*.6));

    dragElement(newWindow.elt); 
    // dragElementp5(newWindow);

    memes.push(newWindow);
    
}

function imgLoadSuccess(){
    console.log('hooray the image loaded!');
}


function convertTriggerToType(trigger){
    let type;
    let t = trigger;
    if (t == "harp" || 
        t == "harpporn" ||
        t == "angelimg" ||
        t == "selfie" ||
        t == "stainedglass" ||
        t == "angelbby" ||
        t == "hello" ||
        t == "tour")
    {
        type = "img";
    } 
    else if (t == "debussy")
    {
        type = "video";
    } 
    else if (t == 'yawn')
    {
        type = 'audioOnly';
    }
    else 
    {
        type = 'gif';
    }

    //MULTIPLE TRIGGERS
    if (t == "angel"){
        memeThrower97(convertTriggerToType('stainedglass'), 'stainedglass');
        memeThrower97(convertTriggerToType('angelimg'), 'angelimg');
    } else if (t == "beauty"){
        memeThrower97(convertTriggerToType('selfie'), 'selfie');
    } else if (t == "harpgeneric"){
        memeThrower97(convertTriggerToType('harp'), 'harp');
    } else if (t == "harpqueen"){
        memeThrower97(convertTriggerToType('harpqueenimg'), 'harpqueenimg');
    }
    
    //AUDIO TRIGGERS
    if (t == 'angel' ||
        t == 'bored' ||
        t == 'explode' ||
        t == 'gliss' ||
        t == 'heaven' ||
        t == 'popculture' ||
        t == 'yawn' )
    {
        audioCue(t);
    }

    return type;

}

function audioCue(t){
    if (t == 'angel' || t == 'heaven'){
        heavenAudio[int(random(heavenAudio.length))].play();
    } else if (t == 'bored' || t == 'yawn'){
        yawnAudio[int(random(yawnAudio.length))].play();
    } else if (t == 'explode'){
        explosionAudio[int(random(explosionAudio.length))].play();
    } else if (t == 'gliss' || t == 'popculture'){
        glissAudio[int(random(glissAudio.length))].play();
    }
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
    // audioClose.play();
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


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // drag from the title bar!
    elmnt.children[0].onmousedown = dragMouseDown;
    elmnt.children[0].children[1].children[0] = closeDragElement;
  
    function dragMouseDown(e) {
        elmnt.style.transition = "top 0s";
        document.body.append(elmnt);
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
        // console.log(e.clientX);
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

    //   console.log("element offest top: " + elmnt.offsetTop + ", mouseY offset from last frame:" + pos2 + ", difference: " + (elmnt.offsetTop - pos2));
       
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      elmnt.style.transition = "top 1s";
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

function randomizeAnimationTiming(elmnt){
    elmnt.style.animationDelay = "" + random(0, 2) + "s";
}

function dragElementp5(memeWindow) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // drag from the title bar!
    memeWindow.elt.children[0].onmousedown = dragMouseDown;
    memeWindow.elt.children[0].children[1].children[0] = closeDragElement;
  
    function dragMouseDown(e) {
        memeWindow.elt.style.transition = "top 0s";
        document.body.append(memeWindow.elt);
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = mouseX;
      pos4 = mouseY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
        // console.log(e.clientX);
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - mouseX;
      pos2 = pos4 - mouseY;
      pos3 = mouseX;
      pos4 = mouseY;

    //   console.log("element offest top: " + elmnt.offsetTop + ", mouseY offset from last frame:" + pos2 + ", difference: " + (elmnt.offsetTop - pos2));
       
      // set the element's new position:
      let newX = (memeWindow.position.x - pos1);
      let newY = (memeWindow.position.y - pos2);
      memeWindow.position(newX, newY);
    
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      memeWindow.elt.style.transition = "top 1s";
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

