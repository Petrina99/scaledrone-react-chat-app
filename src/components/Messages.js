/* koristimo npm paket random da bi generirali index za svakog clana liste */
function randomId(){
    const random = require("random");
    const id = random.float();
    return id;
}

function Messages(props){

    const { korisnik } = props;
    const { poruke } = props;

    /* funckija prima svaku poruku iz niza poruke iz stanja App komponente i stavlja ih u jednog clana liste */
    /* radimo destrukciju objekta message da bi izvukli podatke o trenutnom korisniku i podatke poruke */
    /* posto smo member.id dodali u stanje korisnik trenutni korisnik mora imati isti id kao korisnik unutar scaledrone clienta
    - pomocu toga dodjeljujemo stilove koje prima lista */
    const ispisiPoruke = (message) => {
        const { member, text } = message;
        const stil = member.id === korisnik.id ? "poruka-trenutni-korisnik" : "poruka";
        const stilPoruka = member.id === korisnik.id ? "boja-poruke-trenutni" : "boja-poruke";
        const sadrzajStil = member.id === korisnik.id ? "poruka-sadrzaj-trenutni" : "poruka-sadrzaj";
        return(
            <li className={stil} key={randomId()}>
                <div className={sadrzajStil}>
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className={stilPoruka}> 
                        <p>{text}</p>
                    </div>
                </div>
            </li>
        )
    };

    /* uzimamo props poruke iz App komponente i sa map() metodom prolazimo kroz sve clanove niza poruke i saljemo ih u gore definiranu funkciju */
    return(
        <div className="lista-div">
            <ul className="lista-poruka">
                {poruke.map(el => ispisiPoruke(el))}
            </ul>
        </div>
    )
}

export default Messages;