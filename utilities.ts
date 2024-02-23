import { loyaltyUser } from "./enums"
import { Review } from "./interfaces"

const reviewTotalDisplay = document.querySelector('#reviews') as HTMLHeadElement
const returningUserDisplay = document.querySelector('#returning-user') as HTMLSpanElement
const userNameDisplay = document.querySelector('#user') as HTMLSpanElement


export function showTotalReview(value: number,reviewer: string,isLoyal:loyaltyUser){
    const displayIcon=loyaltyUser.GOLD_USER ? '🌟':''
reviewTotalDisplay.innerHTML=value.toString()+ " Review"+ makeMultiple(value) + "lastname"+reviewer+"  "+displayIcon
}

export function populateUser(isReturning:boolean,userName: string){
    if(isReturning){
        returningUserDisplay.innerHTML=" back"
    }
else{
    userNameDisplay.innerHTML=userName;
}
}


export function makeMultiple(value: number) : string{
    if (value > 1 || value == 0 ) {
        return 's'
    } else return ''
}
export function getTopTwoReviews(reviews:Review[]) : Review[] {
 const sortedReviews = reviews.sort((a, b) => b.stars - a.stars)
  return sortedReviews.slice(0,2)
}
