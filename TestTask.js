(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:



// stage content:
(lib.TestTask = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		// Импорт подготовленных данных тасков в код
		var TaskUrl = '/task/task.txt';
		var NewTaskTxt;
		var RequestTaskUrl = new XMLHttpRequest();
		RequestTaskUrl.open('GET', TaskUrl, true);
		RequestTaskUrl.responseType = 'blob';
		RequestTaskUrl.onload = function() {
		  NewTaskTxt = new FileReader();
		  NewTaskTxt.readAsText(RequestTaskUrl.response);
		  NewTaskTxt.onload = function(e) {
		    Add_Task_Block.bind(this)(e.target.result);
		  };
		};
		RequestTaskUrl.send();
		// Создание статичного интерфейса
		var InterfaceCon = new createjs.Container();
		var TopBlockCon = new createjs.Container();
		var AddTaskCon = new createjs.Container();
		var TaskBlockCon = new createjs.Container();
		var EditTaskCon = new createjs.Container();
		InterfaceCon.addChild(AddTaskCon, TopBlockCon);
		this.addChild(InterfaceCon, TaskBlockCon, EditTaskCon);

		var COLOR_ARRAY = ['rgb(81, 85, 255)', 'rgb(81, 130, 255)', 'rgb(255, 196, 81)', 'rgb(255, 234, 177)', 'rgb(158, 173, 228)', 'rgb(158, 228, 196)', 'rgb(246, 114, 117)', 'rgb(114, 213, 200)', 'rgb(69, 204, 51)'];

		var TOP_RECT_COLOR = COLOR_ARRAY[0];
		var TOP_BTN_COLOR = COLOR_ARRAY[1];
		var TAST_TOP_COLOR = COLOR_ARRAY[2];
		var TASK_MID_COLOR = COLOR_ARRAY[3];
		var ADD_TASK_RECT_COLOR = COLOR_ARRAY[4];
		var BTN_ADD_TASK_COLOR = COLOR_ARRAY[5];
		var CLOSE_BTN_TASK_COLOR = COLOR_ARRAY[6];
		var EDIT_BTN_TASK_COLOR = COLOR_ARRAY[7];
		var STATUS_BTN_TASK_COLOR = COLOR_ARRAY[8];

		var TopBlockText_Array = ['All tasks', 'Active tasks', 'Completed tasks'];
		var ACTIVE_TAB = 0;
		// СОздание интерфейса----------------------------------------------------------
		Add_New_Interface.bind(this)();

		function Add_New_Interface() {
		  Add_Top_Block.bind(this)();
		  Add_Change_Task_Block.bind(this)();
		}

		function Add_Top_Block() {
		  var Rect1 = new createjs.Shape();
		  Rect1.graphics.beginFill(TOP_RECT_COLOR).dr(0, 0, window.innerWidth, 100);

		  var Title1 = new createjs.Text('Test Task', '50px Arial', 'black');
		  Title1.textAlign = 'center';
		  Title1.textBaseline = 'middle';
		  Title1.setTransform(window.innerWidth / 2, Rect1.graphics.command.h / 2);

		  var Rect2_W = (window.innerWidth + 1) / TopBlockText_Array.length;
		  var START_X = -0.5;
		  for (var i = 0; i < TopBlockText_Array.length; i++) {
		    var Rect2 = new createjs.Shape();
		    Rect2.graphics.setStrokeStyle(1).beginStroke('black').beginFill(TOP_BTN_COLOR).dr(0, 0, Rect2_W, 25);
		    Rect2.setTransform(START_X, Rect1.graphics.command.h + 0.5);
		    Rect2.name = 'TopBtn_' + i;

		    var Title2 = new createjs.Text(TopBlockText_Array[i], '20px Arial', 'black');
		    Title2.textAlign = 'center';
		    Title2.textBaseline = 'middle';
		    Title2.setTransform(Rect2.x + Rect2.graphics.command.w / 2, Rect2.y + Rect2.graphics.command.h / 2);

		    START_X += Rect2_W;
		    TopBlockCon.addChild(Rect2, Title2);
		    Rect2.on('click', Top_Btn_Click.bind(this))
		  }
		  TopBlockCon.addChild(Rect1, Title1);

		  var TaskBG = new createjs.Shape();
		  TaskBG.graphics.beginFill('rgb(204, 204, 204)').dr(0, 0, window.innerWidth - 250, window.innerHeight - (TopBlockCon.getChildByName('TopBtn_0').graphics.command.h + TopBlockCon.getChildByName('TopBtn_0').y))
		  TaskBG.setTransform(0, TopBlockCon.getChildByName('TopBtn_0').graphics.command.h + TopBlockCon.getChildByName('TopBtn_0').y + 1)
		  TaskBG.name = 'TaskBG';
		  InterfaceCon.addChild(TaskBG);
		  TaskBlockCon.mask = TaskBG;
		}

		function Add_Task_Block(t) {
		  var START_X = 50;
		  var START_Y = TopBlockCon.getChildByName('TopBtn_0').y + TopBlockCon.getChildByName('TopBtn_0').graphics.command.h + 50;

		  var NumTasks = t.split(/\r\n|\r|\n/);

		  for (var i = 0; i < NumTasks.length; i++) {
		    var TaskName = NumTasks[i].substr(0, NumTasks[i].indexOf(' '));
		    var TaskTitleText = NumTasks[i].substr(NumTasks[i].indexOf("'") + 1, NumTasks[i].indexOf("'", NumTasks[i].indexOf("'") + 1) - (NumTasks[i].indexOf("'") + 1));
		    var TaskMainText = NumTasks[i].substr(NumTasks[i].indexOf('MainText:') + 11, NumTasks[i].indexOf("'", NumTasks[i].indexOf('MainText:') + 11) - (NumTasks[i].indexOf('MainText:') + 11))
		    var TaskStatus = NumTasks[i].indexOf('true') != -1 ? true : false;

		    Add_New_Task_Block.bind(this)(START_X, START_Y, TaskName, TaskTitleText, TaskMainText, TaskStatus);
		    START_Y += 265;
		  }

		}

		function Add_Change_Task_Block() {
		  var Rect1 = new createjs.Shape();
		  Rect1.graphics.beginFill(ADD_TASK_RECT_COLOR).dr(0, 0, 250, window.innerHeight - (TopBlockCon.getChildByName('TopBtn_0').graphics.command.h + TopBlockCon.getChildByName('TopBtn_0').y));
		  Rect1.setTransform(window.innerWidth - Rect1.graphics.command.w, TopBlockCon.getChildByName('TopBtn_0').y + TopBlockCon.getChildByName('TopBtn_0').graphics.command.h)

		  var Text1 = new createjs.Text('Form a new task', '20px Arial', 'black');
		  Text1.textAlign = 'center';
		  Text1.setTransform(Rect1.x + Rect1.graphics.command.w / 2, Rect1.y + 25);

		  // var c = document.getElementById('InputTitle');

		  var Rect2 = new createjs.Shape();
		  Rect2.graphics.beginFill(BTN_ADD_TASK_COLOR).dr(0, 0, 200, 50);
		  Rect2.setTransform(Rect1.x + 25, window.innerHeight - Rect2.graphics.command.w);
		  Rect2.name = 'Btn';

		  var Text2 = new createjs.Text('Add a new task', '20px Arial', 'black');
		  Text2.textAlign = 'center';
		  Text2.setTransform(Rect2.x + Rect2.graphics.command.w / 2, Rect2.y + 15);
		  Text2.name = 'BtnText';

		  Rect2.on('click', Add_New_Task_Click.bind(this));

		  AddTaskCon.addChild(Rect1, Text1, Rect2, Text2);
		}
		// работа с тасками-------------------------------------------------------------
		function Add_New_Task_Block(START_X, START_Y, TaskName, TaskTitleText, TaskMainText, TaskStatus) {
		  var TaskCon = new createjs.Container();

		  var RectTop = new createjs.Shape();
		  RectTop.graphics.beginFill(TAST_TOP_COLOR).dr(0, 0, window.innerWidth - START_X * 2 - 250, 50);

		  var RectBot = new createjs.Shape();
		  RectBot.graphics.beginFill(TASK_MID_COLOR).dr(0, 0, RectTop.graphics.command.w - 30, 200);
		  RectBot.setTransform(15, RectTop.graphics.command.h);

		  var Circle1 = new createjs.Shape();
		  Circle1.graphics.setStrokeStyle(1).beginFill(CLOSE_BTN_TASK_COLOR).dc(0, 0, 10);
		  Circle1.graphics.setStrokeStyle(1).beginStroke('black').moveTo(-6, -6).lineTo(6, 6);
		  Circle1.graphics.moveTo(-6, 6).lineTo(6, -6);
		  Circle1.setTransform(RectTop.graphics.command.w - 15, RectTop.graphics.command.h / 2);
		  Circle1.name = 'Close';

		  var Circle2 = new createjs.Shape();
		  Circle2.graphics.setStrokeStyle(1).beginFill(EDIT_BTN_TASK_COLOR).dc(0, 0, 10);
		  Circle2.graphics.setStrokeStyle(1).beginStroke('black').moveTo(-6, 5).lineTo(6, 5);
		  Circle2.graphics.setStrokeStyle(1).beginStroke('black').moveTo(1, -6).lineTo(-2, 2).lineTo(0, 5).lineTo(2, 2).lineTo(5, -5);
		  Circle2.setTransform(Circle1.x - 30, Circle1.y);
		  Circle2.name = 'Edit';

		  var Circle3 = new createjs.Shape();
		  Circle3.graphics.beginFill(STATUS_BTN_TASK_COLOR).dc(0, 0, 10);
		  Circle3.graphics.setStrokeStyle(1).beginStroke('black').beginFill('rgba(0,0,0,0)').moveTo(-5, -2).lineTo(0, 6).lineTo(5, -5);
		  Circle3.setTransform(RectBot.x + RectBot.graphics.command.w - 15, RectBot.y + RectBot.graphics.command.h - Circle3.graphics._instructions[1].radius - 5);
		  Circle3.name = 'Done';

		  var Title1 = new createjs.Text(TaskTitleText, '25px Arial', 'black');
		  Title1.textAlign = 'left';
		  Title1.textBaseline = 'middle';
		  Title1.setTransform(5, RectTop.graphics.command.h / 2);
		  Title1.mask = RectTop;
		  Title1.name = 'Title'

		  var TextTask = new createjs.Text(TaskMainText, '20px Arial', 'black');
		  TextTask.textAlign = 'left';
		  TextTask.lineWidth = RectBot.graphics.command.w - 5 - Circle3.graphics.command.radius * 2;
		  TextTask.setTransform(RectBot.x + 5, RectBot.y + 5);
		  TextTask.mask = RectBot;
		  TextTask.name = 'Text';

		  TaskCon.addChild(RectTop, RectBot, Circle1, Circle2, Circle3, Title1, TextTask);
		  TaskCon.Active = TaskStatus;
		  TaskCon.name = TaskName;
		  TaskCon.setTransform(START_X, START_Y);
		  TaskBlockCon.addChild(TaskCon);
		  Sort_Tasks_Blocks.bind(this)();


		  Circle3.on('click', Change_Task_Status_Click.bind(this));
		  Circle1.on('click', Close_Task_Click.bind(this), null, true);
		  Circle2.on('click', Edit_Task_Click.bind(this), null, true);
		  Update_Task_Doc.bind(this)(TaskCon);

		  if (ACTIVE_TAB == 0) {
		    TaskStatus == true ? TaskCon.alpha = 1 : TaskCon.alpha = 0.5;
		  } else if (ACTIVE_TAB == 1) {
		    TaskStatus == true ? TaskCon.alpha = 1 : TaskCon.alpha = 0;
		  } else if (ACTIVE_TAB == 2) {
		    TaskStatus == true ? TaskCon.alpha = 0 : TaskCon.alpha = 0.5;
		  }

		}

		function Sort_Tasks_Blocks() {
		  var TITLE_ARRAY = [];
		  for (var i = 0; i < TaskBlockCon.children.length; i++) {
		    if (TaskBlockCon.children[i].name && TaskBlockCon.children[i].name.substr(0, 1) == 'T' && TaskBlockCon.children[i].alpha > 0) {
		      TITLE_ARRAY.push([TaskBlockCon.children[i].children[5].text, TaskBlockCon.children[i].name]);
		      TaskBlockCon.children[i].y = 0;
		    }
		  }

		  TITLE_ARRAY.sort((a, b) => a[0].localeCompare(b[0]));
		  TITLE_ARRAY.reverse();
		  console.log(TITLE_ARRAY);

		  var FIRST_Y = TopBlockCon.getChildByName('TopBtn_0').y + TopBlockCon.getChildByName('TopBtn_0').graphics.command.h + 50;
		  for (var i = 0; i < TaskBlockCon.children.length; i++) {
		    for (var q = 0; q < TITLE_ARRAY.length; q++) {
		      if (TaskBlockCon.children[i].children[5].text == TITLE_ARRAY[q][0] && TaskBlockCon.children[i].name == TITLE_ARRAY[q][1]) {
		        TaskBlockCon.children[i].y = FIRST_Y + q * 265;
		        // TITLE_ARRAY[q] = 0;
		        console.log(FIRST_Y, TaskBlockCon.children[i].y);
		        break;
		      }
		    }
		  }
		}
		// Клики------------------------------------------------------------------------
		function Add_New_Task_Click(t) {
		  var TaskTitleText = document.getElementById('InputTitle').value;
		  if (TaskTitleText == '') TaskTitleText = 'New task';

		  var TaskMainText = document.getElementById('InputText').value;
		  if (TaskMainText == '') TaskMainText = 'New task';

		  var MAX_NAME = 0;
		  var NEW_X = 50;
		  var NEW_Y = TopBlockCon.getChildByName('TopBtn_0').y + TopBlockCon.getChildByName('TopBtn_0').graphics.command.h + 50;

		  for (var i = 0; i < TaskBlockCon.children.length; i++) {
		    if (TaskBlockCon.children[i].name && TaskBlockCon.children[i].name.substr(0, 1) == 'T') {
		      if (MAX_NAME <= (+TaskBlockCon.children[i].name.substr(TaskBlockCon.children[i].name.indexOf('_') + 1))) {
		        MAX_NAME = (+TaskBlockCon.children[i].name.substr(TaskBlockCon.children[i].name.indexOf('_') + 1)) + 1;
		      }
		      if (NEW_Y <= TaskBlockCon.children[i].y) {
		        NEW_Y = TaskBlockCon.children[i].y + TaskBlockCon.children[i].children[1].y + TaskBlockCon.children[i].children[1].graphics.command.h + 15;
		      }
		    }
		  }

		  var TaskName = 'Task_' + MAX_NAME;

		  Add_New_Task_Block.bind(this)(NEW_X, NEW_Y, TaskName, TaskTitleText, TaskMainText, true);

		  document.getElementById('InputTitle').value = '';
		  document.getElementById('InputText').value = '';
		  Sort_Tasks_Blocks.bind(this)();
		  Update_Task_Doc.bind(this)(TaskBlockCon.getChildByName(TaskName));
		}

		function Change_Task_Status_Click(t) {
		  var TaskBlock = t.currentTarget.parent;
		  TaskBlock.Active == true ? TaskBlock.Active = false : TaskBlock.Active = true;
		  if (ACTIVE_TAB == 0) {
		    TaskBlock.Active == true ? TaskBlock.alpha = 1 : TaskBlock.alpha = 0.5;
		  } else if (ACTIVE_TAB == 1) {
		    TaskBlock.Active == true ? TaskBlock.alpha = 1 : TaskBlock.alpha = 0;
		  } else if (ACTIVE_TAB == 2) {
		    TaskBlock.Active == true ? TaskBlock.alpha = 0 : TaskBlock.alpha = 0.5;
		  }
		  Update_Task_Doc.bind(this)(TaskBlock);
		  Sort_Tasks_Blocks.bind(this)();
		  TaskBlockCon.y = 0;
		}

		function Close_Task_Click(t) {
		  var TaskBlock = t.currentTarget.parent;
		  TaskBlockCon.removeChild(TaskBlock);
		  Sort_Tasks_Blocks.bind(this)();
		  Update_Task_Doc.bind(this)(TaskBlock);
		}

		function Edit_Task_Click(t) {
		  var TaskBlock = t.currentTarget.parent;
		  if (TaskBlock.Active == true) {
		    t.currentTarget.on('click', Done_Edit_Task_Click.bind(this), null, true);
		    var BigRect = new createjs.Shape();
		    BigRect.graphics.beginFill('rgba(0, 0, 0, 0.3)').drawRect(0, 0, window.innerWidth - 250, window.innerHeight - TopBlockCon.getChildByName('TopBtn_0').y + TopBlockCon.getChildByName('TopBtn_0').graphics.command.h);
		    BigRect.setTransform(0, TopBlockCon.getChildByName('TopBtn_0').y + TopBlockCon.getChildByName('TopBtn_0').graphics.command.h);
		    BigRect.on('click', BlockClick.bind(this));
		    EditTaskCon.addChild(BigRect, TaskBlock);
		    TaskBlock.y = BigRect.y + BigRect.graphics.command.h / 2 - 265 / 2;

		    AddTaskCon.getChildByName('Btn').removeAllEventListeners();
		    AddTaskCon.getChildByName('Btn').on('click', Edit_Text_Task_Click.bind(this));
		    AddTaskCon.getChildByName('BtnText').text = 'Edit task';

		    TaskBlock.getChildByName('Done').removeAllEventListeners();
		    TaskBlock.getChildByName('Close').removeAllEventListeners();
		  }
		}

		function Edit_Text_Task_Click(t) {
		  var BTN = t.currentTarget;
		  var TitleMain = EditTaskCon.children[1].getChildByName('Title');
		  var TextMain = EditTaskCon.children[1].getChildByName('Text');

		  var TaskTitleText = document.getElementById('InputTitle').value;
		  if (TaskTitleText == '') TaskTitleText = 'New task';

		  var TaskMainText = document.getElementById('InputText').value;
		  if (TaskMainText == '') TaskMainText = 'New task';

		  TitleMain.text = TaskTitleText;
		  TextMain.text = TaskMainText
		  document.getElementById('InputTitle').value = '';
		  document.getElementById('InputText').value = '';
		}

		function Done_Edit_Task_Click(t) {
		  var TaskBlock = t.currentTarget.parent;
		  t.currentTarget.on('click', Edit_Task_Click.bind(this), null, true);
		  TaskBlockCon.addChild(TaskBlock);
		  Sort_Tasks_Blocks.bind(this)();
		  EditTaskCon.children.length = 0;
		  Update_Task_Doc.bind(this)(TaskBlock);

		  AddTaskCon.getChildByName('Btn').removeAllEventListeners();
		  AddTaskCon.getChildByName('Btn').on('click', Add_New_Task_Click.bind(this));
		  AddTaskCon.getChildByName('BtnText').text = 'Add a new task';

		  TaskBlock.getChildByName('Done').on('click', Change_Task_Status_Click.bind(this));
		  TaskBlock.getChildByName('Close').on('click', Close_Task_Click.bind(this), null, true);
		}

		function Top_Btn_Click(t) {
		  if (t.currentTarget.name == 'TopBtn_0') {
		    for (var i = 0; i < TaskBlockCon.children.length; i++) {
		      if (TaskBlockCon.children[i].name && TaskBlockCon.children[i].name.substr(0, 1) == 'T') {
		        if (TaskBlockCon.children[i].Active == false) {
		          TaskBlockCon.children[i].alpha = 0.5;
		        } else {
		          TaskBlockCon.children[i].alpha = 1;
		        }
		      }
		    }
		  } else if (t.currentTarget.name == 'TopBtn_1') {
		    for (var i = 0; i < TaskBlockCon.children.length; i++) {
		      if (TaskBlockCon.children[i].name && TaskBlockCon.children[i].name.substr(0, 1) == 'T') {
		        TaskBlockCon.children[i].Active == false ? TaskBlockCon.children[i].alpha = 0 : TaskBlockCon.children[i].alpha = 1;
		      }
		    }
		  } else if (t.currentTarget.name == 'TopBtn_2') {
		    for (var i = 0; i < TaskBlockCon.children.length; i++) {
		      if (TaskBlockCon.children[i].name && TaskBlockCon.children[i].name.substr(0, 1) == 'T') {
		        TaskBlockCon.children[i].Active == true ? TaskBlockCon.children[i].alpha = 0 : TaskBlockCon.children[i].alpha = 0.5;
		      }
		    }
		  }
		  Sort_Tasks_Blocks.bind(this)();
		  ACTIVE_TAB = t.currentTarget.name.substr(t.currentTarget.name.indexOf('_') + 1);
		  TaskBlockCon.y = 0;
		  console.log(TaskBlockCon.y);
		}
		// Разное-----------------------------------------------------------------------
		function Update_Task_Doc(Task) {
		  // Нужно обновлять список
		  if (NewTaskTxt) {
		    var TaskValues = NewTaskTxt.result;
		    var NumTasks = TaskValues.split(/\r\n|\r|\n/);

		    var RealTaskName = Task.name;
		    for (var q = 0; q < NumTasks.length; q++) {
		      var TaskName = NumTasks[q].substr(0, NumTasks[q].indexOf(' '));

		      if (RealTaskName == TaskName) {
		        var TaskTitleText = NumTasks[q].substr(NumTasks[q].indexOf("'") + 1, NumTasks[q].indexOf("'", NumTasks[q].indexOf("'") + 1) - (NumTasks[q].indexOf("'") + 1));
		        var TaskMainText = NumTasks[q].substr(NumTasks[q].indexOf('MainText:') + 11, NumTasks[q].indexOf("'", NumTasks[q].indexOf('MainText:') + 11) - (NumTasks[q].indexOf('MainText:') + 11))
		        var TaskStatus = NumTasks[q].indexOf('true') != -1 ? true : false;
		        if (TaskTitleText != Task.getChildByName('Title').text)
		        TaskTitleText = Task.getChildByName('Title').text;
		        if (TaskMainText != Task.getChildByName('Text').text)
		        TaskMainText = Task.getChildByName('Text').text;
		        if (TaskStatus != Task.Active)
		        TaskStatus = Task.Active;
		        var NewValue = TaskName + " = {Title: '" + TaskTitleText + "', MainText: '" + TaskMainText + "', Active: " + TaskStatus + "};";
		        NumTasks[q] = NewValue;
		        break;
		      }
		      if (q == NumTasks.length - 1 && RealTaskName != TaskName) {
		        var TaskTitleText = Task.getChildByName('Title').text;
		        var TaskMainText = Task.getChildByName('Text').text;
		        var TaskStatus = Task.Active;
		        var NewValue = RealTaskName + " = {Title: '" + TaskTitleText + "', MainText: '" + TaskMainText + "', Active: " + true + "};";
		        NumTasks[q + 1] = NewValue;
		        break;
		      }
		    }
		    var LastText = '';
		    for (var i = 0; i < NumTasks.length; i++) {
		      LastText += NumTasks[i] + '\n'
		    }

		    var BlobBlob = new Blob([LastText], {
		      type: 'text/plain'
		    });
		    ww = URL.createObjectURL(BlobBlob);
		    ll.href = ww;
		  }
		}

		function BlockClick() {}
		// Скролл списка тасков
		document.getElementById('canvas').addEventListener('mousewheel', Stage_Scroll.bind(this));
		document.getElementById('canvas').addEventListener("DOMMouseScroll", Stage_Scroll.bind(this));

		function Stage_Scroll(e) {
		  var DELTA = e.deltaY || e.detail || e.wheelDelta;
		  var POS_TASK_BG = InterfaceCon.getChildByName('TaskBG').globalToLocal(stage.mouseX, stage.mouseY);

		  if (stage.mouseInBounds && InterfaceCon.getChildByName('TaskBG').hitTest(POS_TASK_BG.x, POS_TASK_BG.y)) {
		    var LOWEST_Y = 0;
		    for (var i = 0; i < TaskBlockCon.children.length; i++) {
		      if (TaskBlockCon.children[i].alpha > 0) {
		        if (TaskBlockCon.children[i].y + TaskBlockCon.children[i].children[0].graphics.command.h + TaskBlockCon.children[i].children[1].graphics.command.h > LOWEST_Y)
		          LOWEST_Y = TaskBlockCon.children[i].y + TaskBlockCon.children[i].children[0].graphics.command.h + TaskBlockCon.children[i].children[1].graphics.command.h;
		      }
		    }

		    if (LOWEST_Y > window.innerHeight) {
		      var NEW_Y = DELTA / 10;
		      TaskBlockCon.y -= NEW_Y;
		      if (TaskBlockCon.y >= 0)
		        TaskBlockCon.y = 0;
		      if (TaskBlockCon.y + LOWEST_Y <= window.innerHeight - 15)
		        TaskBlockCon.y = window.innerHeight - 15 - LOWEST_Y;
		    }
		  }
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;
// library properties:
lib.properties = {
	id: 'D9C7B0EEC9247349B0FBF5B1FAB5810A',
	width: window.innerWidth,
	height: window.innerHeight,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['D9C7B0EEC9247349B0FBF5B1FAB5810A'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
