import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMarketplacesNearUser } from '../../services/repository/marketRepo';
import { useDispatch, useSelector } from 'react-redux';
import { getMarkets } from '../../app/marketSlice';

const Market = () => {
    const [markets, setMarkets] = useState([]);
    const [locationInfo, setLocationInfo] = useState(null);
    const dispatch = useDispatch();
    const nearbyMarkets = useSelector(getMarkets);
    console.log(nearbyMarkets);

    useEffect(() => {
        const fetchNearbyMarkets = async () => {
            try {
                dispatch(getMarketplacesNearUser());
                setMarkets(nearbyMarkets);
            } catch (error) {
                console.error("Error fetching marketplaces:", error);
            }
        };
        fetchNearbyMarkets();
    }, []);

    useEffect(() => {
        setMarkets(nearbyMarkets);
    }, [nearbyMarkets])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-44 h-screen overflow-auto scrollbar-hide">
            {markets.map((market) => (
                <div key={market._id} className="bg-white h-[350px] rounded-lg shadow-lg">
                    <img
                        src={market.image}
                        alt={market.name}
                        className="rounded-lg w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <div className='mb-4'>
                            <h2 className="text-xl font-semibold mb-2">{market.name}</h2>
                            <p className="text-sm text-gray-600 mb-2">Location: {market.location?.coordinates?.join(", ")}</p>
                        </div>
                        <Link to={`/products/${market._id}`}>
                            <button className='w-full bg-[#101828] text-white py-1.5 rounded-lg cursor-pointer'>
                                See Products
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Market;
