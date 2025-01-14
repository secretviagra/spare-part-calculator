function updateVendorMessage() {
    const vendorSelect = document.getElementById('vendor');
    const vendorMessage = document.getElementById('vendorMessage');
    const vendorImage = document.getElementById('vendorImage');
    const selectedOption = vendorSelect.options[vendorSelect.selectedIndex];

    if (selectedOption.value) {
        const selectedVendor = selectedOption.getAttribute('data-vendor'); // Get data-vendor attribute
        console.log("Selected Vendor:", selectedVendor); // Debugging log

        if (selectedVendor === "KW") {
            vendorMessage.innerText = "Input your purchase price from https://b2b.kwsuspension.net/";
            vendorImage.src = "image/kw.jpg"; // Correct path for KW image
            vendorImage.alt = "KW Suspensions Help Image";
            vendorImage.style.display = "block";
        } else if (selectedVendor === "Milltek") {
            vendorMessage.innerText = "Input cost price in Euros from http://www.press.millteksport.org/";
            vendorImage.src = "image/Milltek.jpg"; // Correct path for Milltek image
            vendorImage.alt = "Milltek Help Image";
            vendorImage.style.display = "block";
        } else if (selectedVendor === "Supersprint") {
            vendorMessage.innerText = "Input price in Euros ex. VAT from https://www.supersprint.com/";
            vendorImage.src = "image/supersprint.jpg"; // Correct path for Supersprint image
            vendorImage.alt = "Supersprint Help Image";
            vendorImage.style.display = "block";
        }
    } else {
        vendorMessage.innerText = ""; // Clear message if no vendor is selected
        vendorImage.style.display = "none"; // Hide image if no vendor is selected
        vendorImage.src = ""; // Clear image source
    }
}

function calculatePrice() {
    const vendorSelect = document.getElementById('vendor');
    const selectedOption = vendorSelect.options[vendorSelect.selectedIndex];
    const vendorMarkup = vendorSelect.value; // Get markup percentage
    const shippingCost = selectedOption ? selectedOption.getAttribute('data-shipping') : null; // Get shipping cost
    const costPrice = document.getElementById('costPrice').value; // Get cost price in Euros

    // Validate inputs
    if (!vendorMarkup || !costPrice) {
        alert('Please select a vendor and enter a cost price.');
        return;
    }

    // Parse values for calculations
    const markup = parseFloat(vendorMarkup); // Convert markup to a float
    const shippingCostInDKK = parseFloat(shippingCost); // Convert shipping cost to a float
    const costPriceInEuros = parseFloat(costPrice); // Convert cost price to a float

    const exchangeRate = 7.5; // Fixed Euro to Danish Crown exchange rate
    const vatRate = 1.25; // 25% VAT

    // Perform calculations
    const priceInDKKExVat = costPriceInEuros * exchangeRate * markup; // Convert to DKK and apply markup
    const priceInDKKWithVat = priceInDKKExVat * vatRate; // Add VAT
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
