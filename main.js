(function() {

	var L = 5,
	massiveOfObjectsOfClass = [];
	for (var i = 0; i < L; i += 1) {
		massiveOfObjectsOfClass[i] = new ClassOfRandomVector();
		massiveOfObjectsOfClass[i].class = i + 1;
		massiveOfObjectsOfClass[i].Pi = 1/L;
		massiveOfObjectsOfClass[i].color = Math.trunc(249 / L) * (i + 1);
		massiveOfObjectsOfClass[i].mu = [30 * i - 20, 0 ];
		massiveOfObjectsOfClass[i].sigma = [[20 + i * 3, 10 + i * 3], [10 + i * 3, 40 + i]];
		massiveOfObjectsOfClass[i].numberOfVectors = 900;
		massiveOfObjectsOfClass[i].createRandomVectors();
		massiveOfObjectsOfClass[i].drawRandomVectors();	
	};

	var w = [[0,1000000,1,1,1],[1,0,1,1,1],[1,1,0,1,1],[1,1,1,0,1],[1,1,1,1,0]];
	for (var i = 0; i < L; i += 1) {
		massiveOfObjectsOfClass[i].recognition(massiveOfObjectsOfClass,w);
		massiveOfObjectsOfClass[i].drawVectorsWithErrorClass();	
		//massiveOfObjectsOfClass[i].drawVectorsWithProbality(0.001);
	};

})();