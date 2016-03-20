<<<<<<< HEAD
//SRO_lab1_vodich
(function() {

var L = 5,
	massiveOfObjectsOfClass = [];

for (var i = 0; i < L; i += 1) {
	massiveOfObjectsOfClass[i] = new ClassOfRandomVector();
	massiveOfObjectsOfClass[i].color = Math.trunc(249 / L) * (i + 1);
	massiveOfObjectsOfClass[i].mu = [30 * i - 20, 0 ];
	massiveOfObjectsOfClass[i].sigma = [[20 + i * 3, 10 + i * 3], [10 + i * 3, 40 + i]];
	massiveOfObjectsOfClass[i].numberOfVectors = 900;
	massiveOfObjectsOfClass[i].createRandomVectors();
	massiveOfObjectsOfClass[i].drawRandomVectors();	
};

=======
//SRO_lab1_vodich
(function() {

var L = 5,
	massiveOfObjectsOfClass = [];

for (var i = 0; i < L; i += 1) {
	massiveOfObjectsOfClass[i] = new ClassOfRandomVector();
	massiveOfObjectsOfClass[i].color = Math.trunc(249 / L) * (i + 1);
	massiveOfObjectsOfClass[i].mu = [30 * i - 20, 0 ];
	massiveOfObjectsOfClass[i].sigma = [[20 + i * 3, 10 + i * 3], [10 + i * 3, 40 + i]];
	massiveOfObjectsOfClass[i].numberOfVectors = 900;
	massiveOfObjectsOfClass[i].createRandomVectors();
	massiveOfObjectsOfClass[i].drawRandomVectors();	
};

>>>>>>> f045c43cbfe27a4abb779b1764557dcd1da6691e
})();