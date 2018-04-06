export interface IAuth {
    _id?: number,
    cash?: number,
    first?: string,
    last?: string
}

export interface IEqt {
    cash?: number,
    own?: any[]
}

export interface IUser {
    _id?: number,
    first?: string,
    last?: string,
    cash?: number,
    eqt?: number,
    earned?: number,
    own?: any[],
    lastyear?: any[],
    labels?: any[],
    ern_data?: any[],
    eqt_data?: any[]
}