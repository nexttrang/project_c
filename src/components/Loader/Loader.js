/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './Loader.css';

export const LOADER_POSITION_TINDER_CARD = 'tinder_card';
export const LOADER_POSITION_FILL_SCREEN = 'fill';

const Loader = (props) => {
    const { isLoading, position, subscribe, screen, type = '' } = props;

    useEffect(() => {
        console.log(`isLoading: ${isLoading} - position: ${position} - subscribe: ${subscribe} - screen:${screen}`);
    }, [isLoading, position, subscribe, screen]);

    const enableCondition = isLoading && (type === 'suspense' || screen === subscribe);

    return (
        <>
            {enableCondition &&
                <div className={
                    position === LOADER_POSITION_TINDER_CARD
                        ? 'cover_tinder_card_loader'
                        : 'fill_screen_loader'}>
                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.app.loading.binding,
        position: state.app.loading.position,
        subscribe: state.app.loading.subscribe,
        screen: state.app.screen
    };
};

export default connect(mapStateToProps)(Loader);