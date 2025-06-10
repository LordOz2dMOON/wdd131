const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul');

button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value;
        deleteButton.textContent = '❌';

        li.append(deleteButton);
        list.append(li);

        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
        });
        input.value = '';
        input.focus();
    }
});