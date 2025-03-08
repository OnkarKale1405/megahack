//All the API endpoints will be declared here and then this will be used in entire frontend to access the endpoints...

export const BaseURL = "http://localhost:5000/api/";
// const BaseURL = import.meta.env.VITE_URL;

export const authEndpoints = {
    LOGIN_API: BaseURL + "auth/login",
    REGISTER: BaseURL + "auth/signup",
    LOGOUT: BaseURL + "auth/logout",
    VALIDATE_GMAIL: BaseURL + "auth/verify-verification-code",
}

export const marketEndPoints = {
    GET_MARKETS: BaseURL + "marketplaces/",
    GET_MARKETPLACES_NEAR_USER: BaseURL + "marketplaces/nearby",
    GET_MARKET_BY_ID: BaseURL + "marketplaces/",
    DELETE_MARKET: BaseURL + "marketplaces/",
    EDIT_MARKET: BaseURL + "marketplaces/",
}

export const productEndPoints = {
    GET_PENDING_PRODUCTS: BaseURL + "products/pending",
    GET_MARKET_PRODUCTS: BaseURL + "products/marketplace",
    CREATE_PRODUCT: BaseURL + "products/",
    APPROVE_PRODUCT: BaseURL + "products/approve",
    REJECT_PRODUCT: BaseURL + "products/reject",
    GET_PRODUCT_BY_ID: BaseURL + "products/",
    DELETE_PRODUCT: BaseURL + "products/",
    EDIT_PRODUCT: BaseURL + "products/",
};