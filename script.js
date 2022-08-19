let clock  = document.getElementById('clock');
let addAlarm = document.getElementById('addAlarm');
let ih = document.getElementById('IH');
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];

// Displaying the time on the screen
function time() {
    let date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    clock.innerHTML = `${hours}:${minutes}:${sec}`;
    compare();
}
setInterval(time, 0);
// time change validation
function changeHours() {
    let b = document.clock.next1;

    validateInput(b, 5);
    b.addEventListener('input', e => {
        const v = e.target.value;

        b.value = v.length ? v.replace(/:/g, '').match(/.{1,2}/g).join(':') : '';
    });
    b.addEventListener('inputre', e => {
        const v = e.target.value;
    });
}

function validateInput(b, amount) {
    let s = b.value;

    if ((s) && s.length > 0) {
        if (s.length > 5) {
            b.value = s.substr(0, s.length-1);
        } else if (s.length > 0) {
            if (isNaN(parseInt(s.charAt(s.length-1)))) {
                if (s.length > 1) {
                    b.value = s.substr(0, s.length-1);
                } else {
                    b.value = "";
                }
            }
        }
    }
}
//Checking the time zone
ih.addEventListener('input', function() {
    let a = this.value;
    let sum = a[0] + a[1];
    let sum2 = a[3] + a[4];

    if (this.value.length > 1 && this.value.length <= 2) {
        if (sum > 23) {
            this.value = a[0];
        }
    }
    if (this.value.length > 4 && this.value.length <= 5) {
        if (sum2 > 59) {
            this.value = sum + ':' + a[3];
        }
    }
});

let alarm = [];
loadBud();

//Outputting information from the input to the page
document.getElementById('inputSub').onclick = function() {
    event.preventDefault();
    let commentIH = document.getElementById('IH');
    let comment = {
        hours1: commentIH.value,
        time: Math.floor(Date.now() / 1000),
        id: alarm.length + 1,
    };

    if (commentIH.value.length < 5) {
        alert('Enter full time');
    } else {
        commentIH.value = '';
        alarm.push(comment);
        saveBud();
        showBud(comment.id, comment.hours1);
        compare();
    }
};
//save information in LocalStorage
function saveBud() {
    localStorage.setItem('addAlarm', JSON.stringify(alarm));
}
//load information with LocalStorage
function loadBud() {
    if (localStorage.getItem('addAlarm')) {
        alarm = JSON.parse(localStorage.getItem('addAlarm'));
        alarm.forEach(function (item) {
            let budField = document.getElementById('addAlarm');
            const div = document.createElement('div');
            const button = document.createElement('button');

            button.setAttribute("id", item.id);
            button.append('Удалить');
            div.append(item.hours1, button);
            div.classList.add('infoAlarm');
            button.classList.add('delButton');
            budField.appendChild(div);
            button.addEventListener('click', function  (obj) {
                event.preventDefault();
                const dataFromStorage = JSON.parse(localStorage.getItem('addAlarm'));
                if (dataFromStorage) {
                    for (let i = 0; i < dataFromStorage.length; i++) {
                        if (dataFromStorage[i].id == this.id) {
                            div.remove();
                            dataFromStorage.splice(i, 1);
                            localStorage.setItem('addAlarm', JSON.stringify(dataFromStorage));
                        }
                    }
                }
            });
        })
    }
}
//show information with LocalStorage
function showBud(id, hours1) {
    let budField = document.getElementById('addAlarm');
    const div = document.createElement('div');
    const button = document.createElement('button');

    button.setAttribute("id", id);
    button.append('Удалить');
    div.append(hours1, button);
    div.classList.add('infoAlarm');
    button.classList.add('delButton');
    budField.appendChild(div);
    button.addEventListener('click', function  (obj) {
        event.preventDefault();
        const dataFromStorage = JSON.parse(localStorage.getItem('addAlarm'));
        if (dataFromStorage) {
            for (let i = 0; i < dataFromStorage.length; i++) {
                if (dataFromStorage[i].id == this.id) {
                    dataFromStorage.splice(i, 1);
                    div.remove();
                    localStorage.setItem('addAlarm', JSON.stringify(dataFromStorage));
                }
            }
        }
    });
}
//Comparison of time with an alarm clock
function compare() {
    let date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const dataFromStorage = JSON.parse(localStorage.getItem('addAlarm'));

    if (dataFromStorage) {
        for (let i = 0; i < dataFromStorage.length; i++) {
            if (dataFromStorage[i].hours1 == hours + ':' + minutes && sec == '00') {
                let a = dataFromStorage[i].id;
                let id = document.getElementById(a);
                if(id.id == a){
                    document.getElementById(a).click();
                }
                dataFromStorage.splice(i, 1);
                localStorage.setItem('addAlarm', JSON.stringify(dataFromStorage));
                setTimeout(function () {
                    myAudio.play();
                }, 2);
                if (modal.style.display = 'none') {
                    modal.style.display = 'block';
                }

                function displayNone() {
                    modal.style.display = 'none';
                    if (modal.style.display = 'none') {
                        setTimeout(function () {
                            myAudio.stop();
                        }, 1);
                    }
                }
                setTimeout(displayNone, 15000);
            }
        }
    }
}
//Audio alarm
let myAudio = new Audio('./audio/bud.mp3');
HTMLAudioElement.prototype.stop = function () {
    this.pause();
    this.currentTime = 0.0;
};

span.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        myAudio.stop();
    };
};
