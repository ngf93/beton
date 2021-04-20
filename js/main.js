/* current year */
// let now = new Date();
// let cur_year = now.getFullYear();
// document.getElementById('year').innerHTML = cur_year;


const swiper = new Swiper('.swiper-1', {
  slidesPerView: 2,
  slidesPerColumn: 4,
  spaceBetween: 12,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    576: {
        slidesPerView: 3,
        slidesPerColumn: 4,
    }
  }
});

// if (window.matchMedia("(min-width: 992px)").matches) {
//   swiper.destroy(true, true);
// } 


/* show/hide sublevel elements */
function connect(id, val){
  document.getElementById(id).value = val;
}
function reverse(id, val){
  document.getElementById(id).value = val;
  document.getElementById(id).parentNode.style.setProperty('--value',val);
  document.getElementById(id).parentNode.style.setProperty('--text-value', JSON.stringify(val));
}

/* smooth scroll to anchor */
function toAnchor(id){
  console.log("id = "+id);
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}


/* current year */
let now = new Date();
let cur_year = now.getFullYear();
document.querySelector('#year').innerHTML = cur_year;


/*************** 
CUSTOM SELECT
****************/
let arr_selects = Array.from(document.querySelectorAll('.custom-select'));
arr_selects.forEach(function(item, i, arr) {
    let btn = item.querySelector('button');
    let options = item.querySelector('.options');

    const toggleMenu = function() {
        options.style.display = (options.style.display == 'block') ? 'none' : 'block'
    }

    btn.addEventListener('click', () => {
        toggleMenu();
    });

    document.addEventListener('click', function(e) {
        const target = e.target;
        const current_sel = target == item || item.contains(target);
        const sel_is_opened = options.style.display == 'block';
        if (!current_sel && sel_is_opened) {
            toggleMenu();
        }
    });

    let arr_radio = Array.from(item.querySelectorAll('input[type="radio"]'));
    arr_radio.forEach(function(item, i, arr) {
        if(item.checked){
            btn.innerHTML = item.value;
        }
        item.addEventListener('change', (event) => {
            btn.innerHTML = item.value;
            options.style.display = 'none';
        });
    });
});

/* show/hide element */
function toggle(el){
    el.style.display = (el.style.display == 'block') ? 'none' : 'block'
}

/************  
SEARCH / FILTER 
*************/
let searchEl = document.querySelectorAll('.search-in-list');
let arr_search = Array.from(searchEl);
arr_search.forEach(function(item, i, arr) {
    item.addEventListener('keyup', (event) => {
        listSearch(item);
    });
});
function listSearch(elem) {
    let phrase = elem.value.trim();
    let arr = elem.closest('.search-list').querySelectorAll('.search-item');
    let regPhrase = new RegExp(phrase, 'i');

    console.log('phrase = '+phrase);

    if(phrase.length == 0){
        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove('overlap');
            arr[i].classList.remove('diff');
        }
    } else {
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            flag = regPhrase.test(arr[i].innerHTML);
            if (flag) {
                arr[i].classList.add('overlap');
            } else {
                arr[i].classList.add('diff');
            }
            // if (flag) break;
        }
    }
}