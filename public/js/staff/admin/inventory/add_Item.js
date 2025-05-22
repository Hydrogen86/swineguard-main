// Show popup when 'add-vaccine' is clicked
document.getElementById('add-vaccine')?.addEventListener('click', function () {
    showInventoryPopup();
  });
  
  // Function to show popup
function showInventoryPopup() {
    document.getElementById("popup-overlay").style.display = "block";
    document.getElementById("inventory-popup").style.display = "block";

      // Hide popup when 'cancel' is clicked
    document.getElementById("Inventory-cancelBtn")?.addEventListener("click", function (event) {
        event.preventDefault(); // prevent form submission or button default behavior
        document.getElementById("popup-overlay").style.display = "none";
        document.getElementById("inventory-popup").style.display = "none";
    });
}
  


// Fetching:

document.getElementById('inventory-popup').addEventListener('submit', async (event) => {
    event.preventDefault();
 
    try {
        const inventoryData = {
            itemName: document.getElementById('item-name').value, 
            description: document.getElementById('inventory-type').value, 
            amount: parseFloat(document.getElementById('stock-amount').value),
            quantity: parseInt(document.getElementById('quantity').value),
            expiryDate: document.getElementById('expiry-date').value,
        }

        const response = await fetch('http://localhost:5000/api/add/item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inventoryData)
        });

        const result = await response.json();

        if (response.ok) {
            showAlert("Success", "Appointment Created", "success");
            document.getElementById('inventory-popup').reset();
        } else {
            showAlert("Error", result.error || "Something went wrong", "error");
        }
    } catch (error) {
        console.error('Error', error);
        showAlert("Error", "Failed to create appointment", "error");
    }
});


//Show Alert Function
function showAlert(title, message, icon) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon
    });
  }
