const submit = document.querySelector('#submit');
const input = document.querySelector('#cpf');
const insertIncorrect = document.querySelector('#insertIncorrect');
const insertCorrect = document.querySelector('#insertCorrect')
const insertContainer = document.querySelector('#insert-container')

function mask(val) {
    var state = val.value;
    if (isNaN(state[state.length - 1])) {
        val.value = state.substring(0, state.length - 1);
        return;
    }
    val.setAttribute("maxlength", "14");
    if (state.length == 3 || state.length == 7) val.value += ".";
    if (state.length == 11) val.value += "-";
}

function Validate(value) {
    Object.defineProperty(this, 'formatted', {
        get: function () {
            return value.replace(/\D+/g, '')
        }
    })
}

Validate.prototype.isValid = function () {
    if (typeof this.formatted === 'undefined') return false;
    if (this.formatted.length !== 11) return false;

    const parcialValue = this.formatted.slice(0, -2)

    const d1 = this.setDigit(parcialValue);
    const d2 = this.setDigit(parcialValue + d1);

    const newValue = parcialValue + d1 + d2;
    return newValue === this.formatted
}

Validate.prototype.setDigit = function (parcialValue) {
    const valueInArray = parcialValue.split('');

    let decrement = valueInArray.length + 1;

    const reduceValue = valueInArray.reduce((cont, val) => {
        cont += (decrement * Number(val));
        decrement--;
        return cont
    }, 0)

    const valueDigit = 11 - (reduceValue % 11)
    return valueDigit > 9 ? '0' : String(valueDigit)
}

insertContainer.style.display = 'none'
insertCorrect.style.display = 'none'
insertIncorrect.style.display = 'none'
const validateValue = () => {
    const valueCPF = new Validate(input.value)
    insertContainer.style.display = ''
    setTimeout(() => { insertContainer.style.display = 'none' }, 2500)
    if (input.value === '') {
        insertCorrect.style.display = 'none';
        insertIncorrect.style.display = ''
        insertIncorrect.innerText = 'Insira algum valor !'
    } else if (valueCPF.isValid()) {
        insertIncorrect.style.display = 'none';
        insertCorrect.style.display = ''
        insertCorrect.innerText = 'CPF válido !'
    } else {
        insertCorrect.style.display = 'none';
        insertIncorrect.style.display = ''
        insertIncorrect.innerText = 'CPF inválido !'
    }
}
submit.addEventListener('click', () => validateValue())

document.addEventListener('keyup', function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) validateValue();
})