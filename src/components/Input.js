/* definiramo stanje unutar komponente kako bi mogli spremiti vrjednost koju korisnik upise u polje za unos */
import { useState } from "react";

function Input(props){
    const { onPoruka } = props;

    const [text, setText] = useState("");
    
    /* mjenjamo stanje u vrjednost koju korisnik unese */
    const handleValueChange = (event) => {
        setText(event.target.value);
    }

    /* sa ovom funkcijom prekidamo uobicajnu radnju form elementa tako sto ne saljemo podatke nigdje */
    /* praznimo stanje komponente za buduce unose */
    /* stavljamo funckiju uz propsa unutar ove funkcije da bi poslali poruku u stanje komponente */
    const onFormSubmit = (e) => {
        e.preventDefault();
        setText("");
        onPoruka(text);
    }
    
    /* stavljamo u form element da bi korisnik mogao pritiskom na tipku enter poslati poruku */
    return(
        <div className="input-div">
            <form onSubmit={e => onFormSubmit(e)} className="form">
                <input type="text" onChange={handleValueChange} placeholder="Write your message" autoFocus={true} value={text}className="inp"/>
                <button className="btn">Send!</button>
            </form>
        </div>
    )
}

export default Input;