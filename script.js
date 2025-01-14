function calculatePrice() {
    const vendorSelect = document.getElementById('vendor');
    const vendorMarkup = vendorSelect.value; // Get markup percentage
    const shippingCost = vendorSelect.options[vendorSelect.selectedIndex].getAttribute('data-shipping'); // Get shipping cost
    const costPrice = document.getElementById('costPrice').value; // Get cost price in Euros

    if (!vendorMarkup || !costPrice) {
        alert('Please select a vendor and enter a cost price.');
        return;
    }

    const exchangeRate = 7.5; // Fixed Euro to Danish Crown exchange rate
    const vatRate = 1.25; // 25% VAT

    const markup = parseFloat(vendorMarkup); // Vendor-specific markup
    const priceInDKKExVat = parseFloat(costPrice) * exchangeRate * markup; // Convert to DKK and apply markup
    const priceInDKKWithVat = priceInDKKExVat * vatRate; // Add VAT

    const roundedPrice = priceInDKKWithVat.toFixed(2); // Round to 2 decimal places

    // Calculate total cost including shipping
    const totalWithShipping = (parseFloat(priceInDKKWithVat) + parseFloat(shippingCost)).toFixed(2);

    // Display results
    document.getElementById('result').innerText = `Final Price: ${roundedPrice} DKK (incl. VAT)`;
    document.getElementById('shipping').innerText = `Shipping Cost: ${shippingCost} DKK. Total Price (incl. shipping): ${totalWithShipping} DKK`;
}
