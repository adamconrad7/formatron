//////var inputs = Array.from(document.getElementsByTagName('input'));
setTimeout(function() {
    console.log('After 2 seconds');
    
    // Put the code you want to execute after the delay here

console.log('Starting extension');

//document.addEventListener('DOMContentLoaded', function() {
	// This function will be executed after the DOM has fully loaded
	
	// Select input elements after the page has loaded
	var inputs = document.querySelectorAll('input');
	
	// Now you can work with the selected input elements
	console.log(inputs);
	
	// Loop through the NodeList and add text to each input
	inputs.forEach(function(input) {
		var label = get_label(input);
		console.log(input);
		console.log(label);
		input.value = label;
	});

}, 2000);
//});


function get_label(el) {
	//TODO: This check fails in recursive case when we are checking ancestors
	if(el.getAttribute('type') === 'hidden'){
		return null;
	}
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
 
