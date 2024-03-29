const carCanvas = document.getElementById('carCanvas');
carCanvas.width = 200;
const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = 600;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 1500;
const cars = generateCars(N);

let bestCar = cars[0];
if (localStorage.getItem('bestBrain')) {
	for (let i = 0; i < cars.length; i++) {
		cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'));
		if (i != 0) {
			NeuralNetwork.mutate(cars[i].brain, 0.2);
		}
	}
}

const track_1 = [	
	new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -900, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -1300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1300, 30, 50, 'DUMMY', 2),
];

const track_2 = [	
	new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -800, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -800, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -900, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -900, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -1100, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1400, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1400, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -1700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1700, 30, 50, 'DUMMY', 2),
];

const track_3 = [
	new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -900, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1100, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1200, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -1300, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1400, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -1600, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -1800, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -1800, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -2000, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -2200, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -2200, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -2400, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -2500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -2600, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -2700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -2800, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -2900, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -3100, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -3200, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -3400, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -3500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -3700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -3800, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -3900, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -4000, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -4200, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(0), -4400, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -4500, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(2), -4700, 30, 50, 'DUMMY', 2),
	new Car(road.getLaneCenter(1), -4800, 30, 50, 'DUMMY', 2),
];

const traffic = track_1;

animate();

function save() {
	localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
}

function discard() {
	localStorage.removeItem('bestBrain');
}

function generateCars(N) {
	const cars = [];
	for (let i = 1; i <= N; i++) {
		cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'));
	}
	return cars;
}

function animate(time) {
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].update(road.borders, []);
	}
	for (let i = 0; i < cars.length; i++) {
		cars[i].update(road.borders, traffic);
	}
	bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)));

	carCanvas.height = window.innerHeight;
	networkCanvas.height = window.innerHeight;

	carCtx.save();
	carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

	road.draw(carCtx);
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].draw(carCtx, 'red');
	}
	carCtx.globalAlpha = 0.2;
	for (let i = 0; i < cars.length; i++) {
		cars[i].draw(carCtx, 'blue');
	}
	carCtx.globalAlpha = 1;
	bestCar.draw(carCtx, 'blue', true);

	carCtx.restore();

	networkCtx.lineDashOffset = -time / 60;
	Visualiser.drawNetwork(networkCtx, bestCar.brain);
	requestAnimationFrame(animate);
}
