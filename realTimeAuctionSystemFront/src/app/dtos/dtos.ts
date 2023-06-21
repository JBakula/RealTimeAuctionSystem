export interface IAllAuctions {
    auctionId: number,
    title: string,
    description: string,
    startingPrice: number,
    categoryId: number,
    startsAt: Date,
    endsIn: Date,
    image: string,
    bids: string
}

export interface IPlaceABid {
    value: number,
    auctionId: number,
    userId: number
}