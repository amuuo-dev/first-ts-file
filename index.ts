const propertyContainer = document.querySelector('.properties') as HTMLDivElement
const footer = document.querySelector('.footer') as HTMLDivElement
const button = document.querySelector('button') as HTMLButtonElement
const reviewContainer = document.querySelector('.reviews') as HTMLDivElement
const container = document.querySelector('.container')  as HTMLDivElement
import {showTotalReview,populateUser,getTopTwoReviews} from "./utilities"
import { Permissions, loyaltyUser } from './enums'
import { Review, Property } from "./interfaces"
import MainProperty from "./images/classes"

let isLoggedIn: boolean


//reviews
const reviews:Review[] = [
    {
        name: 'Sheia',
        stars: 5,
        loyaltyUser: loyaltyUser.GOLD_USER,
        date: '01-04-2021'
    },
    {
        name: 'Andrzej',
        stars: 3,
        loyaltyUser: loyaltyUser.BRONZE_USER,
        date: '28-03-2021'
    },
    {
        name: 'Omar',
        stars: 4,
        loyaltyUser: loyaltyUser.SILVER_USER,
        date: '27-03-2021'
    },
]

//users
const you= {
    firstName: 'Bobby',
    lastName: "Brown",
    permissions: Permissions.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
}

//properties
const properties: Property[]=[{
    image: "images/colombia-property.jpg",
    title:"A & L Hotel",
    price: 45,
    location:{
        firstLine: "no 47",
        city: "Machakos",
        code: 450,
        country:"Kenya",
    },
    contact: [715246821,"aandlhotel47@gmail.com"],
    isAvailable: true
},
{
    image: "images/poland-property.jpg",
    title:"Poland Hotel",
    price: 30,
    location:{
        firstLine: "no 675",
        city: "Venezuela",
        code: 1234,
        country:"Columbia",
    },
    contact: [714246821,"columbianahotel675@gmail.com"],
    isAvailable: true
},
{
    image: "images/london-property.jpg",
    title:"london Hotel",
    price: 25,
    location:{
        firstLine: "no 65",
        city: "New York",
        code: 14098,
        country:"USA",
    },
    contact: [745246821,"newyorkhotel65@gmail.com"],
    isAvailable: false
},
{
    image: "images/malaysian-hotel.jpeg",
    title:"Malia Hotel",
    price: 35,
    location:{
        firstLine: "Room 4",
        city: "Malia",
        code: 45334,
        country:"Malaysia",
    },
    contact: [745246651,"lee34@gmail.com"],
    isAvailable: false
}
]




//functions
showTotalReview(reviews.length,reviews[0].name,reviews[0].loyaltyUser)
populateUser(you.isReturning,you.firstName)

let authorityStatus : any
isLoggedIn=false
//a union type showing that the price is displayed if permission===admin and isLoggedin==true
function showDetails(authorityStatus:boolean | Permissions, element : HTMLDivElement, price: number) {
   if (authorityStatus) {
       const priceDisplay = document.createElement('div')
       priceDisplay.innerHTML = price.toString() + '/night'
       element.appendChild(priceDisplay)
   }
}

// appending image
for(let i=0; i<properties.length; i++){
    const card=document.createElement("div")
    card.classList.add('card')
    card.innerHTML=properties[i].title
    const image=document.createElement("img")
    image.setAttribute("src",properties[i].image)
    card.appendChild(image)
    propertyContainer.appendChild(card)
    showDetails(you.permissions, card, properties[i].price)
}

let count = 0
function addReviews(array:Review[]): void{
    if (!count ) {
        count++
        const topTwo = getTopTwoReviews(array)
        for (let i = 0; i < topTwo.length; i++) {
            const card = document.createElement('div')
            card.classList.add('review-card')
            card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name
            reviewContainer.appendChild(card)
        }
        container.removeChild(button) 
    }
}
button.addEventListener('click', () => addReviews(reviews))

let currentLocation: [string, string, number] = ['Kenya', '11:35', 17]
footer.innerHTML = currentLocation[0] + ' ' + currentLocation[1] + ' ' + currentLocation[2] + '°'

 let yourMainProperty = new MainProperty("images/italian-property.jpg",
 "Italian Home",
 [{
    name: "Anthony",
    stars: 5,
    loyaltyUser: loyaltyUser.GOLD_USER,
    date: '28-04-2021'
 }])

 const mainImageContainer = document.querySelector('.main-image')as HTMLDivElement
 const image = document.createElement('img')
 image.setAttribute('src', yourMainProperty.src)
 mainImageContainer.appendChild(image)