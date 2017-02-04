// ############################  GENERAL SETTINGS ##########################
//
// Order of presentation.
var shuffleSequence = seq(//"Bio","Practice",
                          "Tutorial"
                          //,rshuffle(startsWith("GoBack"),startsWith("Stop"),startsWith("GoFirst"),startsWith("NeverGo")),
                          //"PostExp"
                          );
// No progressbar
var showProgressBar = false;
// Where we will look for the ressources
var host = "http://files.lab.florianschwarz.net/ibexfiles/Pictures/"//"https://raw.githubusercontent.com/Yu-an/ExhZSSPCb/master/chunk_includes/";
var defaults = [
    "DynamicQuestion", {
        clickablePictures: false,
        //enabled:false,
        continueMessage: "单击此处继续"
    }
];
var score = 0; // The score in the experiment
//
// #########################################################################


// ############################  TUTORIAL INTERFACE SETTINGS ##########################
//
// The counter of good and bad clicks        
var counterGood = 0, counterBad = 0,
// What to do and the text to display for the first bad click
    badClick = function() {
      score--;
      $('#score').html(score);
      $('#score').css({color: "red", "font-weight": "bold"});
      setTimeout(function(){$('#score').css({color: "black", "font-weight": "normal"});}, 2000);
      if (counterBad > 0) { $(this).css('display', 'none'); return; }
      counterBad++;
      //$(this).tooltip({content: "Do not click on this one!", valign:"middle", halign:"right", yoffset:-0.5});
      //$('#score').tooltip({content: "As you can see, your score is decreasing, because you made an error.",
      //                     valign:"top", halign:"right", yoffset:-0.5});
    },
// What to do and the text to display for the first good click
    goodClick = function() {
      if (counterGood > 0) { $(this).css('display', 'none'); return; }
      counterGood++;
      //$(this).tooltip({content: "Good job!", valign:"middle", halign:"right", yoffset:-0.5});
      //$('#score').tooltip({content: "Your score is left unaffected: your click was optimal.",
      //                     valign:"top", halign:"right", yoffset:-0.5});
    };
//
// #########################################################################


// Returns an <img> tag
function img(picture) {
    return "<img src='"+host+picture+"' />";
}


// General list of items
var items = [
    /*["Bio",
      //type
      "Form",
      //obligatory option that includes a HTML file that is a questionnaire
      {html: { include: "example_intro.html" }, 
      validators: {
        //age has to be a number
        age: function (s) { if (s.match(/^\d+$/)) return true; else return "年龄只能为数字"; }
        }  
        } ],*/
    
    // ########        FIRST TUTORIAL SCREEN       ########
    ["Tutorial", "DynamicQuestion", {
        question: "Tutorial",
        answers: [],
        elements: [
              "<h2 id='title'>练习</h2>",
              "<p id='intro'>感谢您的参与！</p>",            
              TT("#intro", "请单击 '>>' 继续。", ">>"),
              {pause: "key\x01"},
              "<p id='proceed'>接下来将为您介绍我们的实验。</p>",
              TT("#proceed", "这个对话框将提示您如何继续完成操作。", ">>"),
              {pause: "key\x01"}
        ]
    }],
    // ########        SECOND TUTORIAL SCREEN       ########    
    ["Tutorial", "DynamicQuestion", {
        enabled: false,
        question: "Tutorial",
        answers: {
              False: ["F", "F: <b>左图</b>"],
              True: ["J", "J: <b>右图</b>"]
        },
        elements: [
              "<b>得分</b> <span id='score' />",
              //Audio file type MP3 should be speficied, as mpeg
              "<p id='sentence'> </p>",
              "<audio src= 'https://raw.githubusercontent.com/Yu-an/ExhZSSPCb/master/chunk_includes/sound/Prac1-t.MP3' type='audio/mpeg' controls='controls' autoplay='autoplay'> </audio>",
              $("<div id='pic'>").append(
                  newCalendar([{person: "orchard.png", wednesday:getCoveredPic("dress.png", goodClick)}])
              ),
              {func: function(t){ $("#score").html(score); $("#wednesday0").attr("dontClick", true); }},
              TT(".patches", "在接下来的实验中，你将听到笑笑和淘淘的几段对话。每段对话都描述了一幅图片"+
                             "每段对话结束后，会出现两幅图。其中一幅图被黑幕遮住了。两幅图片中，只有一幅是笑笑和淘淘描述的图片。", ">>", "ml"),
              {pause: "key\x01"},
              {this: "choice"},
              TT(".DynamicQuestion-choice", "请根据对话提供的信息，判断笑笑和淘淘看到的是黑幕遮住的图片，还是没有被遮住的图片。", ">>", "bc"),
              {pause: "key\x01"},
              TT("#True span", "如果你认为笑笑和淘淘看到的是 <span style='font-weight: bold;'>没有被遮住的图</span>，"+
                                            "请在键盘上按<span style='font-weight: bold;'>F</span>。", ">>", "ml"),
              {pause: "key\x01"},
              TT("#False span", "如果你认为他们看到的是<span style='font-weight: bold;'>被遮住的图</span>, "+
                                            "请在键盘上按 <span style='font-weight: bold;'>F</span>.", ">>", "ml"),
              {pause: "key\x01"},
              TT("#wednesday0", "点击黑幕查看被遮住的图片", ">>", "ml"),
              {pause: "key\x01"},
              {func: function(t){ 
                  $("#wednesday0").removeAttr("dontclick");
                  t.safeBind($("#wednesday0"), "click", function() {
                      if ($(this).attr("dontclick") != undefined) return;
                      t.justClickedOn = $(this);
                      t.unpause(1);
                  });
              }},
              {pause: "key\x01"},
              /*{func: function(t){ 
                  var tt = t.justClickedOn.tooltip({content: "请单击黑幕查看被遮住的图片。", delay: ">>", xoffset: -0.5});
                  $("#wednesday0").attr("dontclick", true);
                  t.safeBind(tt.find("span.ttValidator"), "click", function() { t.unpause(1); });
                  t.safeBind($(document),"keydown", function(e) { if (tt.parent().length && e.keyCode == 32) { tt.remove(); t.unpause(1); } });
              }},
              {pause: "key\x01"},
              {func: function(t){
                  if (t.justClickedOn.attr("id") == "wednesday0") $("#person0").removeAttr("dontclick");
                  else $("#person0").removeAttr("dontclick");
              }},
              {pause: "key\x01"},*/
              TT("#True span", "拿掉黑幕，我们发现被遮住的图片和对话内容相符。"+
                               "因此，请在键盘上按'J' 选择被遮住的图片。", ">>", "ml"),
              {func: function(t){ $("wednesday0").attr("dontclick", true); }},
              {pause: "key\x01"},
              {func: function(t){
                  t.safeBind($(document),"keydown", function(e) { 
                    if (e.keyCode == 'J'.charCodeAt(0)) {
                        score += 5;
                        t.finishedCallback();
                    }
                    else if (e.keyCode == 'F'.charCodeAt(0)) {
                        var tt = $("#False span").tooltip({content: "被遮住的图片更符合对话信息，请按'J'.", delay: ">>", xoffset: -1});
                        t.safeBind($(document),"keydown", function(e) { if (tt.parent().length && e.keyCode == 32) { tt.remove(); } });
                    }
                  });
              }}
        ]
    }],

    // ########        THIRD TUTORIAL SCREEN       ########    
/*    ["Tutorial", "DynamicQuestion", {
        enabled: false,
        question: "Tutorial",
        answers: {
              False: ["F", "F: <b>False</b>"],
              True: ["J", "J: <b>True</b>"]
        },
        elements: [
              "<b>Tutorial, Score:</b> <span id='score' />",
              "<p id='sentence'>Only Mary went to the orchard for the first time on Wednesday.</p>",
              $("<div id='pic'>").append(
                  newCalendar([{person: "boy_Liam.png", monday:getCoveredPic("orchard.png", goodClick),
                                                        tuesday: getCoveredPic("orchard.png", goodClick),
                                                        wednesday: "orchard.png"},
                               {person: "boy_Don.png", monday: "orchard.png", tuesday: "orchard.png", wednesday: "orchard.png"},
                               {person: "girl_Mary.png", monday: "aquarium.png", tuesday: "aquarium.png", wednesday: "orchard.png"}])
              ),
              {func: function(t){ $("#score").html(score); $("#monday0, #tuesday0").attr("dontClick", true); }},
              //TT(".patches", "The description always comes along with a picture.", ">>", "ml"),
              TT("#score", "Each time you give a right answer, you score 5 points.", ">>", "mr"),
              {pause: "key\x01"},
              {this: "choice"},
              TT(".DynamicQuestion-choice", "You will tell whether the picture matches the description.", ">>", "bc"),
              {pause: "key\x01"},
              TT("#True span", "If you think the picture makes the description <span style='font-weight: bold;'>true</span>, "+
                                            "you will press <span style='font-weight: bold;'>J</span> on your keyboard.", ">>", "ml"),
              {pause: "key\x01"},
              TT("#False span", "If you think the picture makes the description <span style='font-weight: bold;'>false</span>, "+
                                            "you will press <span style='font-weight: bold;'>F</span>.", ">>", "ml"),
              {pause: "key\x01"},
              TT("#tuesday0", "Parts of the picture are obscured by a black layer: you can't tell whether the description is true or false. "+
                              "Click on the black box to reveal what is behind", ">>", "ml"),
              {pause: "key\x01"},
              {func: function(t){
                  $("#monday0, #tuesday0").removeAttr("dontclick");
                  t.safeBind($("#monday0, #tuesday0"), "click", function() {
                      if ($(this).attr("dontclick") != undefined) return;
                      t.justClickedOn = $(this);
                      t.unpause(1);
                  });
              }},
              {pause: "key\x01"},
              {func: function(t){
                  var tt = t.justClickedOn.tooltip({content: "Great, now click on the other black box.", delay: ">>", xoffset: -0.5});
                  $("#monday0, #tuesday0").attr("dontclick", true);
                  t.safeBind(tt.find("span.ttValidator"), "click", function() { t.unpause(1); });
                  t.safeBind($(document),"keydown", function(e) { if (tt.parent().length && e.keyCode == 32) { tt.remove(); t.unpause(1); } });
              }},
              {pause: "key\x01"},
              {func: function(t){
                  if (t.justClickedOn.attr("id") == "monday0") $("#tuesday0").removeAttr("dontclick");
                  else $("#monday0").removeAttr("dontclick");
              }},
              {pause: "key\x01"},
              {func: function(t){
                  var tt = t.justClickedOn.tooltip({content: "Perfect, now you can see that the description matches the picture. "+
                                                             "Press 'J' to signal the sentence is true.", delay: ">>", xoffset: -0.5});
                  $("#monday0, #tuesday0").attr("dontclick", true);
                  t.safeBind(tt.find("span.ttValidator"), "click", function() { t.unpause(1); });
                  t.safeBind($(document),"keydown", function(e) { if (tt.parent().length && e.keyCode == 32) { tt.remove(); t.unpause(1); } });
              }},
              {pause: "key\x01"},
              {func: function(t){
                  t.safeBind($(document),"keydown", function(e) {
                    if (e.keyCode == 'J'.charCodeAt(0)) t.finishedCallback();
                    else if (e.keyCode == 'F'.charCodeAt(0)) {
                        var tt = $("#False span").tooltip({content: "The description is true, you should press 'J'.", delay: ">>"});
                        t.safeBind($(document),"keydown", function(e) { if (tt.parent().length && e.keyCode == 32) { tt.remove(); } });
                    }
                  });
              }}

        ]
    }]
*/      
    ].concat(
    GetItemFrom(data, null, {
        ItemGroup: ["item","Group"],
        Elements: [
          "Condition",   // Name
          function(x){return "DynamicQuestion";}, // Controller
          {question: function(x){return [x.TestSentence,x.Expt,x.Condition,x.Group,x.Item].join("+");},
           answers: function(x){return {
              visible:["F", c2u.newPicture(host+"fullweek/pic1_i"+x.item+"_g"+x.Group+".png", 
                                 [c2u.newPatch({func: c2u.defaultDayFunction}).asTuesdayTop(),
                                 c2u.newPatch({func: c2u.defaultDayFunction}).asMondayBottom(),
                                 c2u.newPatch({func: c2u.defaultDayFunction}).asWednesdayBottom()]
                               )],
              covered:["J", c2u.newPicture(host+"fullweekcovered/pic1_i"+x.item+"_g"+x.Group+".png")]
              };
           },
           elements: function(x){
              return ["<b>Condition:</b> "+x.Condition+", <b>Group:</b> "+x.Group+", <b>Sentence:</b> "+x.TestSentence+", <b>Score:</b> <span id='score' />",
                     //"Context Sentence",
                     //x.Context_Sentence,
                     {func: function(t){ $('#score').html(score); }},
                     "<table style='text-align:center; font-weight:bold; width:100%;'><tr><td>F</td><td>J</td></tr></table>",
                     {this: "choice", onClick: function(answer, t) { score++; }},
                     /*
                     {func: function(t){                     // And show the fullweek pictures
                         $("#visible span img").attr("src", host+"fullweek/pic1_i"+x.item+"_g"+x.Group+".png");
                         //$("#covered span img").attr("src", host+"fullweekcovered/pic1_i"+x.CoveredItem+"_g"+x.group+".png"); 
                         $("#covered span img").attr("src", host+"fullweekcovered/pic1_i"+x.item+"_g"+x.Group+".png"); 
                     }},
                     
                     {pause: 500},                           // Wait 0.5 seconds
                     //{audio: host+"Audio/"+x.test_sound_filename+".wav"},
                     //x.Test_Sentence,                        // As well as the test sentence
                     //{audio: host+"Audio/"+x.soundfile},
                     {pause: 400},                           // Wait 0.4 seconds
                     {func: function(t){ t.enabled=true; }}  // Enable picture choice
                      */
                     ];
              }
          }]
    }));

