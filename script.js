const display = document.getElementById('display');
let input = '';

function updateDisplay() {
  display.value = input || '0';
}

function calculate() {
  try {
    const result = eval(input);
    input = Number.isFinite(result) ? result.toString() : 'Ошибка';
  } catch (e) {
    input = 'Ошибка';
  }
  updateDisplay();
}

function handleInput(value) {
  if (value === 'C') {
    input = '';
  } else if (value === '=') {
    calculate();
    return;
  } else {
    if (input === 'Ошибка') input = '';
    input += value;
  }
  updateDisplay();
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    handleInput(val);
  });
});

document.addEventListener('keydown', e => {
  const allowed = '0123456789+-*/.=EnterBackspace';
  if (!allowed.includes(e.key)) return;

  if (e.key === 'Enter') handleInput('=');
  else if (e.key === 'Backspace') {
    input = input.slice(0, -1);
    updateDisplay();
  } else {
    handleInput(e.key);
  }
});
