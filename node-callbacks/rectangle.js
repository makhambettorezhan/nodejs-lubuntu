const solveProblem = (width, height, callback) => {
	if(width <= 0 || height <= 0) {
		setTimeout(() =>
			callback(new Error('Invalid input'), null)
		, 2000);
		
	} else {
		setTimeout(() =>
			callback(null, `Area: ${rect.area(width, height)}\nPerimeter: ${rect.perimeter(width, height)}`)
		, 2000);
	}
};

var rect = {
	perimeter: (x,y) => 2*(x+y),
	area: (x,y) => x*y
};


solveProblem(2, 2, (err, message) => {
	if(err) console.log(err.message);

	else {
		console.log(message);
	}

});

const path = require('path');
const fs = require('fs');

fs.exists(__filename, (exists) => {
	if(exists) console.log('it exists');
});

console.log(path.extname(__filename));
console.log(__filename);