let clock  = document.querySelector('.clock');
let addBud = document.querySelector('.addBud');
let ih = document.querySelector('#IH');
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];

// Displaying the time on the screen
function time(){
    let date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    clock.innerHTML = `${hours}:${minutes}:${sec}`;
    compare()
}
setInterval(time,100);
// time change validation
function changeHours(){
    let b = document.clock.next1;

    validateInput( b, 5 );
    b.addEventListener('input', e => {
        const v = e.target.value;

        b.value = v.length ? v.replace(/:/g, '').match(/.{1,2}/g).join(':') : '';
    });
    b.addEventListener('inputre', e => {
        const v = e.target.value;

    })
}

function validateInput( b, amount ){
    let s = b.value;

    if ((s) && s.length > 0) {
        if (s.length > 5) {
            b.value = s.substr( 0, s.length-1 );
        }
        else if (s.length > 0) {
            if ( isNaN( parseInt( s.charAt( s.length-1 ) ) ) ) {
                if (s.length > 1) {
                    b.value = s.substr( 0, s.length-1 );
                }
                else {
                    b.value = "";
                }
            }
        }
    }
}

let alarm = [];

loadBud();
//Outputting information from the input to the page
document.getElementById('inputSub').onclick = function() {
    event.preventDefault();
    let commentIH = document.getElementById('IH');
    let comment = {
        hours1: commentIH.value,
        time: Math.floor(Date.now() / 1000),
    };
    let ar = document.getElementById("IH").value.split(':');
    let ar2 = ar.map(function (name) {
        return name.replace(/[^0-9\.]/g, '');
    });

    if (commentIH.value.length < 5) {
        alert('Enter full time')
    }
    else {
        commentIH.value = '';
        alarm.push(comment);
        saveBud();
        showBud();
    }
};
//Checking the time zone
ih.addEventListener('input', function() {
    let a = this.value;
    let sum = a[0] + a[1];
    let sum2 = a[3] + a[4];

    if (this.value.length > 1 && this.value.length <= 2) {
        if (sum > 23) {
            this.value = a[0]
        }
    }
    if (this.value.length > 4 && this.value.length <= 5) {
        if (sum2 > 59) {
            this.value = sum + ':' + a[3]
        }
    }
});
//save information in LocalStorage
function saveBud() {
    localStorage.setItem('addBud', JSON.stringify(alarm));
}
//load information with LocalStorage
function loadBud() {
    if (localStorage.getItem('addBud')) alarm = JSON.parse(localStorage.getItem('addBud'));
    showBud()
}
//show information with LocalStorage
function showBud() {
    let budField = document.getElementById('addBud');
    let out = '';

    alarm.forEach(function (item) {
        out += `<p class="alert" role="alert">hours ${item.hours1} <button>Удалить</button></p>`;
    });
    budField.innerHTML = out;
}
//Comparison of time with an alarm clock
function compare() {
    let date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const dataFromStorage = JSON.parse(localStorage.getItem('addBud'));

    if (dataFromStorage) {
        for (let i = 0; i < dataFromStorage.length; i++){
            if (dataFromStorage[i].hours1 == hours+':'+minutes && sec == 00) {
                dataFromStorage.splice(i,1);
                localStorage.setItem('addBud', JSON.stringify(dataFromStorage));
                modal.style.display = 'block';
                setTimeout(function () {
                    document.getElementById("myaudio").play();
                },1)
                function displayNone() {
                    modal.style.display = 'none';
                    location.reload()
                }
                setTimeout(displayNone, 15000);
            }
        }
    }
}
//Deleting an alarm manually
let alert = document.querySelectorAll('.alert');
alert.forEach(block => block.addEventListener('click', removeBlock));
function removeBlock() {
    let block = this;
    let blockId = setInterval(function() {
        clearInterval(blockId);
        block.remove();
        const dataFromStorage = JSON.parse(localStorage.getItem('addBud'));

        if (dataFromStorage) {
            if (dataFromStorage.hours1 == block.hours1){
                dataFromStorage.splice(0,1);
                localStorage.setItem('addBud', JSON.stringify(dataFromStorage));
            }
        }
    }, 1)
};

span.onclick = function() {
    modal.style.display = 'none'
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
