define("enums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loyaltyUser = exports.Permissions = void 0;
    var Permissions;
    (function (Permissions) {
        Permissions["ADMIN"] = "ADMIN";
        Permissions["READ_ONLY"] = "READ_ONLY";
    })(Permissions || (exports.Permissions = Permissions = {}));
    var loyaltyUser;
    (function (loyaltyUser) {
        loyaltyUser["GOLD_USER"] = " GOLD_USER";
        loyaltyUser["BRONZE_USER"] = " BRONZE_USER";
        loyaltyUser["SILVER_USER"] = " SILVER_USER";
    })(loyaltyUser || (exports.loyaltyUser = loyaltyUser = {}));
});
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utilities", ["require", "exports", "enums"], function (require, exports, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTopTwoReviews = exports.makeMultiple = exports.populateUser = exports.showTotalReview = void 0;
    var reviewTotalDisplay = document.querySelector('#reviews');
    var returningUserDisplay = document.querySelector('#returning-user');
    var userNameDisplay = document.querySelector('#user');
    function showTotalReview(value, reviewer, isLoyal) {
        var displayIcon = enums_1.loyaltyUser.GOLD_USER ? '🌟' : '';
        reviewTotalDisplay.innerHTML = value.toString() + " Review" + makeMultiple(value) + "lastname" + reviewer + "  " + displayIcon;
    }
    exports.showTotalReview = showTotalReview;
    function populateUser(isReturning, userName) {
        if (isReturning) {
            returningUserDisplay.innerHTML = " back";
        }
        else {
            userNameDisplay.innerHTML = userName;
        }
    }
    exports.populateUser = populateUser;
    function makeMultiple(value) {
        if (value > 1 || value == 0) {
            return 's';
        }
        else
            return '';
    }
    exports.makeMultiple = makeMultiple;
    function getTopTwoReviews(reviews) {
        var sortedReviews = reviews.sort(function (a, b) { return b.stars - a.stars; });
        return sortedReviews.slice(0, 2);
    }
    exports.getTopTwoReviews = getTopTwoReviews;
});
define("classes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainProperty = /** @class */ (function () {
        function MainProperty(src, title, reviews) {
            this.src = src;
            this.title = title;
            this.reviews = reviews;
        }
        return MainProperty;
    }());
    exports.default = MainProperty;
});
define("index", ["require", "exports", "utilities", "enums", "classes"], function (require, exports, utilities_1, enums_2, classes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var propertyContainer = document.querySelector('.properties');
    var footer = document.querySelector('.footer');
    var button = document.querySelector('button');
    var reviewContainer = document.querySelector('.reviews');
    var container = document.querySelector('.container');
    var isLoggedIn;
    //reviews
    var reviews = [
        {
            name: 'Sheia',
            stars: 5,
            loyaltyUser: enums_2.loyaltyUser.GOLD_USER,
            date: '01-04-2021'
        },
        {
            name: 'Andrzej',
            stars: 3,
            loyaltyUser: enums_2.loyaltyUser.BRONZE_USER,
            date: '28-03-2021'
        },
        {
            name: 'Omar',
            stars: 4,
            loyaltyUser: enums_2.loyaltyUser.SILVER_USER,
            date: '27-03-2021'
        },
    ];
    //users
    var you = {
        firstName: 'Bobby',
        lastName: "Brown",
        permissions: enums_2.Permissions.ADMIN,
        isReturning: true,
        age: 35,
        stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
    };
    //properties
    var properties = [{
            image: "images/colombia-property.jpg",
            title: "A & L Hotel",
            price: 45,
            location: {
                firstLine: "no 47",
                city: "Machakos",
                code: 450,
                country: "Kenya",
            },
            contact: [715246821, "aandlhotel47@gmail.com"],
            isAvailable: true
        },
        {
            image: "images/poland-property.jpg",
            title: "Poland Hotel",
            price: 30,
            location: {
                firstLine: "no 675",
                city: "Venezuela",
                code: 1234,
                country: "Columbia",
            },
            contact: [714246821, "columbianahotel675@gmail.com"],
            isAvailable: true
        },
        {
            image: "images/london-property.jpg",
            title: "london Hotel",
            price: 25,
            location: {
                firstLine: "no 65",
                city: "New York",
                code: 14098,
                country: "USA",
            },
            contact: [745246821, "newyorkhotel65@gmail.com"],
            isAvailable: false
        },
        {
            image: "images/malaysian-hotel.jpeg",
            title: "Malia Hotel",
            price: 35,
            location: {
                firstLine: "Room 4",
                city: "Malia",
                code: 45334,
                country: "Malaysia",
            },
            contact: [745246651, "lee34@gmail.com"],
            isAvailable: false
        }
    ];
    //functions
    (0, utilities_1.showTotalReview)(reviews.length, reviews[0].name, reviews[0].loyaltyUser);
    (0, utilities_1.populateUser)(you.isReturning, you.firstName);
    var authorityStatus;
    isLoggedIn = false;
    //a union type showing that the price is displayed if permission===admin and isLoggedin==true
    function showDetails(authorityStatus, element, price) {
        if (authorityStatus) {
            var priceDisplay = document.createElement('div');
            priceDisplay.innerHTML = price.toString() + '/night';
            element.appendChild(priceDisplay);
        }
    }
    // appending image
    for (var i = 0; i < properties.length; i++) {
        var card = document.createElement("div");
        card.classList.add('card');
        card.innerHTML = properties[i].title;
        var image_1 = document.createElement("img");
        image_1.setAttribute("src", properties[i].image);
        card.appendChild(image_1);
        propertyContainer.appendChild(card);
        showDetails(you.permissions, card, properties[i].price);
    }
    var count = 0;
    function addReviews(array) {
        if (!count) {
            count++;
            var topTwo = (0, utilities_1.getTopTwoReviews)(array);
            for (var i = 0; i < topTwo.length; i++) {
                var card = document.createElement('div');
                card.classList.add('review-card');
                card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name;
                reviewContainer.appendChild(card);
            }
            container.removeChild(button);
        }
    }
    button.addEventListener('click', function () { return addReviews(reviews); });
    var currentLocation = ['Kenya', '11:35', 17];
    footer.innerHTML = currentLocation[0] + ' ' + currentLocation[1] + ' ' + currentLocation[2] + '°';
    var yourMainProperty = new classes_1.default("images/italian-property.jpg", "Italian Home", [{
            name: "Anthony",
            stars: 5,
            loyaltyUser: enums_2.loyaltyUser.GOLD_USER,
            date: '28-04-2021'
        }]);
    var mainImageContainer = document.querySelector('.main-image');
    var image = document.createElement('img');
    image.setAttribute('src', yourMainProperty.src);
    mainImageContainer.appendChild(image);
});
