export interface KeyValuePair {
    id: number,
    name: string
}

export interface Contact {
    name: string,
    email: string,
    phone: string
}

export interface Vehicle {
    id: number,
    makes: KeyValuePair,
    model: KeyValuePair,
    contact: Contact,
    features: KeyValuePair[],
    isRegistered: boolean,
    lastUpdate: string
}

export interface SaveVehicle {
    id: number,
    makeId: number,
    modelId: number,
    contact: Contact,
    isRegistered: boolean,
    features: number[]
}