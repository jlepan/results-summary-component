async function fetchResults() {
    const scores = document.querySelectorAll(".result");
    const average = document.querySelector(".average-result")

    try {
        const r = await fetch("data.json", {
            headers: {
                Accept: "application/json"
            }
        })
        if (!r.ok) {
            throw new Error("Erreur serveur")
        }

        const results = await r.json();
        const fetchedTabScores = []
        
        for (let result of results) {
            fetchedTabScores.push(result.score)
        }

        if (scores.length !== fetchedTabScores.length) {
            throw new Error("Le nombre d'éléments dans le DOM et dans le JSON ne correspond pas");
        }

        scores.forEach((score, i) => {
            score.innerText = fetchedTabScores[i]
        })

        const totalScore = fetchedTabScores.reduce((acc, val) => acc + val, 0);
        average.innerText = Math.floor(totalScore / scores.length)

    } catch(e) {
        alert("Erreur lors du chargement des scores de l'utilisateur")
    }
}

fetchResults()