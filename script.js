//------------------
//partie du form-checker
//------------------

//1. pointer les inputs
const inputs = document.querySelectorAll(
    'input[type="text"],input[type="password"]'
  );
  console.log(inputs); //vérifier que tous les inputs sont selectionnés
  
  //1.1 déclarer les variables de stockage d'informations
  let pseudo, email, password, confirmPass; //variable stockant les infos
  const progressBar = document.getElementById("progress-bar");
  
  //1.2 déclarer la logique de controle dynamique
  const errorDisplay = (tag, message, valid) => {
    const Container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");
  
    if (!valid) {
      Container.classList.add("error");
      span.textContent = message;
    } else {
      Container.classList.remove("error");
      span.textContent = message;
    }
  };
  
  //1.3 déclarer la logique de controle pour chaque input
  const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
      //je test la longueur
      errorDisplay("pseudo", "le pseudal doit faire entre 3 et 20 caractères"); //le tag est donc pseudo, le msg est donc blabla 3-20
      pseudo = null; //je vide la variable pseudo si pas valide
    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      //je test le caractères
      errorDisplay(
        "pseudo",
        "le pseudo ne doit pas contenir de caracteres spéciaux"
      ); //le tag est donc pseudo, le msg est donc blabla caract spe
      pseudo = null; //je vide la variable pseudo si pas valide
    } else {
      //je valide
      errorDisplay("pseudo", "", true); //le tag est donc pseudo, le msg y'en a pas, on passe sur true
      pseudo = value; //on récupère l'info écrite dans l'input grace à value
    }
  };
  
  const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      errorDisplay("email", "Le mail n'est pas valide");
      email = null;
    } else {
      errorDisplay("email", "", true);
      email = value;
    }
  };
  
  const passwordChecker = (value) => {
    progressBar.classList = ""; //permet de remettre la progress bar au niveau de l'input sans empiler les class dans le HTML
  
    //doit tester : une maj / 8 carac min / 1 caract spe / 1 chiffre
    if (
      !value.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/ //test tout ce qu'il faut
      )
    ) {
      errorDisplay(
        "password",
        "doit contenir au moins : une maj / 8 carac min / 1 caract spe / 1 chiffre"
      );
      progressBar.classList.add("progressRed");
      password = null;
    } else if (value.length < 12) {
      progressBar.classList.add("progressBlue");
      errorDisplay(
        "password",
        "pas mal mais encore un effort on vise le 12 !",
        true
      );
      password = value;
    } else {
      progressBar.classList.add("progressGreen");
      password = value;
    }
    if (confirmPass) confirmChecker(confirmPass); //si le confirmPass n'est pas vide lance moi la function confirmPass pour vérifier que password et confirmPass sont bien égaux
  };
  
  const confirmChecker = (value) => {
    if (value !== password) {
      errorDisplay("confirm", "Les Mdp ne correspondent pas chef");
      confirmPass = false;
    } else {
      errorDisplay("confirm", "", true);
      confirmPass = true;
    }
  };
  
  //2. logique de controle : on a besoin d'analyser ce qui dans les inputs et de valider ou non
  inputs.forEach((input) => {
    //pour chaque input présent dans la const inputs
    input.addEventListener("input", (e) => {
      //j'écoute les inputs
      //console.log(e.target.id); //j'affiche l'id de l'input ou je suis
      //console.log(e.target.value); //j'affiche la valeur écrite dans l'input ou je suis
      switch (e.target.id) {
        case "pseudo":
          pseudoChecker(e.target.value);
          break;
        case "email":
          emailChecker(e.target.value);
          break;
        case "password":
          passwordChecker(e.target.value);
          break;
        case "confirm":
          confirmChecker(e.target.value);
          break;
        default:
          null;
      }
    });
  });
  
  //3.Récupérer les données écrites par le user dans les inputs
  //3.1 déclarer la const pour cibler le form
  const form = document.querySelector("form");
  
  //3.2
  form.addEventListener("submit", (e) => {
    console.log("le form part");
    e.preventDefault();
  
    if (pseudo && email && password && confirmPass) {
      const data = {
        pseudo: pseudo,
        email: email,
        password: password,
      };
      console.log(data);
  
      inputs.forEach((input) => {
        input.value = "";
        progressBar.classList = "";
      });
  
      pseudo = null;
      email = null;
      password = null;
      confirmPass = null;
      alert("ok ça c'est fait");
    } else {
      alert("manque un truc chef");
    }
  });
  
  //--------------------------
  //brouillon
  //--------------------------
  // const pseudoChecker = (value) => {
  //     console.log(value); //m'affiche la valeur dans l'input pointé (pseudo)
  //     const pseudoContainer = document.querySelector(".pseudo-container");
  //     const errorDisplay = document.querySelector(".pseudo-container > span");
  
  //     if (value.length > 0 && (value.length < 3 || value.length > 20)) {
  //       pseudoContainer.classList.add("error"); //j'ajoute la classe error dans le container de pseudo
  //       errorDisplay.textContent = "Le pseudal doit être entre 3 et 20 caractère"; //j'affiche le msg dans la variable qui pointe la span (endroit ou afficher le msg d'erreur)
  //     } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
  //       //regex test si diffréent de : lettre min / lettre maj / tiret / point, si autre chose que ces valeurs alors on a un caract spécial dedans donc pas bon pour le pseudo
  //       pseudoContainer.classList.add("error"); //j'ajoute la classe error dans le container de pseudo
  //       errorDisplay.textContent =
  //         "Le pseudal ne doit pas contenir de caractères spéciaux"; //j'affiche le msg dans la variable qui pointe la span (endroit ou afficher le msg d'erreur)
  //     } else {
  //       pseudoContainer.classList.remove("error"); //retire la classe error et fait donc disparaitre la zone avec msg d'erreur
  //       errorDisplay.textContent = "";
  //     }
  //   };
  
  //------------------
  //partie du text-anim
  //------------------
  const target = document.getElementById("target");
  let array = ["Pseudo", "Email", "MDP", "Confirmer-le-MDP"];
  let wordIndex = 0;
  let letterIndex = 0;
  
  // target.textContent = array[0];
  
  const createLettre = () => {
    const letter = document.createElement("div");
    target.appendChild(letter);
  
    letter.textContent = array[wordIndex][letterIndex];
  
    setTimeout(() => {
      letter.remove();
    }, 2000);
  };
  
  const loop = () => {
    setTimeout(() => {
      if (wordIndex >= array.length) {
        wordIndex = 0;
        letterIndex = 0;
        loop();
      } else if  (letterIndex < array[wordIndex].length) {
  
        createLettre();
        letterIndex++;
        loop();
      } else {
        wordIndex++;
        letterIndex = 0;
        setTimeout(() => {
          loop();
        }, 2000);
      }
    }, 60);
  };
  loop();