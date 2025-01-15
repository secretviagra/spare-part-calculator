function updateVendorMessage() {
    const vendorSelect = document.getElementById('vendor');
    const vendorMessage = document.getElementById('vendorMessage');
    const vendorImage = document.getElementById('vendorImage');
    const selectedOption = vendorSelect.options[vendorSelect.selectedIndex];

    if (selectedOption.value) {
        const selectedVendor = selectedOption.getAttribute('data-vendor'); // Get data-vendor attribute
        console.log("Selected Vendor:", selectedVendor); // Debugging log

        if (selectedVendor === "KW") {
            vendorMessage.innerText = "Input purchase price from https://b2b.kwsuspension.net/";
            vendorImage.src = "image/kw.jpg"; // Path for KW image
            vendorImage.alt = "KW Suspensions Help Image";
            vendorImage.style.display = "block";
        } else if (selectedVendor === "Milltek") {
            vendorMessage.innerText = "Input RRP price in Pounds from http://www.press.millteksport.org/";
            vendorMessage.innerText += "\nTip Assembly is half shipping cost";
            vendorImage.src = "image/milltek.jpg"; // Path for Milltek image
            vendorImage.alt = "Milltek Help Image";
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
    const costPrice = document.getElementById('costPrice').value; // Get cost price

    // Validate inputs
    if (!vendorMarkup || !costPrice) {
        alert('Please select a vendor and enter a cost price.');
        return;
    }

    // Parse values for calculations
    const markup = parseFloat(vendorMarkup); // Convert markup to a float
    const costPriceInOriginalCurrency = parseFloat(costPrice); // Convert cost price to a float

    let priceInDKKWithVat;
    let totalWithShipping;

    // Determine calculation logic based on the selected vendor
    const selectedVendor = selectedOption.getAttribute('data-vendor');
    if (selectedVendor === "Milltek") {
        // Milltek-specific calculation
        priceInDKKWithVat = costPriceInOriginalCurrency * 11.15; // Direct calculation including VAT
        totalWithShipping = priceInDKKWithVat + 800; // Add fixed shipping cost
    } else if (selectedVendor === "KW") {
        // KW-specific calculation
        const exchangeRate = 7.5; // Fixed Euro to Danish Crown exchange rate
        const vatRate = 1.25; // 25% VAT
        const shippingCostInDKK = parseFloat(shippingCost); // Convert shipping cost to a float

        // Determine the multiplier based on the price
        const kwMultiplier = costPriceInOriginalCurrency > 200 ? 1.7 : 2;

        priceInDKKWithVat = costPriceInOriginalCurrency * exchangeRate * vatRate * kwMultiplier; // KW-specific formula
        totalWithShipping = priceInDKKWithVat + shippingCostInDKK; // Add shipping cost
    } else {
        // General calculation for other vendors
        const exchangeRate = 7.5; // Fixed Euro to Danish Crown exchange rate
        const vatRate = 1.25; // 25% VAT
        const shippingCostInDKK = parseFloat(shippingCost); // Convert shipping cost to a float

        const priceInDKKExVat = costPriceInOriginalCurrency * exchangeRate * markup; // Convert to DKK and apply markup
        priceInDKKWithVat = priceInDKKExVat * vatRate; // Add VAT
        totalWithShipping = priceInDKKWithVat + shippingCostInDKK; // Add shipping cost
    }

    // Format numbers to Danish format
    const formatter = new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        minimumFractionDigits: 2,
    });

    const formattedPriceWithVat = formatter.format(priceInDKKWithVat);
    const formattedTotal = formatter.format(totalWithShipping);
    const formattedShippingCost = formatter.format(parseFloat(shippingCost));

    // Display results
    document.getElementById('result').innerText = `Final Price (incl. VAT): ${formattedPriceWithVat}`;
    document.getElementById('shipping').innerText = `Shipping Cost: ${formattedShippingCost}. Total Price (incl. shipping): ${formattedTotal}`;
}

// Handle form submission (Enter key)
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    calculatePrice(); // Call the calculation function
}
