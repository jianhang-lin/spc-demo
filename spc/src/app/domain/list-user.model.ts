export class ListUser {
    access: Array<AccessItem>;
    active: boolean;
    customer: Customer;
    email: string;
    id: number;
    loginId: string;
    imageURL: string;
    profiles: Array<Profile>;
    tags: Array<Tag>;
    userName: string;
    userType: string;
}

export class Customer {
    id: number;
    customerName: string;
    customerLogo: string;
    active: boolean;
    creationDate: string;
    customerCode: string;
    emailDomain: string;
    federated: boolean;
    nonfederated: boolean;
    federatedConnectionType: string;
    federatedConnectionDetails: FederatedConnectionDetails;
}

export class FederatedConnectionDetails {
    samlConnectionDto: SamlConnectionDto;
    openIDConnectionDto: OpenIDConnectionDto;
}

export class SamlConnectionDto {
    connectionName: string;
    displayName: string;
    logoUrl: string;
    idpDomains: string;
    signInUrl: string;
    signinCertificate: string;
    signOutUrl: string;
    useridAttribute: string;
    debugMode: boolean;
    signRequest: boolean;
    signReqAlgorithm: string;
    signReqAlgorithmDigest: string;
    protocolBinding: string;
    requestTemplate: string;
}

export class OpenIDConnectionDto {
    connectionName: string;
    displayName: string;
    logoUrl: string;
    issuerUrl: string;
    clientId: string;
    callbackURL: string;
    syncUserAttributes: boolean;
}

export class Profile {
    id: number;
    name: string;
    aditionalInformation: string;
    siteDto: Site;
}

export class Tag {
    name: string;
    id: number;
}

export class Access {
    access: Array<AccessItem>;
}

export class AccessItem {
    access: string;
}

export class Site {
    name: string;
    id: number;
}
