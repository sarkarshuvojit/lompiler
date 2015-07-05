var lang="java";
var xhr;
var jsn;
document.getElementById("button").addEventListener("click",function(){
  $("#loader").show();
  xhr = new XMLHttpRequest()
  xhr.open("POST","http://compiler-trickthemech.rhcloud.com/API/boo.php",true)  
  if(!xhr){
    window.alert("You wot m8?")
  }
  xhr.onload = function() {
    jsn = JSON.parse(xhr.response)    
    if(jsn['status']=="OK"){
     console.log("IN OK")
     res = (jsn['output']).replace('\n','')
    }else{
      res=""
      for(var ii=0;ii<jsn['output'].length;ii++)
        res+=jsn['output'][ii]+"<br>";
    }
    console.log(res)
    $("#terminal").append(res+"\nuser@firefox-phone:~$")
    var element = document.getElementById("terminal")
    element.scrollTop = element.scrollHeight;
    $("#loader").hide();
  };
  xhr.onerror = function(aaa) {    
    $("#loader").hide();
    $("#terminal").append("Connection Error<br>Please Connect the device to a wireless network\nuser@firefox-phone:~$")
  };
  var data = new FormData()
  data.append('code',$("#code").val())
  data.append('input',$("#input").val())
  data.append('lang',lang)
  $("#terminal").append(" "+lang+"<br>")
  xhr.send(data)
  return false
});

