/*
Modified based on the template of 
--Toronto-Psycholinguistics-Experiments--

Template that gives examples of everything Ibex can do for experiments
*/

var shuffleSequence = seq("intro", "prac1", "prac1r");
var practiceItemTypes = ["prac1"];
var centerItems = true;
var showProgressBar = true;
var progressBarText = "进度";
var pageTitle = "中文语感调查";

var defaults = [
    "Separator", {
        transfer: 1000, //wait for 1000ms
          //other options: "keypress", "click"
        normalMessage: "请听下一段对话。", //message to be displayed
        errorMessage: "出现错误，请听下一段对话。" //message to be displayed in red
    },

    "Message", {
        //"html" option is obligatory
        hideProgressBar: true,
        transfer: "keypress"
    },

    "DashedSentence", {
        //"s" option is obligatory
        mode: "self-paced reading"
          //other option: "speeded acceptability"
    },

    "Question", {
        //"as" option is obligatory
       // as: ["Yes", "No"],
       // hasCorrect: true
          //if a question has a correct answer,
            //keep it as the first element of the "as" option
    },


    //These settings are needed for audio Type 1
    "AcceptabilityJudgment", {
        //"s" option is obligatory
        //"q" option is obligatory
        //"as" option is obligatory
        //as: ["OK"],
        //writing the "as" option here means that this is the default for
        //all AcceptabilityJudgment items
        presentAsScale: false, //presents the "as" option as a scale
        instructions: "请点击图片继续",
        // leftComment: "(Bad)", //displayed on the left side of the scale
        // rightComment: "(Good)", //displayed on the right side of the scale
        //only two audio options available so far
        audioMessage: { html: "<u>单击此处播放对话/u>" },
        audioTrigger: "click"
        //do not change this
        //click, we do have another option at this point of time
    },

    "DashedAcceptabilityJudgment", {
        //combination of AcceptabilityJudgment and DashedSentence
        //"s" option is obligatory
        //"q" option is obligatory
        //"as" option is obligatory
        hasCorrect: false
    },

    "Form", {
        //"html" option is obligatory
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: false,
    }
];

var items = [

    /*
    ===================
    SEPARATOR
    The pause needed between each item of the experiment
    ===================
    */

    //ends after timer (1000ms)
    //["sep", "Separator", {transfer: 1000, normalMessage: "请听下一段对话。"}],

    //ends when key is press
    //  ["sep", "Separator", {transfer: "keypress", normalMessage: "按任意键继续"}],


    /*
    ===================
    INTRODUCTION
    Can include files for Questionnaires, consent forms etc...
    ===================
    */

    //name of controller
    ["intro",
      //type
      "Form",
      //obligatory option that includes a HTML file that is a questionnaire
      {html: { include: "example_intro.html" }, 
      validators: {
        //age has to be a number
        age: function (s) { if (s.match(/^\d+$/)) return true; else return "年龄只能为数字"; }
        }  
        } ],
      
	
    ["prac1","AcceptabilityJudgment", {s:  {audio: "https://raw.githubusercontent.com/Yu-an/ExhZSSPCb/master/chunk_includes/sound/Prac1-t.MP3"}},
                        "Question", {instructions: "接下来您将会看到两幅图片，其中的一幅被遮挡为黑色。这两幅图片中，只有一幅与对话描述信息完全吻合。请根据对话选择相应的图片。", q: '以上对话可能在描述哪一幅图片？',
                        as: ["https://raw.githubusercontent.com/Yu-an/ExhZSSPCb/master/chunk_includes/image/CB.png",
                            "https://raw.githubusercontent.com/Yu-an/ExhZSSPCb/master/chunk_includes/image/Prac1.png"
                            ]}
                                       ],
    //["prac1r","Message", {html: {include: "Prac1.html"}, transfer: 'keypress'}],

	

];


