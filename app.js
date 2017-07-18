var state = {
	items: [{
		name: 'apples',
		checked: true
	},
	{
		name: 'bananas',
		checked: false
	}]
};

// State modification functions
var addItem = function(state, item, renderElem) {
    state.items.push({name: item, checked: false});
    renderList(state, renderElem);
};

var checkItem = function(state, item, renderElem){
	for(let i=0; i<state.items.length; i++){
		if(state.items[i].name == item){
			state.items[i].checked = !state.items[i].checked;
		}
	}
	renderList(state, renderElem);
};

var deleteItem = function(state, item, renderElem) {
	for(let i=0; i<state.items.length; i++){
		if(state.items[i].name == item){
			state.items.splice(i, 1);
		}
	}
	renderList(state, renderElem);
};

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
    	let isChecked = '';
    	if(item.checked){
    		isChecked = ' shopping-item__checked';
    	}
        return `<li>
			        <span class="shopping-item${isChecked}">${item.name}</span>
			        <div class="shopping-item-controls">
			          <button class="shopping-item-toggle">
			            <span class="button-label">check</span>
			          </button>
			          <button class="shopping-item-delete">
			            <span class="button-label">delete</span>
			          </button>
			        </div>
		      	</li>`;
    });
    element.html(itemsHTML);
};

// Event listeners
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val(), $('.shopping-list'));
});

$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
	let txt = $(this).closest('li').find('.shopping-item').text();
	checkItem(state, txt, $('.shopping-list'));
});

$('.shopping-list').on('click', '.shopping-item-delete', function(event){
	let txt = $(this).closest('li').find('.shopping-item').text();
	deleteItem(state, txt, $('.shopping-list'));
})

renderList(state, $('.shopping-list'));