
// Configurações
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Inicia o objeto 'firebase'
firebase.initializeApp(firebaseConfig);

// Pega o objeto para manipular os dados
const db = firebase.firestore();

// Quando atualizado o banco de dados ele passa o valor da collection sensores
db.collection('sensores').onSnapshot(function (data) {
    //Transforma em um array com os dados dos sensores
    const sensores = data.docs.map(function (val) {
        return val.data();
    })

    renderizarPainelControle(sensores);
});

function renderizarPainelControle(sensores) {
    const painelDeControle = document.getElementById('paineDeControle');

    painelDeControle.innerHTML = '';

    sensores.forEach(sensor => {
        painelDeControle.insertAdjacentElement('beforeend', criaCard(sensor));
    });
}

function criaCard(sensor) {
    const card = document.createElement('div');

    card.classList.add('card');

    const titulo = document.createElement('h2');

    titulo.insertAdjacentText('beforeend', 'Sensor');

    const umidade = document.createElement('span');
    umidade.insertAdjacentText('beforeend', 'Umidade: ');
    umidade.insertAdjacentElement('beforeend', criaSpanValor(`${sensor.umidade}%`));

    const longitude = document.createElement('span');
    longitude.insertAdjacentText('beforeend', 'Longitude: ');
    longitude.insertAdjacentElement('beforeend', criaSpanValor(sensor.coordenada.longitude));

    const latitude = document.createElement('span');
    latitude.insertAdjacentText('beforeend', 'Latitude: ');
    latitude.insertAdjacentElement('beforeend', criaSpanValor(sensor.coordenada.latitude));


    card.insertAdjacentElement('beforeend', titulo);
    card.insertAdjacentElement('beforeend', umidade);
    card.insertAdjacentElement('beforeend', longitude);
    card.insertAdjacentElement('beforeend', latitude);

    return card;

    // <div class="card">
    //     <h2>Sensor</h2>
    //     <span>Umidade: <span class="valor">12%</span></span>
    //     <span>Longitude: <span class="valor">-32.433434</span></span>
    //     <span>Latitude: <span class="valor">-42.234234234</span></span>
    // </div>
}

function criaSpanValor(valor) {
    const span = document.createElement('span');
    span.classList.add('valor');
    span.insertAdjacentText('beforeend', valor);
    return span;
}