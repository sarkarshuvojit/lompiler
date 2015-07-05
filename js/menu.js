var filename="new";
var fileList = [];
var fileNameList = [];
$(document).ready(function() {	
	$menuLeft = $('.pushmenu-left');
	$nav_list = $('#nav_list');
	$nav_list.click(function() {		
		$(this).toggleClass('active');
		$('.pushmenu-push').toggleClass('pushmenu-push-toright');
		$menuLeft.toggleClass('pushmenu-open');
	});
	$("#select-c").click(function(){		
		lang="c";
		$("#heading").html("C Compiler");
		$("#code").val("#include <stdio.h>\nint main(){\n  printf(\"Hello World\");\n  return 0;\n}");
		$(this).toggleClass('active');
		$('.pushmenu-push').toggleClass('pushmenu-push-toright');
		$menuLeft.toggleClass('pushmenu-open');
		$(this).blur();
		return false;
	});
	$("#select-cpp").click(function(){
		lang="cpp";
		$("#heading").html("C++ Compiler");
		$("#code").val("#include <iostream>\nusing namespace std;\nint main(){\n  cout << \"Hello World\" << endl;\n  return 0;\n}");
		$(this).toggleClass('active');
		$('.pushmenu-push').toggleClass('pushmenu-push-toright');
		$menuLeft.toggleClass('pushmenu-open');
		$(this).blur();
		return false;
	});
	$("#select-java").click(function(){
		lang="java";
		$("#heading").html("Java Compiler");
		$("#code").val("/*classname should always be Solution*/\nclass Solution { \r\n  public static void main(String[] args) { \r\n    System.out.println(\"Hello, World\");\r\n  }\r\n}");
		$(this).toggleClass('active');
		$('.pushmenu-push').toggleClass('pushmenu-push-toright');
		$menuLeft.toggleClass('pushmenu-open');
		$(this).blur();		
		return false;
	});
	//List files	
	var sdbuffer = navigator.getDeviceStorage('sdcard');
	var cursor = sdbuffer.enumerate();
	cursor.onsuccess = function(){
		var file = this.result;
		if(file!=null){
			if(file.name.endsWith(".c") || file.name.endsWith(".cpp") || file.name.endsWith(".java")){
				fileList.push(file.name)
				fileNameList.push(file.name.substring(file.name.lastIndexOf("/")+1))
				$("#select-shit").append("<a class='file-choice' data-loc='"+file.name+"'>"+file.name.substring(file.name.lastIndexOf("/")+1)+"</a>")				
			}
			this.done = false;
		}else{
			$("#select-shit").append("<a id='cancel-dialog'>Cancel</a><br><br><br><br>")
			$("#cancel-dialog").click(function(){$("#select-shit").slideUp();})
			$(".file-choice").click(function(){				
				
				var sdcard = navigator.getDeviceStorage('sdcard');
				console.log($(this).attr('data-loc'))
				var request = sdcard.get($(this).attr('data-loc'));

				request.onsuccess = function () {
					var file = this.result;
					var reader = new FileReader();
    			reader.readAsText(this.result);					
					reader.onload = function(){
						console.log("Done reading")
						text = reader.result
						$("#code").val(text);
						lang = file.name.substring(file.name.lastIndexOf(".")+1)
						$("#heading").html(lang+" Compiler");
						filename = file.name.substring(file.name.lastIndexOf("/")+1)
						//get shit back to normal
						$("#select-shit").slideToggle();						
						$(this).toggleClass('active');
						$('.pushmenu-push').toggleClass('pushmenu-push-toright');
						$menuLeft.toggleClass('pushmenu-open');
					};
					reader.onerror = function(){
						console.log("Oopss")
					}
				}

				request.onerror = function () {
					console.warn("Unable to get the file: " + this.error.name);
				}	
			});
			this.done = true;
		}
		if(!this.done)
			this.continue();
	}	
	$("#open-file").click(function(){
		$("#select-shit").slideToggle();
	});	
});