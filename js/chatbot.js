let num = 37555;

let username;

function setup(){
    noCanvas();
    
    let bot = new RiveScript();

    bot.loadFile([
        "./rive/subs.rive",
        "./rive/brain.rive"
      ]).then(brainReady).catch(brainError);

    function brainReady(){
        console.log("angel bb is ready");

        username = "local-user";

        // Now the replies must be sorted!
        bot.sortReplies();
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
        
        let chatP = createP(">> " + chat);
        chatP.id('user');
        chatP.parent(output);
        userinput.value('');
        outputDiv.scrollTop = outputDiv.scrollHeight;

        await sleep(2000);

        bot.reply(username, chat).then(function(reply) {
            
            let newReply = createP(">> " + reply);
            newReply.id('bb');
            newReply.parent(output);
            outputDiv.scrollTop = outputDiv.scrollHeight;
            // output.html(reply);
        });
        
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



