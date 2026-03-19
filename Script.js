/* =========================
   ROTATING EARTH (Three.js)
========================= */

const container = document.getElementById("globe");

/* scene */
const scene = new THREE.Scene();

/* camera */
const camera = new THREE.PerspectiveCamera(
75,
container.clientWidth / container.clientHeight,
0.1,
1000
);

/* renderer */
const renderer = new THREE.WebGLRenderer({ antialias:true });

renderer.setSize(container.clientWidth, container.clientHeight);

container.appendChild(renderer.domElement);


/* earth geometry */
const geometry = new THREE.SphereGeometry(5, 32, 32);


/* texture */
const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
"https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
);


/* material */
const material = new THREE.MeshStandardMaterial({
map: earthTexture
});


/* mesh */
const earth = new THREE.Mesh(geometry, material);

scene.add(earth);


/* light */
const light = new THREE.DirectionalLight(0xffffff,1);

light.position.set(5,3,5);

scene.add(light);


camera.position.z = 10;


/* animation */
function animate(){

requestAnimationFrame(animate);

earth.rotation.y += 0.002;

renderer.render(scene,camera);

}

animate();

/* =========================
   LIVE SATELLITE MAP
========================= */

const map = L.map('map').setView([6.2,6.7],6);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);


/* =========================
   WILDFIRE DETECTION
========================= */

const fires = document.getElementById("fires");

fetch("https://eonet.gsfc.nasa.gov/api/v3/events")

.then(res=>res.json())

.then(data=>{

data.events.slice(0,5).forEach(event=>{

const li = document.createElement("li");

li.textContent = event.title;

fires.appendChild(li);

});

});


/* =========================
   SPACE DATA CHART
========================= */

const ctx = document
.getElementById("spaceChart");

new Chart(ctx,{
type:"line",
data:{
labels:["Mon","Tue","Wed","Thu","Fri"],
datasets:[{
label:"Satellite Signals",
data:[12,19,8,15,22]
}]
}
});