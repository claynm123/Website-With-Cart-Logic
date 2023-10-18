if (document.readyState == 'loading')
    {
        document.addEventListener('DOMContentLoaded',ready)
    }
else
    {
        ready()
    }
function ready()
{
    /* REMOVE BUTTON FOR CART */
    var removeCartItemButtons = document.getElementsByClassName('cart-remove')
    for (var i =0; i < removeCartItemButtons.length; i++)
    {
        var button= removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i =0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i =0; i < addToCartButtons.length; i++)
    {
        var button = addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)
    }
}
function removeCartItem(event)
    {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateCartTotal()
    ready()
    }
function quantityChanged(event)
    {
        var input= event.target
        if (isNaN(input.value) || input.value <= 0)
            {
                input.value = 1
            }
        updateCartTotal()
        ready()
    }

function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartItems = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for (var i =0; i < cartItems.length; i++)
    {
        var cartItem = cartItems[i]
        var priceEle = cartItem.getElementsByClassName('cart-price')[0]
        var quantityEle = cartItem.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceEle.innerText.replace('$',''))
        var quantity = quantityEle.value
        var total = total + (price * quantity)
    }
    total = Math.round(total*100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
function addToCartClicked(event)
{
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    ready()
}
function addItemToCart(title,price,imageSrc)
{
    var cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')
    cartItem.innerText = title
    var cartItems = document.getElementsByClassName('cart-items')[0]
    /*var cartItemContents = `
    <div class ="cart-item">
                    <img class="cart-item-image" src="${imageSrc}">
                    <span>${title}</span>
                    &lt; &gt;
                    <span class="cart-price">${price}</span>
                    &lt; &gt;
                    <input class="cart-quantity-input" type="number" value="2">
                    <button role="button" class="cart-remove">Remove</button>
                </div>`*/
    
    var cartItemContents = `
    <div class="cart-col1">
        <img class="cart-item-image" src="${imageSrc}">
        <span class="cart-item-name">${title}</span>
    </div>
    <span class="cart-price">${price}</span>
    <input class="cart-quantity-input" type="number" value="1">
    <button role="button" class="cart-remove">Remove</button>`
    cartItem.innerHTML = cartItemContents
    cartItems.append(cartItem)
    updateCartTotal()
    ready()
}