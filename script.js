document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');

    // Добавление отзыва
    if (reviewForm) {
        reviewForm.onsubmit = function(event) {
            event.preventDefault();
            const productName = document.getElementById('productName').value;
            const reviewText = document.getElementById('reviewText').value;

            const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
            if (!reviews[productName]) {
                reviews[productName] = [];
            }
            reviews[productName].push(reviewText);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            reviewForm.reset();
            alert('Отзыв добавлен!');
        };
    }

    // Отображение отзывов
    const productList = document.getElementById('productList');
    if (productList) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || {};

        for (const product in reviews) {
            const productItem = document.createElement('li');
            productItem.textContent = product;

            const reviewList = document.createElement('ul');
            reviews[product].forEach((review, index) => {
                const reviewItem = document.createElement('li');
                reviewItem.textContent = review;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Удалить';
                deleteButton.onclick = () => {
                    reviews[product].splice(index, 1);
                    localStorage.setItem('reviews', JSON.stringify(reviews));
                    productList.innerHTML = '';
                    displayReviews(reviews); // Обновить отображение
                };

                reviewItem.appendChild(deleteButton);
                reviewList.appendChild(reviewItem);
            });

            productItem.appendChild(reviewList);
            productList.appendChild(productItem);
        }
    }
});