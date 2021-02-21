/* 19.2.2021. */

import React from "react";

import { Messages, Input, Footer } from "./components";

import './App.css';

/* postavljamo funkcije pomocu kojih generiramo nasumicno ime i boju avatara i za to koristimo npm pakete sillyname i randomcolor*/
function randomName(){
  const randomName = require("sillyname");
  const name = randomName();
  return name;
}

function randomColor(){
  const randomColor = require("randomcolor");
  const color = randomColor();
  return color;
}

class App extends React.Component {
  /* state u koji spremamo poruke i podatke o korisniku */
  state = {
    poruke: [],
    korisnik : {
      username: randomName(),
      color: randomColor()
    }
  }

  /* unutar constructora definiramo drone-a koji dobivamo iz Scaledrone servisa */
  /* pomocu njega omogucujemo slanje podataka i poruka */
  /* u data spremamo podatke o trenutnom korisniku - ako otvorimo aplikaciju u vise tabova na internet pregledniku svaki tab ce simulirati jednog korisnika */
  /* open event - definiramo sto ce se dogoditi ako dodje do pogreske i sto ce se dogoditi ako uspjesno dode do konekcije */
  /* definiramo varijablu member koja prima objekt korisnik i stavljamo ju na pocetak obejkta kao novi dio objekta korisnik pomocu spread operatora onda memberu dodajemo id koji dobijemo od Scaledrone (clientId) */
  /* member ubacujemo u stanje odma kada se korisnik spoji da bi lakse dosli do podataka o korisniku */
  constructor() {
    super();
    this.drone = new window.Scaledrone("TTAB80ZRqzFy41Il", {
      data: this.state.korisnik
    });
    this.drone.on("open", error => {
      if(error)
      {
        return console.error(error);
      }
      const member = {...this.state.korisnik};
      member.id = this.drone.clientId;
      this.setState({korisnik: member})
    });
   /* da bi mogli korstiti chat funkciju Scaledrone-a moramo se spojiti na sobu u kojoj ce se poruke emitirati */
   /* drone.subscribe omogucava instanciranje sobe - soba mora imati prefiks observable da bi mogla sadrzavati informacije o pošiljatelju */
    const room = this.drone.subscribe("observable-chatroom");
    /* koristimo message event za emitiranje poruke u sobi */
    /* message event je objekt koji u sebi ima podatke data(poruka koja je poslana), id(unikatan index poruke), timestamp, clientId(id clienta koji je posalo poruku) i member(objekt - podaci o korisniku koji je poslao poruku) */
    /* u ovom slucaju trebaju nam data i member */
    /* data i member koje dobijemo iz eventa ubacujemo u stanje komponente */
    /* message event prima podatke od drone.publisha */
    room.on("message", message => {
      const { data, member } = message;
      const poruke = this.state.poruke;
      poruke.push({member, text: data});
      this.setState({poruke: poruke});
    })
  }

  /* funkcija koja prima poruku iz Input komponente pomocu propsa */
  /* drone.publish omogucuje slanje poruke i unutar njega moramo navesti ime sobe i podatke koji se salju u ovom slucaju se salju podaci iz inputa */
  handlePoruka = (message) => {
    this.drone.publish({
      room: "observable-chatroom",
      message
    })
  }

  render(){
  return (
    <div className="App">
      <div className="App-header">
        <h1>MY CHAT APP</h1>
      </div>
      <Messages korisnik={this.state.korisnik} poruke={this.state.poruke} />
      <Input onPoruka={this.handlePoruka} />
      <Footer />
    </div>
  );}
}

export default App;
