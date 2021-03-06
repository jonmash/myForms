/*! 
	* Demo Page for
	* jsonForms v0.1.1
	* (c) 2014 jMash 
	*   jonmash.ca 
	*   github.com/jonmash 
	* Released under the MIT license
*/

jQuery(document).ready(function(){

	var default_options= {
		"title": "jsonForms in Action!",
		"action": "#",
		"class": "form",
		"method": "POST",    		
		"validate": "Y",     		
		"layout": "horizontal" 
	};
	
	var default_schema = [
		{
			"name": "key",
			"label": "Key",
			"type": "hidden",
			"value": "1234567",
			"required": "N"
		},
		{
			"name":"set1",
			"label": "Login",
			"type": "fieldset",
			"inherit" : "true",
			"fields":[
				{
					"name": "user",
					"label": "User",
					"type": "text",
					"id": "username",
					"required": "Y",
					"placeholder": "Your Username"
				},
				{
					"name": "password",
					"label": "Password",
					"type": "password",
					"id": "pass",
					"class": "passField",
					"placeholder": "Your Password"
				}
			]
		},
		{
			"name": "email",
			"label": "Email",
			"type": "email",
			"id": "email",
			"required": "Y",
			"value": "test@example.com",
			"placeholder": "Your Email Address"
		},
		{
			"name": "url",
			"label": "Link",
			"type": "url",
			"id": "url",
			"required": "Y",
			"placeholder": "Include a link..."
		},
		{
			"name": "dropdown1",
			"label": "Dropdown",
			"type": "dropdown",
			"id": "dd1",
			"selected":"opt2",
			"options": [
				{
					"name":"opt1",
					"value":"Option #1"
				},{
					"name":"opt2",
					"value":"Option #2"
				},{
					"name":"opt3",
					"value":"Option #3",
				}
			]
		},
		{
			"name": "dropdown2",
			"label": "Dropdown2",
			"type": "dropdown",
			"id": "dd2",
			"options": [
				{
					"name":"opt1",
					"value":"Option #1"
				},{
					"name":"opt2",
					"value":"Option #2"
				},{
					"name":"opt3",
					"value":"Option #3",
					"selected":"true"
				}
			]
		},		
		{
			"name":"set2",
			"label": "Details",
			"type": "fieldset",
			"inherit" : "false",
			"fields":[
				{
					"name": "cblist1",
					"label": "CheckBox1",
					"type": "checkboxlist",
					"id": "cd2",
					"options": [
						{
							"name":"opt1",
							"value":"Option #1",
							"selected":"true"
						},{
							"name":"opt2",
							"value":"Option #2"
						},{
							"name":"opt3",
							"value":"Option #3",
							"selected":"true"
						}
					]
				},
				{
					"name": "rdlist1",
					"label": "RadioList1",
					"type": "radiolist",
					"id": "rl2",
					"class": "radiolist123",
					"options": [
						{
							"name":"opt1",
							"value":"Option #1"
						},{
							"name":"opt2",
							"value":"Option #2"
						},{
							"name":"opt3",
							"value":"Option #3",
							"selected":"true"
						},{
							"name":"opt4",
							"value":"Option #4"
						}
						
					]
				}
			]
		},
		{
			"name": "submit",
			"type": "submit",
			"id": "submitBtn",
			"class": "button",
			"value": "Save"
		},
		{
			"name": "reset",
			"type": "reset",
			"id": "resetBtn",
			"class": "button",
			"value": "Reset"
		}
	];
	$('#genSchema').val(JSON.stringify(default_schema, null, "  "));
	$('#genOptions').val(JSON.stringify(default_options, null, "  "));
	
	//Build the form
	var default_form = jsonForms.BuildForm(default_options, default_schema, FormSubmitted);
	$('#formSpace').html(default_form);
	$('#codeSpace').text(default_form.html());
	makeReadable();
	prettyPrint();
	
	$('#generator').submit(UpdateForm);
	$('#genOptions').on('input propertychange paste', UpdateForm);
	$('#genSchema').on('input propertychange paste', UpdateForm);
	
	function FormSubmitted(e) {
		e.preventDefault();
		
		if(!$(this).valid()) return;
		
		var values = $(this).serialize();
		$('#respSpace').html("Submitted" + decodeURI(values));
	}
	
	function UpdateForm(e) {
		if(e.type != "paste") 
			e.preventDefault();
			
		console.log("Updating...");
		$('#formSpace').html(" ");
		$('#codeSpace').html(" ");
		try {
			var opt = JSON.parse($('#genOptions').val());
			var sch = JSON.parse($('#genSchema').val());
			var frm = jsonForms.BuildForm(opt, sch)
			$('#formSpace').html(frm);
			$('#codeSpace').removeClass('prettyprinted').text(frm.html());
			makeReadable();
			prettyPrint();
		} catch(e) {
			$('#formSpace').html('<p class="bg-danger" style="padding:25px; margin-top:25px;">Failed to parse JSON. Check your Markup!</p>');
			$('#codeSpace').html('<p class="bg-danger" style="">Failed to parse JSON. Check your Markup!</p>');
			console.log("Failed!");
		}
	};
	
	function makeReadable() {
		var readableHTML = $('#codeSpace').text();
		var lb = '\r\n';
		var htags = ["<html","</html>","</head>","<title","</title>","<meta","<link","<style","</style>","</body>"];
		var i = 0;
		for (i=0; i<htags.length; ++i) {
			var hhh = htags[i];
			readableHTML = readableHTML.replace(new RegExp(hhh,'gi'),lb+hhh);
		}
		var btags = ["</div>","</span>","</form>","</fieldset>","<br>","<br />","<hr","<pre","</pre>","<blockquote","</blockquote>","<ul","</ul>","<ol","</ol>","<li","<dl","</dl>","<dt","</dt>","<dd","</dd>","<\!--","<table","</table>","<caption","</caption>","<th","</th>","<tr","</tr>","<td","</td>","<script","</script>","<noscript","</noscript>"];
		for (i=0; i<btags.length; ++i) {
			var bbb = btags[i];
			readableHTML = readableHTML.replace(new RegExp(bbb,'gi'),lb+bbb);
		}
		var ftags = ["<label","</label>","<legend","</legend>","<object","</object>","<embed","</embed>","<select","</select>","<option","<option","<input","<textarea","</textarea>"];
		for (i=0; i<ftags.length; ++i) {
			var fff = ftags[i];
			readableHTML = readableHTML.replace(new RegExp(fff,'gi'),lb+fff);
		}
		var xtags = ["<body","<head","<div","<span","<p","<form","<fieldset"];
		for (i=0; i<xtags.length; ++i) {
			var xxx = xtags[i];
			readableHTML = readableHTML.replace(new RegExp(xxx,'gi'),lb+xxx);
		}
		$('#codeSpace').text(readableHTML);
	}
});