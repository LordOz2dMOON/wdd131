const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function(){
    if (input.value.trim() !== '') {
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        listItem.textContent = input.value;
        deleteButton.textContent = '❌';
        listItem.append(deleteButton);
        list.append(listItem);
        
        deleteButton.addEventListener('click', function(){
            list.removeChild(listItem);
            input.focus();
        });
        
        input.value = '';
        input.focus();
    }
});