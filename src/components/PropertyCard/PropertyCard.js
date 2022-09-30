import { Stack } from '@mui/material';
import React from 'react';
import './PropertyCard.css';

const PropertyCard = (props) => {
    const { trait_type, value, percentage } = props;

    return (
        <div style={{ margin: '0.5vh 0 0.5vh 0' }}>
            <div className='bg_property_card'>
                <Stack spacing={1}>
                    <span className="title_property_card">{trait_type}</span>
                    <span className="trait_property_card">{value}</span>
                    <span className="percentage_trait_property_card">{percentage ? `${percentage}% have this trait` : 'New trait'}</span>
                </Stack>
            </div>
        </div>
    );
};

export default PropertyCard;