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
    const shippingCostInDKK = parseFloat(shippingCost);

    const totalWithShipping = priceInDKKWithVat + shippingCostInDKK;

    // Format numbers to Danish format
    const formatter = new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        minimumFractionDigits: 2,
    });

    const formattedPriceWithVat = formatter.format(priceInDKKWithVat);
    const formattedShippingCost = formatter.format(shippingCostInDKK);
    const formattedTotal = formatter.format(totalWithShipping);

    // Display results
    document.getElementById('result').innerText = `Final Price (incl. VAT): ${formattedPriceWithVat}`;
    document.getElementById('shipping').innerText = `Shipping Cost: ${formattedShippingCost}. Total Price (incl. shipping): ${formattedTotal}`;
}
function updateVendorMessage() {
    const vendorSelect = document.getElementById('vendor');
    const vendorMessage = document.getElementById('vendorMessage');
    const selectedVendor = vendorSelect.value;

    if (selectedVendor === "1.25") {
        vendorMessage.innerText = "Input your purchase price from https://b2b.kwsuspension.net/";
    } else if (selectedVendor === "1.30") {
        vendorMessage.innerText = "Input cost price in Euros from http://www.press.millteksport.org/";
    } else {
        vendorMessage.innerText = ""; // Clear message if no vendor is selected
    }
}
