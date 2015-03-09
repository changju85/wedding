/*************************************************************************
 *
 * 이 JavaScript파일은 서버로 가기전후에 에러체크등 해 주어야할 처리를
 * 보다 쉽게 하기 위한 유익한 함수들로 이루어져있다.
 *
 * 함수에 추가적인 사항이나 수정시에는 webroad 정보기술에
 * 통보함으로써 수정 또는 추가적인 함수를 개발자들이  공유할 수 있도록
 * 재배포 할 것임을 명시한다.
 *
 * 각각의 프로그램에 대해 만든이에게 감사하며 어떠한 허락도 없이 묶은거에
 * 대해 너그러이 용서 하길 바란다.
 *
 * 수정일 : 2001-07-11
 *
 *************************************************************************/


/*************************************************************************
  새로운 윈도우를 만들어 준다.

  파라메터 : 링크정보, 윈도우넗이, 윈도우 높이
*************************************************************************/
function newopen(url, width, height)
{
   var wi = screen.width - width;
   var hi = screen.height - height;

   if( wi < 0 ) wi = 0;
   if( hi < 0 ) hi = 0;

   var info = 'left=' + (wi/2) + ',top=' + (hi/2) + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=yes,menubars=no';
   var newwin = window.open(url,'new',info);
   newwin.focus();
}


/***************************************************************************
  주민번호 체크
  입력항목:
           preNoRes : 주민번호앞 6자리 필드 => Myform.preNoRes
           postNoRes:주민번호뒤7자리필드    => Myform.postNoRes
***************************************************************************/
function checkNoRes(preNoRes, postNoRes){

  if (preNoRes.value.length != 6){
    alert("올바른 주민등록번호를 입력해주세요.");
    preNoRes.focus();
    return false;
  }
  else if (postNoRes.value.length != 7){
    alert("올바른 주민등록번호를 입력해주세요.");
    preNoRes.focus();
    return false;
  }
  else {
    var str_serial1 = preNoRes.value;
    var str_serial2 = postNoRes.value;

    var digit=0
    for (var i=0;i<str_serial1.length;i++){
      var str_dig=str_serial1.substring(i,i+1);
      if (str_dig<'0' || str_dig>'9'){
          digit=digit+1
      }
    }

    if ((str_serial1 == '') || ( digit != 0 )){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      preNoRes.focus();
      return false;
    }

    var digit1=0
    for (var i=0;i<str_serial2.length;i++){
      var str_dig1=str_serial2.substring(i,i+1);
      if (str_dig1<'0' || str_dig1>'9'){
          digit1=digit1+1
      }
    }

    if ((str_serial2 == '') || ( digit1 != 0 )){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      postNoRes.focus();
      return false;
    }

    if (str_serial1.substring(2,3) > 1){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      preNoRes.focus();
      return false;
    }

    if (str_serial1.substring(4,5) > 3){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      preNoRes.focus();
      return false;
    }

    if ((str_serial2.substring(0,1) > 4) || (str_serial2.substring(0,1) == 0)){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      postNoRes.focus();
      return false;
    }

    var a1=str_serial1.substring(0,1)
    var a2=str_serial1.substring(1,2)
    var a3=str_serial1.substring(2,3)
    var a4=str_serial1.substring(3,4)
    var a5=str_serial1.substring(4,5)
    var a6=str_serial1.substring(5,6)

    var check_digit=a1*2+a2*3+a3*4+a4*5+a5*6+a6*7

    var b1=str_serial2.substring(0,1)
    var b2=str_serial2.substring(1,2)
    var b3=str_serial2.substring(2,3)
    var b4=str_serial2.substring(3,4)
    var b5=str_serial2.substring(4,5)
    var b6=str_serial2.substring(5,6)
    var b7=str_serial2.substring(6,7)

    var check_digit=check_digit+b1*8+b2*9+b3*2+b4*3+b5*4+b6*5

    check_digit = check_digit%11
    check_digit = 11 - check_digit
    check_digit = check_digit%10

    if (check_digit != b7){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      preNoRes.focus();
      return false;
    }
  }
  return true;
}

/***********************************************************************************
   년, 월, 일 유효성 체크 (윤년 체크 포함)
   입력항목 :
           - optionFlg : YMD가 필수 항목이면 1 ,
                                   선택항목: 0 이며, 모두 입력 또는 모두 공백
            -  year :  년을 표시하는 input 객체  (ex. MainForm.year)
            -  month: 월을 표시하는 input 객체
            -  day :    일을 표시하는 input 객체
    관련 함수
            - isNumber () :  숫자만 입력 받도록하는 함수
            - tabOrder()  :    정해진 숫자만큼 입력하면 자동으로 포커스 이동
***********************************************************************************/
function checkYMD(optionFlg, year, month, day, ilen) {
  if(ilen==null)
  	ilen = 2;
  //----------------------------------------------------------
  // year, month, day 를 모두 입력했는지 조사
  // 년월일 이 필수 입력이 아니면 체크 불필요
  //----------------------------------------------------------
  if(optionFlg) {
    if(!year.value|| !month.value || !day.value) {
      alert("년월일은 필수 입력항목입니다");
      year.focus();
      return false;
    }
  }
  else {
    //옵션사항인데 YMD가 하나도 입력되지 않으면 체크 하지않음
    if(!year.value && !month.value && !day.value) {
      return true;
    }
    else {
      if(!year.value|| !month.value || !day.value) {
        alert("년월일이 모두 입력되거나 모두 생략되어야  합니다.");
		year.value ="";
		month.value ="";
		day.value ="";
        year.focus();
        return false;
      }
    }
  }

  //---------------------------------------------------------
  // year, month, day는 input 객체이다.
  //--------------------------------------------------------
  var total_days;            // 각 월별 총 일수  (30 | 31| 28| 29)
  var ckFlg=0;
  //--------------------------------------------------------------------
  // 숫자만 입력받도록 한다.  isNumber()를 사용하면
  //  생략해도 된다.
  //-------------------------------------------------------------------
  var  data1 = year.value;
  var data2 = month.value;
  var data3 = day.value;
  for ( var j=1; j< 4; j++ ) {
    var data = eval( "data"+j );
    for ( var i=0; i < data.length; i++)  {
      var ch = data.substring(i,i+1);
      if (ch<"0" | ch>"9") {
    	  alert ( "\n일자를 바르게 입력하세요." );
					year.value ="";
					month.value ="";
					day.value ="";
					year.focus();
    	  return false;
	    }
    }// end inner for
  } //end outter for

  //------------------------------------------------------------
  // 년 자리수 체크 ( 1 ~ 12)
  //-----------------------------------------------------------
	if (year.value.length <4) {
		alert ( "\n 년도를 바르게 입력하세요." );
		year.value = "";
		month.value = "";
		day.value = "";
		year.focus();
		return false;
	}

  //------------------------------------------------------------
  // 월 체크 ( 1 ~ 12)
  //-----------------------------------------------------------
  if( (1 > month.value) ||  (12 < month.value) ) {
	  ckFlg=1;
  }
  if(ckFlg) {
    alert ( "\n월을 바르게 입력하세요."  );
	year.value ="";
	month.value ="";
	day.value ="";
	year.focus();
    return false;
  }

  //------------------------------------------------------------
  // 1. 각 달의 총 날수를 구한다.
  //----------------------------------------------------------
  if(month.value == 4||month.value == 6||month.value == 9||month.value == 11)  {
      total_days = 30;
  }
  else {
       total_days=31;
  }
  //--------------------------------------------------------
  // 1-1.윤년에 따른 2월 총 날수 구한다.
  //--------------------------------------------------------
  if(month.value ==2) {
    // 윤년조사
    if((year.value % 4 == 0) && (year.value % 100 != 0) || (year.value % 400 == 0)) {
      total_days = 29;
    }
    else{
      total_days = 28;
    }
  }

  //-------------------------------------------------------------------
  // 일자 체크 : 각년월별로 총 날수가 맞는지 조사
  //-------------------------------------------------------------------
  if( ( 1 > day.value ) || ( day.value > total_days ) ) {
    ckFlg=1;
  }
  if(ckFlg) {
    alert ( "\n일자를 바르게 입력하세요."  );
		year.value ="";
		month.value ="";
		day.value ="";
		year.focus();
    return false;
  }

  //-----------------------------------------------------------
  // MM/DD 형식으로 입력해야 하지만,
  //  M 또는 D 형식으로 입력한 경우 앞에 0 추가
  //-------------------------------------------------------------
  if(ilen == 2){
	  if ( data2.length < 2 ) {
	      month.value = "0"+data2 ;
	     // data2 = "0"+data2 ;
	  }
	  if ( data3.length < 2 ) {
	      day.value = "0"+data3 ;
	     // data3 = "0"+data3 ;
	  }
  }
  return true;
}


/**************************************************************************
  년월 체크 함수
  입력항목 :
           - year : 년을 입력할 폼의 input 객체
           - month :  월을 입력할 폼의 input 객체
**************************************************************************/
function checkYM(year, month) {
  //----------------------------------------------------------
  // year, month, day 를 모두 입력했는지 조사
  //----------------------------------------------------------
  if(!year.value|| !month.value) {
     alert("년월은 필수 입력항목입니다");
     year.focus();
     return false;
  }

  //---------------------------------------------------------
  // year, month input 객체이다.
  //--------------------------------------------------------
  var ckFlg=0;

  //--------------------------------------------------------------------
  // 숫자만 입력받도록 한다.  isNumber()를 사용하면
  //  생략해도 된다.
  //-------------------------------------------------------------------
  var  data1 = year.value;
  var data2 = month.value;
  for ( var j=1; j< 3; j++ ) {
    var data = eval( "data"+j );
    for ( var i=1; i < data.length; i++)  {
      var ch = data.substring(i,i+1);
      if (ch<"0" | ch>"9") {
	      alert ( "\n일자를 바르게 입력하세요." );
    	  year.focus();
    	  year.select();
    	  return false;
	    }
    }// end inner for
  } //end outter for

  //------------------------------------------------------------
  // 월 체크 ( 1 ~ 12)
  //-----------------------------------------------------------
  if( (1 > month.value) ||  (12 < month.value) ) {
	  ckFlg=1;
  }
  if(ckFlg) {
    alert ( "\n월을 바르게 입력하세요."  );
    month.focus();
    month.select();
    return false;
  }
  //-----------------------------------------------------------
  // MM 형식으로 입력해야 하지만,
  //  M 형식으로 입력한 경우 앞에 0 추가
  //-------------------------------------------------------------
  if ( data2.length < 2 ) {
    data2 = "0"+data2 ;
  }
  return true;
}

/***************************************************************************
   Select의 Option값을 동적으로 하나씩 추가한다.

   파라메터   name(Select의 name)
              text(option의 text)
              value(option의 value)
***************************************************************************/
function addOption(name, text, value) {
  var index = eval("frm." + name + ".options.length");
  var select = eval("frm." + name);
  select.options[index]  = new Option(text, value);
}

/***************************************************************************
   Select의 Option값을 동적으로 완전 삭제한다.

   파라메터 : name(Select의 name)
***************************************************************************/
function removeAllOptions(name) {
  var index = eval("frm." + name + ".options.length");
  var select = eval("frm." + name);

  for( var i = index-1; i >= 1; i-- ) {
    select.options[i] = null;
  }
}

/***************************************************************************
   Select의 Option값을 동적으로 원하는 내용을 삭제한다.

   파라메터 : name(Select의 name)
             locate(지울내용의 인텍스)
***************************************************************************/
function removeOption(name, locate) {
  var index = eval("frm." + name + ".options.length");
  var select = eval("frm." + name);

  if( index <= locate ) {
    alert("JavaScrpt error : removeOption함수를 잘못사용하고 있습니다.");
    return;
  }

  for( var i = index-1; i > locate; i-- ) {
    select.options[i-1] = select.options[i];
  }

  select.options[index-1] = null;
}


/**************************************************************************
   문자의 앞과 뒤에 있는 모든 공백을 없앤다.
**************************************************************************/
function trim(s) {
  var len = s.length;
	var st = 0;

	while ((st < len) && (s.charAt(st) <= ' ')) {
	    st++;
	}
	while ((st < len) && (s.charAt(len - 1) <= ' ')) {
	    len--;
	}
	return ((st > 0) || (len < s.length)) ? s.substring(st, len) : s;
}

/**************************************************************************
   String을 꺼꾸로 만들어 준다.
**************************************************************************/
function reverse(s) {
  var rev = "";

  for(var i = s.length-1; i >= 0 ; i--) {
    rev += s.charAt(i);
  }

  return rev;
}

/*************************************************************************
   입력받은 문자에서 숫자만 가져오게한다.
*************************************************************************/
function getRealNumber(format) {
  var number="";
  for(var i=0; i < format.length; i++) {
    if(format.charAt(i) >= '0' && format.charAt(i) <= '9') number += format.charAt(i);
  }
  return eval(number);
}

/*************************************************************************
   형식화된 내용의 심볼들을 없애고 원래의 내용만을 보여준다.

   ex)
   var str = "31,000";
   var res = removeFormat(str, ",");

   result : res -> 31000
*************************************************************************/
function removeFormat(content, sep) {
  var real = "";
  var contents = content.split(sep);

  for(var i = 0; i < contents.length; i++) {
    real += contents[i];
  }

  return real;
}

/*************************************************************************
 * isNumber(numValue) 숫자 체크 루틴
 * @param       numValue              숫자
 * @return      allValid
 * @histroy
*************************************************************************/
function isNum(numValue)
{
      var checkOK = "-0123456789";
      var checkStr = numValue;
      var allValid = true;
      var decPoints = 0;
      var allNum = "";

      /* 숫자인가? */
      for (i = 0;  i < checkStr.length;  i++)
      {
        ch = checkStr.charAt(i);
        for (j = 0;  j < checkOK.length;  j++)
          if (ch == checkOK.charAt(j))
            break;
        if (j == checkOK.length)
        {
          allValid = false;
          break;
        }
      }
      return allValid;
}

/*************************************************************************
 * isNumber(numValue) 실수 체크 루틴
 * @param       numValue              숫자
 * @return      allValid
 * @histroy
*************************************************************************/
function isRealNum(numValue)
{
      var checkOK = "-0123456789.";
      var checkStr = numValue;
      var allValid = true;
      var decPoints = 0;
      var allNum = "";

      /* 숫자인가? */
      for (i = 0;  i < checkStr.length;  i++)
      {
        ch = checkStr.charAt(i);
        for (j = 0;  j < checkOK.length;  j++)
          if (ch == checkOK.charAt(j))
            break;
        if (j == checkOK.length)
        {
          allValid = false;
          break;
        }
      }
      return allValid;
}

/*************************************************************************
   정수만 입력 받는 함수(onKeyPress일때 실행)
   @history
*************************************************************************/
/**
 * description : 숫자만 입력받는 함수
 * @return		void
 */
function fcNumber(){
	if((event.keyCode<48 || event.keyCode>57) && (event.keyCode<96 || event.keyCode>105) && event.keyCode!=45)
		event.returnValue = false;
}

/*************************************************************************
   실수만 입력 받는 함수(onKeyPress일때 실행)
   @history
*************************************************************************/
/**
 * description : 숫자만 입력받는 함수
 * @return		void
 */
function fcRealNum(){
	if((event.keyCode<48 || event.keyCode>57) && (event.keyCode<96 || event.keyCode>105) && event.keyCode!=189 && event.keyCode!=190 && event.keyCode!=8 && event.keyCode!=45)
		event.returnValue = false;
}

/*************************************************************************
   날짜 형식
   @history
*************************************************************************/
/**
 * description : 입력받은 날짜에 format
 * @return		void
 */
function fcDateFormat(val, sDelimiter){
	var retStr = ""
	if(val.length == 4){
		retStr = val;
	}else if(val.length == 6){
		retStr = val.substr(0, 4) + sDelimiter + val.substr(4, 2);
	}else if(val.length == 8){
		retStr = val.substr(0, 4) + sDelimiter + val.substr(4, 2) + sDelimiter + val.substr(6, 2);
	}else{
		retStr = val;
	}
	return retStr;
}