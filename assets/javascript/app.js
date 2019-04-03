var config = {
    apiKey: "AIzaSyBEfJghQ1JZU8mkJXouNVvHoFk2ij0-Qog",
    authDomain: "fir-hw-d556d.firebaseapp.com",
    databaseURL: "https://fir-hw-d556d.firebaseio.com",
    projectId: "fir-hw-d556d",
    storageBucket: "",
    messagingSenderId: "480144310532"
};
firebase.initializeApp(config);

// Create a variable to reference the db
const db = firebase.firestore()

// Initial Variables
let name,
    ETA,
    frequency,
    nextArrival,
    minAway

document.querySelector('#add-user').addEventListener('click', e => {
    e.preventDefault()

    let id = db.collection('users').doc().id
    db.collection('users').doc(id).set({
        name: document.querySelector('#name-input').value,
        ETA: document.querySelector('#ETA-input').value,
        frequency: document.querySelector('#frequency-input').value,
        nextArrival: document.querySelector('#nextArrival-input').value,
        minAway: document.querySelector('#minAway-input').value,
    })
    document.querySelector('#name-input').value = ''
    document.querySelector('#ETA-input').value = ''
    document.querySelector('#frequency-input').value = ''
    document.querySelector('#nextArrival-input').value = ''
    document.querySelector('#minAway-input').value = ''
})

db.collection('users').onSnapshot(snap => {
    document.querySelector('#userDisp').innerHTML = ''
    snap.docs.forEach(doc => {
        let { name, ETA, frequency, nextArrival, minAway } = doc.data()

        let docElem = document.createElement('div')
        docElem.classList.add('card')
        docElem.classList.add('card-default')
        docElem.id = 'incoming-train'
        docElem.innerHTML = `
        <div class="card-header">
        ${name}
        </div>
        <div class="card-body">
        <h5>ETA: ${eta}</h5>
        <h5>frequency: ${frequency}</h5>
        <h5>nextArrival: ${nextArrival}</h5>
        <h5>minAway: ${minAway}</h5>
        </div>
        `
        document.querySelector("#userDisp").append(docElem)
    })
})