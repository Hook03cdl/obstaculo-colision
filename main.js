const canvas = document.getElementById('micanvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var velocidad = 5;
class Figura {
	constructor({
		posicion = { x: 200, y: 200 },
		color = 'black',
		width = 50,
		height = 50,
		velocidad = { x: 0, y: 0 },
	}) {
		this.posicion = posicion;
		this.width = width;
		this.height = height;
		this.color = color;
		this.velocidad = velocidad;
	}
	draw() {
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'black';
		ctx.strokeRect(this.posicion.x, this.posicion.y, this.width, this.height);

		ctx.fillStyle = this.color;
		ctx.fillRect(this.posicion.x, this.posicion.y, this.width, this.height);
	}

	animacion() {
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		this.draw();

		this.colorRandom();
		this.posicion.x += this.velocidad.x;
		this.posicion.y += this.velocidad.y;
	}
	colicion(obj) {
		return (
			this.posicion.x + this.width >= obj.posicion.x &&
			obj.posicion.x + obj.width >= this.posicion.x &&
			this.posicion.y + this.height >= obj.posicion.y &&
			obj.posicion.y + obj.height >= this.posicion.y
		);
	}
	limites() {
		if (this.posicion.x < -this.width) {
			this.posicion.x = canvas.width;
		}
		if (this.posicion.x > canvas.width) {
			this.posicion.x = 0;
		}

		if (this.posicion.y < -this.height) {
			this.posicion.y = canvas.height;
		}
		if (this.posicion.y > canvas.height) {
			this.posicion.y = 0;
		}
	}
	colorRandom() {
		let rojo = Math.floor(Math.random() * 256);
		let verde = Math.floor(Math.random() * 256);
		let azul = Math.floor(Math.random() * 256);
		let color = `rgb(${rojo},${verde},${azul})`;

		this.color = color;
	}
	posicionRandom() {
		this.posicion.x = Math.random() * canvas.width;
		this.posicion.y = Math.random() * canvas.height;
	}
}
const center = {
	x: canvas.width / 2,
	y: canvas.height / 2,
};

const box1 = new Figura({
	posicion: {
		x: center.x - 150,
		y: center.y - 40,
	},
	height: 50,
	width: 50,
	color: 'blue',
	velocidad: {
		x: 5,
		y: 0,
	},
});

const box2 = new Figura({
	posicion: {
		x: center.x + 150,
		y: center.y - 30,
	},
	height: 25,
	width: 25,
	color: 'blue',
});

const obstaculo1 = new Figura({
	posicion: {
		x: center.x - 250,
		y: 150,
	},
	height: 30,
	width: 500,
	color: 'blue',
});

function control() {
	window.addEventListener('keydown', (e) => {
		switch (e.keyCode) {
			case 87: //arriba
				box1.velocidad.x = 0;
				box1.velocidad.y = -velocidad;
				break;
			case 83: // abajo
				box1.velocidad.x = 0;
				box1.velocidad.y = velocidad;
				break;
			case 68: //derecha
				box1.velocidad.y = 0;
				box1.velocidad.x = velocidad;
				break;
			case 65: //izquierda
				box1.velocidad.y = 0;
				box1.velocidad.x = -velocidad;
				break;
		}
	});
}

function actualizar() {
	window.requestAnimationFrame(actualizar);
	box1.animacion();
	box1.limites();
	if (box1.colicion(box2)) {
		velocidad++;
		box2.posicionRandom();
	} else if (box1.colicion(obstaculo1)) {
		box1.velocidad.x = 0;
		box1.velocidad.y = 0;
	}
	box2.draw();
	obstaculo1.draw();
}
control();
actualizar();
