/*************************************************************************
 * 
 * 이 JavaScript파일은 자바스크립트 이벤트와 관련해서 처리를
 * 보다 쉽게 하기 위한 유익한 함수들로 이루어져있다.
 *
 * 함수에 추가적인 사항이나 수정시에는 21C정보기술 솔루션 사업부에 
 * 통보함으로써 수정 또는 추가적인 함수를 개발자들이  공유할 수 있도록 
 * 재배포 할 것임을 명시한다.
 *
 * 각각의 프로그램에 대해 만든이에게 감사하며 어떠한 허락도 없이 묶은거에
 * 대해 너그러이 용서 하길 바란다.
 *
 * 수정일 : 2001-01-29
 * 모은이 : 조인상(isjo@email.intra21.co.kr)
 *
 *************************************************************************/

/*************************************************************************
  중앙에 새로운 윈도우를 생성 .

  파라메터 : 링크정보, 윈도우넗이, 윈도우 높이
*************************************************************************/
function centerNewWin(url, name, width, height) {
  var wi = screen.width - width;
  var hi = screen.height - height;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
  var info = 'left=' + (wi/2) + ',top=' + (hi/2) + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=yes,menubars=no,status=yes';
  var newwin = window.open(url, name, info);
  newwin.focus();
  return newwin;
}


/*************************************************************************
  우측상단에 새로운 윈도우를 생성 .

  파라메터 : 링크정보, 윈도우이름, 윈도우넗이, 윈도우 높이
*************************************************************************/ 
function rightNewWin(url,winName, width,height) {
  var wi = screen.width - width - 10;
  var hi = 10;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
  var info = 'left=' + wi + ',top=' + hi + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=yes,menubars=no,status=yes';
  var newwin = window.open(url, name,info);
  newwin.focus();
} 

/*************************************************************************
  좌측상단에 새로운 윈도우를 생성 .

  파라메터 : 링크정보, 윈도우넗이, 윈도우 높이
*************************************************************************/
function leftNewWin(url, winName, width, height) {
  var wi = 10;
  var hi = 10;
  
  var info = 'left=' + wi + ',top=' + hi + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=yes,menubars=no';
  var newwin = window.open(url,'new',info);
  newwin.focus();
}


/************************************************************************************
   입력필드에 숫자만 입력받도록 하는 함수 
   관련 이벤트 :  onKeyPress 
************************************************************************************/
function isNumber(){
 	if ((event.keyCode<48)||(event.keyCode>57)){
  		event.returnValue=false;
 	}
}

/***********************************************************************************
  정해진 숫자만큼 문자(영숫자)를 입력하면 자동으로 다음 필드로 포커스 이동
  입력 항목 
            - thisTab : 작업중인 필드 객체
            - nextTab: 다음 포커스 대상
            - thisTabSize: 작업중인 입력필드의 size 값
   관련 이벤트 : onKeyPress          
***********************************************************************************/
function tabOrder(thisTab,nextTab, thisTabSize) {
    if (thisTab.value.length == thisTabSize) {
        nextTab.select();
        nextTab.focus();
        return;
     }
}

 
 
/*********************************************************************************
   코드를 수정하면 자동으로 코드명이 초기 빈 상태로 되어야 한다.
   이를 위한 함수 이다.
   입력 항목 
          - cdObj : 코드값을 입력한 input 객체
          - nmObj: 코드명을 출력한 input 객체
          - cdLength :  코드 길이 
      코드길이 가  현재 입력한 코드값의 길이와 같지 않으면 코드명을 지운다.
   관련이벤트 : onKeyUp
*********************************************************************************/
function isFullCode(cdObj, nmObj ,cdLength) {
  if(cdObj.value.length != cdLength) {
    nmObj.value="";
  }
}

/*********************************************************************************
   코드를 수정하면 자동으로 코드명이 초기 빈 상태로 되어야 한다.
   이를 위한 함수 이다.
   입력 항목 
          - cdObj : 코드값을 입력한 input 객체
          - nmObj: 코드명을 출력한 input 객체의 스트링 이름(','로 분리된다.)
          - cdLength :  코드 길이 
      코드길이 가  현재 입력한 코드값의 길이와 같지 않으면 코드명을 지운다.
   관련이벤트 : onKeyUp
*********************************************************************************/
function isFullCode2(cdObj, nmObj ,cdLength) {
  
  if(cdObj.value.length != cdLength) {
    var nmObjs = nmObj.split(",");
    for(var i = 0; i < nmObjs.length; i++) {
      eval(nmObjs[i]).value="";
    }
  }
}

/***************************************************************************
   Input type="Text"를 돈에 관련된 내용으로 사용
   돈에 '100,000'과 같이 ','을 추가 시켜준다.
  
   Event Handlers : onBlur  
   관련 함수 : removeFormattedMoney(), isNumber(), util.js::reverse()
   사용 방법 : onBlur="formattedMoney(this)"
***************************************************************************/
function formattedMoney(v) {
  var format = "";
  var money = v.value;

  money = reverse(money);
  for(var i = money.length-1; i > -1; i--) {
    if((i+1)%3 == 0 && money.length-1 != i) format += ",";
    format += money.charAt(i);
  }
  v.value = format;
  return v.value;
}


/*************************************************************************
   Input type="Text"를 돈에 관련된 내용으로 사용    
   formattedMoney에서 사용된 ','을 제거 시켜준다.
  
   Event Handlers : onFocus
   관련타입 : text
   관련함수 : formattedMoney(), isNumber()
   예제방법 :  onFocus="removeFormattedMoney(this)"
**************************************************************************/
function removeFormattedMoney(v) {
  var unformat = "";
  var money = v.value;
  var arr = money.split(",");
  for(var i = 0; i < arr.length; i++) {
    unformat += arr[i];
  }
  v.value = unformat;
  return v.value;
}


/**********************************************************************************
  이프로그램은 리스트의 색상과 커서를 변형시키는 기능을 담당하고 있다.
 
  관련이벤트 : onMouseOver, onMouseOut, onClick
 
  ex) <tr> 태그나 <td> 태그에 다음과 같이 사용할 수 있다.
      onClick시 특별한 행동을 하기위해서는 onClick 에 추가적으로 함수를 호출하면 된다.
      <td onMouseOver='mouseOverCell(this)' 
          onMouseOut='mouseOutCell(this)' 
          onClick='selectedCell(this)'>항목</td>
***********************************************************************************/
var prevObj;        // 이전에 선택되어 색이 지정된 Object

var defaultColor    = '#FFFFFF';   // 기본 색상
var onMouseColor    = '#e9fad4';   // 마우스가 올려 졌을때의 색
var selecctedColor  = '#b9caa4';   // 선택되었을때 색

function selectedCell(obj) {
  if( prevObj == null ) {
    prevObj = obj;
    prevObj.style.background = selecctedColor;
  }
  else {
    prevObj.style.background = defaultColor;
    obj.style.background = selecctedColor;
    prevObj = obj;
  }
}

function mouseOverCell(obj) {
  if( prevObj != obj ) {
    obj.style.background = onMouseColor;
  }
  obj.style.cursor = 'hand';
}

function mouseOutCell(obj) {
  if( prevObj != obj ) {
    obj.style.background = defaultColor;
  }
  obj.style.cursor = 'auto';
}

/************************************************************************
   Text에 영문자 소문자를 대문자로 바꿔준다.
   관련 이벤트 : onKeyPress
   
   사용법 :
   <input type="text" onKeyPress="toUpperCase()">
************************************************************************/   
function toUpperCase() {
  if(!(event.keyCode < 97 || event.keyCode > 122)) {
    event.keyCode -= 32;
    event.returnValue=true;
  }
}

/************************************************************************
   Text에 영문자 대문자를 소문자로 바꿔준다.
   관련 이벤트 : onKeyPress
   
   사용법 :
   <input type="text" onkeyPress="toLowerCase()">
************************************************************************/   
function toLowerCase() {
  if(!(event.keyCode < 65 || event.keyCode > 90)) {
    event.keyCode += 32;
    event.returnValue=true;
  }
}
/************************************************************************
   text와 textarea,file type에 value를 특수문자가 허용하지 못하도록한다.
   
   사용법 : if(form_chk() == -1) return;
            에러발생시 alert()으로 메세지를 뿌려주고 return;시키면됨
            
   function aa(){
    if(form_chk() == -1) return;  //에러처리
    document.myform.action="/servlet/aa";
    document.myform.submit();
   }             
************************************************************************/   

function form_chk()
{
   var form_cnt = document.forms.length;

   for ( var j=0; j < form_cnt; j++ )
   {
      var cnt = document.forms[j].length;
      for ( var i=0; i < cnt; i++ )
      {
         var type = document.forms[j].elements[i].type;

         if ((type == "text") || (type == "textarea") )
         {
            var val_len = document.forms[j].elements[i].value.length; 
            var space_chk = 0;
            for ( var k=0; k < val_len; k++ )
            {
               var val_com = document.forms[j].elements[i].value;
               if ( val_len != 0 )
               {
                  if ( (val_com.charAt(k) == ' ') || (val_com.charAt(k) == '\n') || (val_com.charAt(k) == '\r') )
                     space_chk++;
               }

               //if ( type != "textarea" )
               //{
                  if ( val_com.charAt(k) == '\'' )
                  {
                     alert("입력란에는 single quotation( \' )을 입력할 수 없습니다.");
                     return -1;
                  }
               //}
            }
            if ( val_len != 0 )
            {
               if ( space_chk == val_len )
               {
                  //alert("입력란에는 공백(space)만을 입력할 수 없습니다.");
                  //return -1;
               }
            }
         }
         else if ( type == "file" )
         {
            var back = 0;
            var val_len1 = document.forms[j].elements[i].value.length; 
            var val_com1 = document.forms[j].elements[i].value;
            var n = 0; 
            for ( n=val_len1 - 1; n >= 0; n-- )
            {
               if ( val_com1.charAt(n) != '\\' )
               {
                  if ( (val_com1.charAt(n) == '!') || (val_com1.charAt(n) == '$') || (val_com1.charAt(n) == '(') || (val_com1.charAt(n) == ')') || (val_com1.charAt(n) == '&') || (val_com1.charAt(n) == '*') || (val_com1.charAt(n) == ';') || (val_com1.charAt(n) == '/') || (val_com1.charAt(n) == ' ') || (val_com1.charAt(n) == '\'') || (val_com1.charAt(n) == '"'))
                  {
                     alert('첨부 파일 이름은, \n\n다음과 같은 특수 문자와, space(띄어쓰기)을 허용하지 않습니다.\n\n\===========================================================\n\n\!  $  (  )  &  *  ;  / " \'');
                     return -1;
                  }
               }
               else
               {
                  back = 1;
                  break;
               }
            }

            if ( back == 0 && val_len1 != 0 )
            {
               alert('첨부 파일은 절대 경로로 입력되어야 합니다.\n\nBrowse.. 버튼을 클릭하여 첨부하세요..');
               return -1;
            }
         }
         else
         {
         }
      }  // end of for ( form_length )
   }  // end of for ( form_cnt )

   return 0;
}