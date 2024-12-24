
export  function FirstSignup() {

    return( <form >
              <div className="md:container md:mx-auto">
                <div className="md:container md:mx-auto">
                    <h2>Information personnel</h2>
                    <h2>Veuillez entrez votre information personnel</h2>
                    <div>
                        <label htmlFor="">Nom</label>
                        <input type="text" placeholder="Nom" name="nom"/>
                    </div>
                    <div>
                        <label htmlFor="">Prenom</label>
                        <input type="text" placeholder="Prenom" name="prenom"/>
                    </div>
                    <div>   
                        <label htmlFor="">Date de naissance</label>
                        <input type="date" placeholder="date de naissance" name="dateAnniversaire"/>
                    </div>
                    <div>
                        <label htmlFor="">CIN</label>
                        <input type='number' max={12} placeholder="CIN" name="cin"/>
                    </div>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Sexe</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="sexe-homme"
                    name="push-homme"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Homme
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="sexe-femme"
                    name="sexe-femme"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    femme
                  </label>
                </div>
              </div>
            </fieldset>
                </div>
              </div>  
            </form>
    )
  }

  export  function ThirdSecondSignup() {

    return( <form >
              <div className="md:container md:mx-auto">
                <div className="md:container md:mx-auto">
                    <h2>Contact</h2>
                    <h2>Veuillez entrez votre information personnel</h2>
                    <div>
                        <label htmlFor="">Téléphone</label>
                        <input type="text" placeholder="téléphone" name="phone"/>
                    </div>
                    <div>
                        <label htmlFor="">Adresse email</label>
                        <input type="email" placeholder="Email" name="email"/>
                    </div>
                </div>
              </div>  
            </form>
    )
  }


  export  function SecondSignup() {

    return( <form >
              <div className="md:container md:mx-auto">
                <div className="md:container md:mx-auto">
                    <h2>Contact</h2>
                    <h2>Veuillez entrez votre information personnel</h2>
                    <div>
                        <label htmlFor="">Téléphone</label>
                        <input type="text" placeholder="téléphone" name="phone"/>
                    </div>
                    <div>
                        <label htmlFor="">Adresse email</label>
                        <input type="email" placeholder="email" name="email"/>
                    </div>
                    <div>
                        <label htmlFor="">Adresse </label>
                        <input type="email" placeholder="adresse" name="adresse"/>
                    </div>
                </div>
              </div>  
            </form>
    )
  }