// Product data
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 149,
        availability: "In stock",
        description: "Description for Product 1.",
        images: [
            "AllPhotoes/img1.jpg",
            "AllPhotoes/img2.jpg",
            "AllPhotoes/img3.jpg",
            "AllPhotoes/img4.jpg",
        ]
    },
    {
        id: 2,
        name: "Product 2",
        price: 49,
        availability: "In stock",
        description: "Description for Product 2.",
        images: [
            "AllPhotoes/img5.jpg",
            "AllPhotoes/img6.jpg",
            "AllPhotoes/img7.jpg",
            "AllPhotoes/img8.jpg",
        ]
    },
    // Add more products as needed
];

// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id')); // Convert the id to a number

    // Call the function with the desired product ID
    loadProduct(id); // Load product with the ID from the URL
});

// Function to load product details
function loadProduct(productId) {
    const product = products.find(p => p.id === productId); // Compare IDs correctly
    if (product) {
        document.getElementById('mainImage').src = product.images[0]; // Set main image
        document.querySelector('.details-box h1').textContent = product.name; // Set product name
        document.querySelector('.details-box p').textContent = product.availability; // Set availability
        document.querySelector('.details-box h2').textContent = `$ ${product.price}`; // Set price
        document.querySelector('.details-box p:last-of-type').textContent = product.description; // Set description

        // Set thumbnail images dynamically
        const smallImagesContainer = document.querySelector('.small-images');
        smallImagesContainer.innerHTML = ''; // Clear previous images
        
        product.images.forEach((imgSrc, index) => {
            // Create the outer div (image-box) with the class 'image-box'
            const imageBox = document.createElement('div');
            imageBox.className = 'image-box'; // Assign the image-box class

            // Create the img element with the class 'image'
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = `Thumbnail ${index + 1}`;
            imgElement.className = 'image'; // Assign the image class

            // Add event listener to change main image on click
            imgElement.addEventListener('click', () => {
                document.getElementById('mainImage').src = imgSrc; // Set clicked image as main image
            });

            // Append the img inside the image-box
            imageBox.appendChild(imgElement);

            // Append the image-box inside the small-images container
            smallImagesContainer.appendChild(imageBox);
        });

        // Ensure the cart calculation works with the current product price
        document.getElementById('first').addEventListener('input', () => cart(product.price));
    } else {
        console.error('Product not found'); // Log an error if the product is not found
    }
}

// Function for cart calculation
function cart(productPrice) {
    let quantity = document.getElementById('first').value || 0; // Default to 0 if empty
    let subTotal = quantity * productPrice; // Calculating subtotal based on product price
    document.getElementById('subTotal').value = subTotal; // Updating Sub Total
    
    let salesTax = (subTotal * 5.7) / 100; // Calculating 5.7% sales tax
    salesTax = Math.floor(salesTax);
    document.getElementById('salesTax').value = salesTax; // Updating Sales Tax
    
    let total = subTotal + salesTax;
    total = Math.floor(total); // Calculating Total (Sub Total + Sales Tax)
    document.getElementById('total').value = total; // Updating Total
}
