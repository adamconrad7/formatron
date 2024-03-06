var values_obj = {
	name: "Corporate Craig",
	first_name: "Corporate ",
	last_name: "Craig",
	email: "craig@corporate.com",
	phone: "4206666969",
	address: "420 Corporate Ave, NY, 69420",
	linkedin: "https://www.linkedin.com/in/corporatecraig/",
	github: "https://www.linkedin.com/in/corporatecraig/",
	website: "https://www.linkedin.com/in/corporatecraig/"
};

browser.runtime.onMessage.addListener((request) => {
	// This function will be executed after the DOM has fully loaded
	
	// Select input elements after the page has loaded
	var inputs = document.querySelectorAll('input');
	
	// Now you can work with the selected input elements
	//console.log(inputs);
	////console.log(document.documentElement.outerHTML);
	//console.log(inputs.length);
	// Loop through the NodeList and add text to each input
	for (var i=0, n=inputs.length; i < n; ++i ) {
		//var label = get_label(inputs[i]);
		var label = check_attrs(inputs[i]);
		console.log(label);
		inputs[i].value = label;
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

// This function checks all of the attributes of an element. We want to find the correct label for this element. We need to determine what to do if we find an attribute.
// We shoudl return the value from our dict if we find a dict witha mathcing key. 
function check_attrs(el) {
	//return "jimmy";
	var attributes = el.attributes;
	//var attr_vals = [];
	//var pattern = /.*first[-_]?name.*/i;
	// Loop through our keys:
	//for (let key in values_obj) {
	//for (var i = 0; i<values_obj.length; i++) {
	//Object.entries(values_obj).forEach(([key, value]) => {
	var foundLabel;
	Object.entries(values_obj).some(([key, value]) => {
		//console.log(`${key}: ${value}`);
		console.log(key, value);
		//const pattern = /.*first[-_]?name.*/i;
		// Have to make pattern from key somehow
		const pattern = "/.*" + key + ".*/i";
		//var attr_vals = [];
		//console.log(pattern);
		//console.log(values_obj[i]);
		for (var i = 0; i < attributes.length; i++) {
			//attr_vals.push(attributes[i].value);
			if (pattern.match(attributes[i].value)){
				//console.log(attributes[i].value, value);
				foundLabel = value;
				return true;
				//console.log(value);
				//return value;
			}
		}
	//}
	});
	return foundLabel;
	//console.log(key);
}

function get_label(el) {
	//TODO: This check fails in recursive case when we are checking ancestors
	if(el.getAttribute('type') === 'hidden'){
		return null;
	}
	//console.log(el);
	check_attrs(el);
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

//// Regular expression pattern
//var pattern = /.*first-?name.*/i;
//
//// Test strings
//var variations= ["This is my firstname", "Her first-name is Mary", "No match here", "First-name", "lastname"];
//
//const matches = variations.filter(str => pattern.test(str));
//// Test if the strings match the pattern
//console.log(matches); // Output: true
