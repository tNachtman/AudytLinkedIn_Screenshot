// Wyświetlanie różnych wartości w zależności od liczby punktów pobranych z wyniku
const url_string = window.location.href;
const url = new URL(url_string);
const score = url.searchParams.get("score");
let stopAction = false;

if(score === null){
    console.log(score);
    console.log(url);
    // window.open(window.location.href.concat(`?&score=0`), '_self');
    console.log(window.location.href.concat(`?&score=0`));
    setTimeout(() => {window.open(window.location.href.concat(`?&score=0`), '_self');},1000);
}

const get_score_text = (score) => {
    if(score != null){        
        if(score <= 10){
            return 'Masz dużo pracy nad profilem, ale nie przejmuj się - dostaniesz porady.';
        }else if(score <= 20){
            return 'Jest jeszcze wiele do poprawy, ale spokojnie - pomożemy Ci!';
        }else if(score < 50){
            return 'Twój profil można jeszcze dopracować.';
        }else if(score <= 80){
            return 'Twój profil wydaje się być dobrze uzupełniony, jednak wciąż można poprawić kilka rzeczy.';
        }else if(score < 100){
            return 'Brawo! Twój profil wygląda świetnie!';
        }else{
            return 'Rewelacja! Twój profil jest idealny!';
        }
    }else{
        return 'Ups! Coś poszło nie tak z pobieraniem Twojego wyniku. Spróbuj ponownie przesłać formularz.';
    }
}

const makeScreenshot = () => {
    stopAction = false;
    html2canvas(document.getElementById("screenshot"), {scale: 1, allowTaint: true, useCORS: true}).then(canvas => {
        canvas.id = "canvasID";
        let main = document.getElementById("main");
        while (main.firstChild){ main.removeChild(main.firstChild);}
        main.appendChild(canvas);
    });

    setTimeout(() => {document.getElementById("a-download").click()}, 1000);
    setTimeout(nextPage, 1500);
}

const autoScreen = (delay) => {
    setTimeout(() => {document.getElementById("a-make").click()}, delay);
}

const nextPage = () => {
    if(!stopAction){
        // Otwórz następny wynik
        window.open(window.location.href.replace(`?&score=${score}`, `?&score=${parseInt(score) + 1}`), '_self');
    }
}

$('#diagram').attr('data-circles-value', score);
$('#punktacja').text(score + " / 100 pkt.");
$('#opis').text(get_score_text(score));
$('#a-make').on('click', makeScreenshot);
$('#a-stop').on('click', () => {
    stopAction = true;
});
document.getElementById("a-download").addEventListener('click', function(){
    this.href = document.getElementById("canvasID").toDataURL();
    this.download = `graph_${score}.png`;
});

// Jeśli ma pobierać automatycznie odkomentuj tą sekcję. Na razie w ten sposób działa (uwaga: na razie lubi zjeść RAM)
// if(score <= 100 && !stopAction){
//     autoScreen(1500);
// }
