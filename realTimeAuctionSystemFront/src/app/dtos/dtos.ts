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

export interface IPlaceAnAuction {
    title: string,
    description: string,
    startingPrice: number,
    categoryId: number,
    endsIn: string,
    image?: File | null
}

export interface IPlaceABid {
    value: number,
    auctionId: number,
    userId: number
}

export interface ILogin {
    email: string,
    password: string
}

export interface IRegister {
    userName: string,
    email: string,
    password: string
}

export interface IUser {
    email?: string,
    username?: string,
    userId?: string;
    roleId?: string,
    exp?: number
}

export interface IAllCategory {
    categoryId: string,
    categoryName: string
}

export interface IBids {
    bidId?: number,
    userId?: number,
    userName?: string,
    auctionId?: number,
    value?: number
}