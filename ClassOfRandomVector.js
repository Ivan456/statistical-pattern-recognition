var ClassOfRandomVector = (function () {
	function ClassOfRandomVector() {
		this.class;
		this.massiveOfDecisionXi = [];
		this.mu;
		this.sigma;
		this.Pi;
		this.numberOfVectors;
		this.color;
		this.massiveOfXi = [];
		this.zoom = 7;
	};

	ClassOfRandomVector.prototype.boxMullerCreateEta = function() {
		var eta =[], 
			alfa = [];
		alfa[0] = Math.random();
		alfa[1] = Math.random();
		eta[0] = Math.sqrt((-2) * Math.log(alfa[0])) * Math.sin(2 * Math.PI * alfa[1]);
		eta[1] = Math.sqrt((-2) * Math.log(alfa[0])) * Math.cos(2 * Math.PI * alfa[1]);
		return eta;
	};

	ClassOfRandomVector.prototype.decayHoleckogo = function() {
		var a = [[],[]];
		a[0][0] = this.sigma[0][0] / Math.sqrt(this.sigma[0][0]);
		
		a[1][0] = this.sigma[1][0] / Math.sqrt(this.sigma[0][0]);


		a[0][1] = (this.sigma[0][1] - a[0][0] * a[1][0]);
		a[0][1] /= (Math.sqrt(this.sigma[1][1]) - a[1][0] * a[1][0]);
		
		a[1][1] = (this.sigma[1][1] - a[1][0] * a[1][0]);
		a[1][1] /= (Math.sqrt(this.sigma[1][1]) - a[1][0] * a[1][0]);
		return a;
	};

	ClassOfRandomVector.prototype.etaConvertToXi = function() {
		var eta = this.boxMullerCreateEta(),
			a = this.decayHoleckogo(),
			xi = [], 
			i,
			j;

		for (i = 0; i < 2; i += 1) {
			xi[i] = 0;
			for (j = 0; j < 2; j += 1) {
				xi[i] += a[i][j] * eta[j];
			};	
			xi[i] += this.mu[i];
		};

		return xi;
	};

	ClassOfRandomVector.prototype.createRandomVectors = function() {
		for (var i = 0; i < this.numberOfVectors; i += 1) {
			this.massiveOfXi[i] = this.etaConvertToXi();
		};
	};

	ClassOfRandomVector.prototype.paramertOfCanvas = (function () {
		var example = document.getElementById("example1");
			    ctx = example.getContext('2d');
        example.width  = 1200;
        example.height = 600;
        ctx.fillStyle = "#CECEFF";
        ctx.fillRect(0, 0, 1200, 600)
        ctx.fillStyle = "#121211";
        ctx.fillRect(0, 300, 1200, 1);
        ctx.fillRect(600, 0 , 1, 600);
	})();			    

	ClassOfRandomVector.prototype.drawRandomVectors = function() {
        ctx.fillStyle = "rgb(100, " + (255 - this.color) + "," + this.color + ")";
		for (var i = 0; i < this.numberOfVectors; i += 1) {
 			var x = this.massiveOfXi[i][0],
 			y = this.massiveOfXi[i][1];
 			ctx.fillRect(600 + x * this.zoom  - 1, 300 - y * this.zoom - 1, 2, 2);
 		};	
	};

	ClassOfRandomVector.prototype.drawVectorsWithErrorClass = function() {
		var x, y;
		ctx.fillStyle = "red";
		for (i = 0; i < this.numberOfVectors; i += 1) {
 			x = this.massiveOfXi[i][0],
 			y = this.massiveOfXi[i][1];
 			if (this.massiveOfDecisionXi[i] !== this.class) {		
	 			ctx.fillRect(600 + x * this.zoom  - 1, 300 - y * this.zoom - 1, 2, 2);
 			};
 		};	
	};

	ClassOfRandomVector.prototype.drawVectorsWithProbality = function(p) {
		var x, y;
		ctx.fillStyle = "red";
		for (i = 0; i < this.numberOfVectors; i += 1) {
 			x = this.massiveOfXi[i][0],
 			y = this.massiveOfXi[i][1];
 			if (this.normalDistributionDensity(this.massiveOfXi[i]) > p) {		
	 			ctx.fillRect(600 + x * this.zoom  - 1, 300 - y * this.zoom - 1, 2, 2);
 			};
 		};	
	};

	ClassOfRandomVector.prototype.normalDistributionDensity	= function(x) {	
		var result =  1 / (2 * Math.PI);
		
		var determinatorSigma = this.sigma[0][0] * this.sigma[1][1]; 
		determinatorSigma -= this.sigma[0][1] * this.sigma[1][0];
		
		result *= 1 / Math.sqrt(determinatorSigma);

		var xMinusMu = [x[0] - this.mu[0], x[1] - this.mu[1]];
		
		var sigmaInverse = [[], []];
		sigmaInverse[0][0] = this.sigma[1][1] / determinatorSigma;
		sigmaInverse[1][1] = this.sigma[0][0] / determinatorSigma;
		sigmaInverse[0][1] = - this.sigma[0][1] / determinatorSigma;
		sigmaInverse[1][0] = - this.sigma[1][0] / determinatorSigma;

		var numerator = xMinusMu[0] * xMinusMu[0] * sigmaInverse[0][0];
		numerator += xMinusMu[0] * xMinusMu[1] * sigmaInverse[1][0]; 
		numerator += xMinusMu[0] * xMinusMu[1] * sigmaInverse[0][1]; 
		numerator += xMinusMu[1] * xMinusMu[1] * sigmaInverse[1][1]; 
		
		result *= Math.exp(- numerator / 2);
		return result;
	};

	ClassOfRandomVector.prototype.recognition = function(massiveOfObjectsOfClass, w){
		for (var i = 0; i < this.massiveOfXi.length; i++) {
		 	this.massiveOfDecisionXi[i] = this.decisionRule(this.massiveOfXi[i], massiveOfObjectsOfClass, w);
		};
	};

	ClassOfRandomVector.prototype.decisionRule = function(xi, massiveOfObjectsOfClass, w){
		var f_i = [],
	 		min_index_f_i = 0;
		for (var i = 0; i < massiveOfObjectsOfClass.length; i++) {
			f_i[i] = 0;
			for (var j = 0; j < massiveOfObjectsOfClass.length; j++) {
				f_i[i] += w[j][i] * massiveOfObjectsOfClass[j].Pi * massiveOfObjectsOfClass[j].normalDistributionDensity(xi);
			};

			if (f_i[i] < f_i[min_index_f_i]) {
				min_index_f_i = i;
			};
		};

		return min_index_f_i + 1;

	};


	return ClassOfRandomVector;
})();
