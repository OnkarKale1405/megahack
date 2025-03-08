import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { marketEndPoints } from "../Api"
import { setMarketplace } from '../../app/marketSlice';
const { GET_MARKETS, GET_MARKET_BY_ID, DELETE_MARKET, EDIT_MARKET, GET_MARKETPLACES_NEAR_USER } = marketEndPoints;

export function getMarketplacesNearUser() {
    return async (dispatch) => {
        const loadingToast = toast.loading("Fetching nearby marketplaces ...");

        try {
            const response = await apiConnector("POST", GET_MARKETPLACES_NEAR_USER, {});
            console.log("response");

            if (response.status === 200) {
                toast.success("Nearby markets fetched");
                toast.dismiss(loadingToast);
                dispatch(setMarketplace(response.data.marketplaces));
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while fetching marketplaces");
        }

        toast.dismiss(loadingToast);
    }
}


export async function getMarkets() {
    const loadingToast = toast.loading("Fetching nearby markets ...");

    try {

        const response = await apiConnector("GET", GET_MARKETS);

        if (response.status === 200) {
            toast.success(response.message);
            toast.dismiss(loadingToast);
            return response.data;

        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.error("Error while fetching markets");
    }

    toast.dismiss(loadingToast);
}

export function getMarketById(marketId) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Fetching market details...");

        try {
            const response = await apiConnector("GET", `${GET_MARKET_BY_ID}/${marketId}`);

            if (response.status === 200) {
                toast.success(response.message);
                toast.dismiss(loadingToast);
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while fetching market details");
        }

        toast.dismiss(loadingToast);
    };
}

export function deleteMarket(marketId) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Deleting market...");

        try {
            const response = await apiConnector("DELETE", `${DELETE_MARKET}/${marketId}`);

            if (response.status === 200) {
                toast.success(response.message);
                toast.dismiss(loadingToast);
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while deleting market");
        }

        toast.dismiss(loadingToast);
    };
}

export function editMarket(marketId, marketData) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Editing market...");

        try {
            const response = await apiConnector("PUT", `${EDIT_MARKET}/${marketId}`, marketData);

            if (response.status === 200) {
                toast.success(response.message);
                toast.dismiss(loadingToast);
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while editing market");
        }

        toast.dismiss(loadingToast);
    };
}