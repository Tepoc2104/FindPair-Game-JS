//Переменные для создания и прорисовки блоков div
var mainBlock = document.querySelector('.main-block');
var block;
var result=0;
var Pairs =  [1, 5, 4, 8,  2, 6, 3, 7,  3, 7, 2, 6,4, 8, 1, 5];
var cachemas = [0,0,0,0,0,0,0,0];
//Переменные для проверки идентичности текущего и прошлого квадрата
var flag=false;
var flagid;
var flagcolor;
//Переменные для проверки победы
var wincounter;
var victory=false;
//Переменные таймера
var seconds = 0;
var tens = 0;
var minutes = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var appendMinutes = document.getElementById("minutes");
var Interval;

Pairs.sort(compareRandom); //Мешаем массив парных чисел
for(var i=0; i<4; i++){
    for(var j=0; j<4;j++){

        block = document.createElement('div');

        block.className = "block white";
        //т.к. все дальнейшие проверки происходят по ID а блоков с двумя одинаковыми ID быть не может
        //делаю проверку на ID с занесением в кэш. Если такой ID уже был, прибавляю к нему 10
        for(var k=0; k<8; k++){
            if(Pairs[result]==cachemas[k]){
                block.setAttribute('id', Pairs[result]+10);
                break;
            }
            else if(k==7){
                block.setAttribute('id', Pairs[result]);
                cachemas.unshift(Pairs[result]);
                cachemas.pop();
                break;
            }
        }
        //Функция проверки и перерисовки цвета карты при клике на блок
        block.setAttribute("onclick","CheckPair(id)");

        mainBlock.appendChild(block);
        result++;
    }
}
function Start() { // Кнопка Старт/Повторить
    if (victory==true)
        window.location.reload();
    var getElem=document.getElementById("dis");
    getElem.className = "enabled";
    wincounter=0;
    Interval = setInterval(startTimer, 10);


}
function compareRandom(a, b) { //Функция для перемешивания массива
    return Math.random() - 0.5;
}


function startTimer () { //Таймер
    tens++;

    if(tens < 9){
        appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9){
        appendTens.innerHTML = tens;

    }

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59){
        minutes++;
        appendMinutes.innerHTML = "0"+ minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0"+0;

    }
    if (minutes > 9){
        appendMinutes.innerHTML = minutes;
    }

}


function CheckPair(id) { // Проверка и прорисовка квадратов
    var element = document.getElementById(id);
    switch (id) {
        case '1': element.className = "block red"; break;
        case '2': element.className = "block green";break;
        case '3': element.className = "block yellow";break;
        case '4': element.className = "block blue"; break;
        case '5': element.className = "block orange"; break;
        case '6': element.className = "block pink"; break;
        case '7': element.className = "block black"; break;
        case '8': element.className = "block brown";break;

        case '11': element.className = "block red"; break;
        case '12': element.className = "block green"; break;
        case '13': element.className = "block yellow";break;
        case '14': element.className = "block blue"; break;
        case '15': element.className = "block orange"; break;
        case '16': element.className = "block pink"; break;
        case '17': element.className = "block black";break;
        case '18': element.className = "block brown";break;
    }
    //Сравнение квадратов
    if (flag == true){
        if (element.className == flagcolor){
            //Если цвета соответствуют эти квадраты отключаются
            wincounter++;
            // При победе вылетает Сообщение со временем прохождения и кнопка Н"ачать игру" меняется на "Повторить"
            if (wincounter==8)
            {
                alert('Вы победитель!\nЗатраченное время:'+minutes+":"+seconds+":"+tens);
                var getElem=document.getElementById("dis");
                getElem.className = "disabled"
                victory=true;
                clearInterval(Interval);
                getElem=document.getElementById("start");
                getElem.textContent = "Повторить?";
            }
            element.className += " disabled";
            var getElem = document.getElementById(flagid);
            getElem.className = flagcolor+" disabled";
            flagcolor=null;
            flagid=null;
            flag=!flag;

        }
        else { //При неправильном сборе текущий и прошлый квадраты закрашиваются в белый.
            //alert("Попробуйте еще раз!");\
            setTimeout(function()
            {
                element.className = "block white";
                var getElem = document.getElementById(flagid);
                getElem.className = "block white";
                flagcolor=null;
                flagid=null;
                flag=!flag;

            }, 1000);

        }
    }
    else {
        flag=!flag;
        flagcolor = element.className; //Запоминаем первый открытый квадрат(класс и ИД)
        flagid = id;
    }
}