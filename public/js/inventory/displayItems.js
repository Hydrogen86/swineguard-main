document.addEventListener('DOMContentLoaded', () => {
    let allItems = [];
  
    // Fetch inventory data
    fetch('http://localhost:5000/api/get/item')
      .then(response => response.json())
      .then(items => {
        allItems = items;
        renderItems(allItems);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  
    // Render items using table row structure
    function renderItems(itemsToRender) {
      let itemHTML = '';
  
      itemsToRender.forEach((item, index) => {
        itemHTML += `
          <div class="inventory-table__row">
            <div class="td td--item-number">${index + 1}</div>
            <div class="td td--name">${item.itemName}</div>
            <div class="td td--description">${item.description}</div>
            <div class="td td--amount">${item.amount} mg</div>
            <div class="td td--dose-quantity">${item.quantity}</div>
            <div class="td td--dose-total">${item.amount * item.quantity} mg</div>
            <div class="td td--expiration">${item.expiryDate}</div>
            <div class="td td--stock-status">${item.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
            <div class="td td--status">${item.itemStatus}</div>
            <div class="td td--actions">
              <!-- Add buttons/icons for edit/delete here -->
            </div>
          </div>
        `;
      });
  
      // Assign generated HTML to container
    //   const container = document.querySelector('.inventory-vaccine-container');
    //   if (container) {
    //     container.innerHTML = itemHTML;
    //   } else {
    //     console.warn('Container not found');
    //   }
    }
});
  