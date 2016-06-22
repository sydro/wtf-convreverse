function revert_string(message) {
  var arr_message = message.split("");
  var size = message.length;
  var j = size - 1;
  var i = 0;

  for(i=0; i<j; i++)
    {
      var temp = arr_message[i];
      arr_message[i] = arr_message[j];
      arr_message[j] = temp;
      j--;
    }

  i=0;
  j=0;

  return arr_message.join("");
}

function change_chars(rev_message) {
  var message_temp = "";
  var size = rev_message.length;
  var j = size;

  for(i=0; i<j; i++) {

    var temp_code = rev_message.charCodeAt(i);
    var offset = 0;
    var coded = false;

    if (temp_code >= 33 && temp_code <=126) { coded=true; offset = 33; }

    var pos = temp_code - offset;

    if (coded) {
      message_temp = message_temp.concat(keysmap[pos]);
    } else {
      if (pos < 0 ) {
        message_temp = message_temp.concat("");
      } else {
        message_temp = message_temp.concat(rev_message[i]);
      }
    }
  }
  return message_temp;
}

function replace_special_chars(message) {
  message_rpl = message.replace("&amp;","&");
  message_rpl = message_rpl.replace("&quot;","\"");
  message_rpl = message_rpl.replace("&lt;","<");
  message_rpl = message_rpl.replace("&gt;",">");

  return message_rpl;
}

function add_observe_on_input() {
    var inp_obj = document.getElementsByClassName('input')[1]

    var change_msg_lst = function (event) {

      if ( chrome.runtime == undefined) {
        inp_obj.removeEventListener("keypress", change_msg_lst, false);
        console.log("listener OFF");
      }
      // console.log(event.keyCode);
      if (event.keyCode === 13 ) {
        //console.log("processing of the message");
        event.stopPropagation();
        messagge = document.getElementsByClassName('input')[1].innerHTML
        messagge = replace_special_chars(messagge);
        //change_chars(revert_string(messagge));
        document.getElementsByClassName('input')[1].innerHTML = change_chars(revert_string(messagge));
        //setTimeout(function(){ $('.icon-send').click() }, 500);
       }
    };

    //console.log("converted messagge");
    inp_obj.addEventListener("keypress", change_msg_lst, false);
}

function Detection(){

       var body_obj = document.querySelector('.app.two')
       // create an observer instance
       var observer = new MutationObserver(function(mutations) {
         mutations.forEach(function(mutation) {
           console.log("aggiunta chat");
           setTimeout(function(){ add_observe_on_input() }, 1000);
         });
       });

       // configuration of the observer:
       var config = { attributes: true, childList: true, characterData: true };

       // pass in the target node, as well as the observer options
       observer.observe(body_obj, config);
}


$(document).ready( function() {
  setTimeout(function(){ Detection(); alert("WTF ConvReverse enabled!") }, 10000);
});
