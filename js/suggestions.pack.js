(function(e){e.extend(e.fn,{suggestions:function(t){var n={url:null,param:"k",max_rows:5,multiples:false,unique:false,debug:false,cleaning:true};var i=e.extend(n,t);if(!i.url){console.log("please set the url option in  suggestions plugin!");return false}var s=0;var o=i.debug;var u=i.max_rows;var a=this;var f,l,c,h;var p=function(){f=a.position().top;l=a.position().left;c=a.outerWidth();h=a.outerHeight();m.css({width:c+"px",left:f+"px",top:h+l+"px"});if(o)console.log("updaterect()\n	field width =  "+c+"\n	field height = "+h)};var d=null;var v=a.attr("id")+"-suggestions";a.wrap('<div class="suggestions" style="position:relative">');a.after('<select id="'+v+'" size="2" class="suggestions-dropdown" style="position:absolute;z-index:9999"></select>');var m=e("#"+v);if(o)console.log("load suggestions plugin: #"+v);m.hide();if(o)console.log("hide suggestions plugin: #"+v);m.click(function(){var e=m.find("option:selected").text();if(i.multiples){elt=a.val();if(elt.indexOf(",")>0){ta=elt.split(",");ta.pop();ta.push(e);if(i.unique){var t=0;var n=[];while(t<ta.length){if(n.indexOf(ta[t])==-1)n.push(ta[t].trim());t++}ta=n}e=ta.toString()}if(i.cleaning){nt=e.replace(/\s/g,"").replace(/,/,", ").replace(/,$/,"");if(o)console.log("cleaning suggestions  plugin #"+v+'\n	from : "'+e+'" \n	to : "'+nt+'"');e=nt}}a.val(e);g()});e(window).on("resize",function(e){p()});e(a).on("focus",function(e){p()});e("html").click(function(){g()});var g=function(){m.find("option").remove();m.hide();if(o)console.log("reset suggestions plugin: #"+v)};var y=function(t){var n=i.url+"?"+i.param+"="+t;s++;if(o)console.log("send request "+s+" to "+i.url+"\n	param = "+i.param+"\n	value = "+t);e.getJSON(n,function(e){g();var t=0;var n="";var i=e.suggestions;var s=i.length;if(s>0){if(m.is(":hidden")){m.show();if(o)console.log("show suggestions plugin : #"+m.attr("id"))}if(s<u)r=s;else if(s>u)r=u;if(s==1)r=2;m.attr("size",r);while(t<s){opt='<option value="'+i[t]+'">'+i[t]+"</option>";n+=opt;t++}m.append(n)}else{m.hide()}})};a.keyup(function(e){var t=a.val();var n=e.keyCode;if(n==188&&i.multiples){g();return}if(t.trim()!=""){if(t.length>1&&t.length%2==0){if(d!=32){if(i.multiples){qa=t.split(",");t=qa.pop();if(t.trim()==""){g();return}}y(t.trim())}}}else{g()}d=n})}})})(window.Zepto||window.jQuery)
