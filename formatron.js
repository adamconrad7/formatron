//////var inputs = Array.from(document.getElementsByTagName('input'));
"use strict";
//file:///home/saba/desktop/test.txt
///Users/adam/Documents/code/formatron/values.json
//fetch('file:///Users/adam/Documents/code/formatron/values.json', {mode:'same-origin'})
fetch('./values.json', {mode:'same-origin'})
    .then((response) => response.json())
    .then((json) => console.log(json));
//It's most likely because the DOMContentLoaded event was already fired at this point. The best practice in general is to check for document.readyState to determine whether or not you need to listen for that event at all.

//if (document.readyState !== 'loading') {
//    console.log('document is already ready, just execute code here');
//    console.log('already ready');
//} else {
//    document.addEventListener('DOMContentLoaded', function () {
//        console.log('document was not ready, place code here');
//        
//	console.log('After 2 seconds');
//
//    });
//}
browser.runtime.onMessage.addListener((request) => {

//document.addEventListener('DOMContentLoaded', function() {
	// This function will be executed after the DOM has fully loaded
	
	// Select input elements after the page has loaded
	var inputs = document.querySelectorAll('input');
	
	// Now you can work with the selected input elements
	console.log(inputs);
	//console.log(document.documentElement.outerHTML);
	console.log(inputs.length);
	// Loop through the NodeList and add text to each input
	for (var i=0, n=inputs.length; i < n; ++i ) {
		var label = get_label(inputs[i]);

	}
	//inputs.forEach(function(input) {
	//	var label = get_label(input);
	//	console.log(input);
	//	//console.log(label);
	//	//TODO: Here we need to match the label to our pre-defined values.
	//	input.value = label;
	//});
	//console.log(request.greeting);
	return Promise.resolve({ response: "Hi from content script" });

});

function check_element(el) {
	for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++){
	    att = atts[i];
	    //console.log(att.nodeName);
	    //console.log(att.nodeValue);
	}
}

function get_label(el) {
	//TODO: This check fails in recursive case when we are checking ancestors
	console.log('in get_label');
	check_element(el);
	if(el.getAttribute('type') === 'hidden'){
		return null;
	}
	// TODO: Should first check if field has an autofill/placeholder value, not all inputs will have labels but every placeholder will be relevant to that input
	var label;
	// Get all child nodes of the parent (including text nodes)
	var parentNode = el.parentNode;
	// get all sibling elements
	var siblings = Array.from(parentNode.childNodes).filter((item) => {
		return item.nodeType ===1;
	}); 
	// TODO: what if there are multiple siblings with text? we should get the closeset one	
	//Look thoriugh all the sibling elements and return text if it exists.
	 for (var i = 0; i < siblings.length; i++) {
		var sibling = siblings[i];
		if (sibling.textContent.trim() !== '' && /[a-zA-Z]/.test(sibling.textContent)){
		        return sibling.textContent.trim();
		}
	}
	return get_label(parentNode);
}
 
