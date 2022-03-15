// DOM : set variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// set an emppty array to use it after in all functions 
let apiQuotes = [];

// Fonctions pour remplacer la potentielle attente de chargement par un loader. (voir CSS et html)

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    
    if (!quote.author) {
        author.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

// function ppale: Get quotes from the API (current github link of API : https://github.com/ssokurenko/quotes-react-app )
async function getQuotes() {
    loading();
    const ApiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(ApiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch(error) {
        alert(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners : 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// load it : 
getQuotes();


//  Learning process : 
/* 

Get the data from the API: 
- async : browser continue to run without stopping for the js task. 
- fetch : 
- await something : do not use or print or... the variable before the event after is done. (here : before fetching the url.
    Indeed : it would try to set the response value before we had a chance to fetch data from the Api array =Cause an errOr
    learn asynchronous js. (combine async, await.... understand better)
Check which data structure is our API : here it is an array of js objects.
- Bien séparer la réponse de l'Api de l'affichage d'une citation.  
- .json => voir ce que cela engendre (response.json()); => We are getting a json file from our API. Dig to understand.
- response.json() => we turn that response into a json object (because otherwise it is only a series of stringS from the API).
- On va stocker nos quotes dans apiQuotes : an array.
- console.log(apiQuotes[0]['text']) => catch the first quote without its author (only the quote) as it is an array of object we need to access : [index][key]

On peux créer notre propre fichier quote-generator.js avec un array d'objet mais il faut alors une alternative dans le code: si l'API plante alors...

Génerer une nouvelle citation au hasard (générer des citations une à une + au hasard) : 
- On se base sur l'array de l'API pour générer un index de 1 à array.length (cad 1643 ici) au hasard. 
- Pour créer ce hasard et les index en chiffre arrondi : 
apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
- On le stock dans une variable (quote)
- On affiche celle-ci. 
- On appelle la function quand il y aura un array rempli via l'API donc dans le fonction ppal, dans le try aprés le fetch et json formattage. 

Manipuler le DOM pour que l'interaction se fasse entre le navigateur (la page web en HTML) et notre code javascript.

- On importe nos parties importante de l'HTML via l'objet document (et on les stocke dans des variables)
et on enlève les console.log utilisé pour débugger
De quoi on a besoin pour afficher des citations et leur auteur ? Quels id on va prendre dans le HTML ?
Tout ce qui va changer et ce qui va déclencher le changement : les boutons qui génèrent les changements lorsque l'utilisateur clique et l'objet du changement (citations, auteurs)

Comment afficher un auteur issu de l'array d'objet de l'API ?
On sait importer l'array d'objets pour s'en saisir dans notre script. 
On a bien vérifié que ça marche dans la console du navigateur (Dev Tools)
L'auteur s'affiche quand ? Quand on a une nouvelle citation/auteur (objet) de générée. 

L'id de la balise html qui affiche l'auteur est "author". 
Dés qu'une nouvelle citation/auteur est généré (pour l'instant seulement en console):
- l'auteur va changer => il sera relié à quote car c'est cette variable qui génère de manière random l'index. 
- Plus précisément : il faut cibler seulement l'auteur de la quote donc reprendre la key (ici en Js on appele pas forcément ça key...?)
- Se saisir de la key ici : quote.key (ne pas la confondre avec l'id même si pour author ce sera le même mot).
- Il sera relié au DOM via la variable de authorText (qui se saisie des balises correspondantes). 
- Mais pour cibler plus précisément non-pas la balise elle-même (span) mais bien le texte entre les balises : TextContent est utilisé.
Donc on a:
authorText.textContent = quote.author;
quoteText.textContent = quote.text;

Se saisir de la key, ça revient à dire : 
apiQuotes[index].key (author ou text) => apiQuotes[index]['text'] (VOIR les diff éventuelles et vérifier cette équivalence des syntax)

Gestion des actions utilisateur (boutons):

1/ Twitter button : générer un template qui permet de publier la citation sur twitter. 

1.1 Accéder au template de twitter via leur url et y inclure nos citations et auteur.
- On va chercher l'url préparé par twitter pour les dev. (un web intent url, ici c'est https://twitter.com/intent/tweet)
- On crée une fonction 
- On initialise une variable constante avec comme valeur l'url et une query (aprés le '?') dans l'url lui-même.
- On créé une variable text qui va accueillir une variable (d'où l'usage d'un "template string" car ce dernier permet de passer des variable dans un string)
- On va créer une variable.objectselector  dans l'url lui-même donc besoin de backsticks et non de simple guillemets. 
- Mieux comprendre les options de query sur le site de twitter.

1.2 Donner accés à cela pour l'utilisteur : relier cela à window (voir cette global window est souvent implicit).
ici on utilise la méthode "open" et on ajoute _blank dans sa partie "features" pour y ouvrir une nouvelle fenêtre. 

Pour l'instant, ce n'est pas suffisant : cliquer le bouton twitter n'engendre rien car il manque un eventListener. 

1.3 EventListener pour le tweet.
twitterBtn => notre constante qui relie au HTML via l'id 
addEventListener('click', tweetQuote) => un event listener de nature cliquer qui déclenche la fonction tweetQuote si on clique.
!!! Call back function (ne pas mettre les parenthèses pour avoir ce mécanisme essentiel)
2/ Un Event Listener pour relier le bouton de new quote à tout le mécanisme 

Exceptions:

Gestion des différences de longueurs (variations de style):

si la length du mot est > à x alors ça affichera une font-size plus petite : class "long-quote" définit dans le CSS. 
Pour s'en saisir et l'ajouter : classList.add("css class")
quoteText.classList.add('Long-quote');
Il faut alors juste la supprimer pour que l'autre prenne le relai.
=> ON/OFF de cette class.

Il reste qu'il faut alors garder le lien au HTML (à l'id initial).

Gestion des erreurs venant de l'API :

Error I have done : 
- J'ai mis une class et non un id pour la quote or je veux l'obtenir du DOM via un getElementById (et non une class).
J'ai donc une type error : TypeError: Cannot set properties of null (setting 'textContent')
Celle-ci permet de mieux comprendre pourquoi il faut relier le script.js tout en bas du html (ou alors avec un attribut async, voir nouvelles façon de faire).
OU de bien mettre les bon id et les orthographier. Il ne faut pas que TextContent renvoi "null" c'est à dire qu'il n'ait pas accés à l'emplacement entre les balise (donc pas accés aux balises).

- Le même erreur est arrivé car j'ai mis une class au lieu d'un id => du coup pour conserver le CSS j'ai mis un id identique pour le JS (ici c'était le bouton).


*/