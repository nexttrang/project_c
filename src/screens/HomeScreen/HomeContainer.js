import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import TinderCard from 'react-tinder-card';
import { Box, makeStyles } from '@material-ui/core';
import SwipeButtons from '../../components/SwipeButton/SwipeButtons';
import Like from '../../assets/images/ic_tag_like.webp';
import Nope from '../../assets/images/ic_tag_nope.webp';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { importAssets } from '../../lib/redux/actions/AssetActions';
import { useNavigate } from 'react-router-dom';
import { navigateToAssetInfo } from '../../lib/helper/navigator';
import { fetchAssests } from '../../lib/services/openseaService';
import './Home.css';
import util from '../../lib/helper/util';

function HomeContainer() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [assets, setAssests] = useState([]);
    const [nextAssets, setNextAssests] = useState([]);
    const [prevAssests, setPrevAssests] = useState([]);

    const [afterNextCursor, setAfterNextCursor] = useState('');
    const [afterPrevCursor, setAfterPrevCursor] = useState('');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [canSwipe, setCanSwipe] = useState(false);
    const [showTag, setShowTag] = useState('');

    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(assets.length)
                .fill(0)
                .map(() => React.createRef()),
        [assets]
    );

    const loadAssests = useCallback((cursor, useCase = 'current') => {
        fetchAssests(cursor).then(response => {
            const data = response.data;
            // console.log(data);

            if (useCase === 'current') {
                setAssests(data.assets.map(_asset => {
                    let asset = _asset;
                    asset['swipe'] = '';
                    return asset;
                }).filter(item => { return item.image_url; }));

                loadAssests(data.next, 'next');
                loadAssests(data.prev, 'prev');
            }
            else if (useCase === 'next') {
                setNextAssests(data.assets.map(_asset => {
                    let asset = _asset;
                    asset['swipe'] = '';
                    return asset;
                }).filter(item => { return item.image_url; }));

                setAfterNextCursor(data.next);
            }
            else if (useCase === 'prev') {
                setPrevAssests(data.assets.map(_asset => {
                    let asset = _asset;
                    asset['swipe'] = '';
                    return asset;
                }).filter(item => { return item.image_url; }));

                setAfterPrevCursor(data.prev);
            }

        }).catch(error => {
            console.log(error);
        });
    }, []);

    // set last direction and decrease current index
    const swiped = async (direction, nameToDelete, index) => {
        assets[index].swipe = direction;
        updateCurrentIndex(index - 1);
        console.log(`swiped: ${assets[index].swipe}`);

        await util.delay(500);
        setShowTag('');
    };

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    };

    const swipeLeft = async () => {
        if (canSwipe && currentIndex < assets.length) {
            assets[currentIndex].swipe = 'left';
            await childRefs[currentIndex].current.swipe('left'); // Swipe the card!
        }
    };

    const swipeRight = async () => {
        if (canSwipe && currentIndex < assets.length) {
            assets[currentIndex].swipe = 'right';
            await childRefs[currentIndex].current.swipe('right'); // Swipe the card!
        }
    };

    // increase current index and show card
    const goBack = async () => {
        if (prevAssests.length === 0) {
            // console.log('can not go back');
            return;
        }

        const newIndex = currentIndex + 1;

        if (newIndex >= assets.length) {
            shiftToPrevAssests();
        }
        else if (newIndex < assets.length && childRefs[newIndex]) {
            updateCurrentIndex(newIndex);
            assets[newIndex].swipe = '';
            await childRefs[newIndex].current.restoreCard();
        }
    };

    const onSwipeFullfilled = (asset, direction) => {
        asset.swipe = direction;
        console.log(`onSwipeFullfilled: ${asset.swipe}`);
        setShowTag(direction);
    };

    const onSwipeUnFullfilled = (asset, direction) => {
        asset.swipe = direction;
        console.log(`onSwipeUnFullfilled: ${asset.swipe}`);
        setShowTag(direction);
    };

    const navigateAssetInfo = () => {
        navigateToAssetInfo(navigate, assets[currentIndex].asset_contract.address, assets[currentIndex].token_id);
    };

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const shiftToNextAssests = () => {
        setPrevAssests([...assets]);
        setAssests([...nextAssets]);
        setNextAssests([]);
        loadAssests(afterNextCursor, 'next');
    };

    const shiftToPrevAssests = () => {
        setNextAssests([...assets]);
        setAssests([...prevAssests]);
        setPrevAssests([]);
        loadAssests(afterPrevCursor, 'prev');
    };

    useEffect(() => {
        loadAssests('');
    }, [loadAssests]);


    useEffect(() => {
        updateCurrentIndex(assets.length - 1);

        dispatch(
            importAssets(assets)
        );
    }, [assets]);

    useEffect(() => {
        // console.log(`here current index: ${currentIndex}`);
        setCanSwipe(currentIndex >= 0);

        if (currentIndex < 0) { //move next assests to current assets
            shiftToNextAssests();
        } else if (currentIndex >= assets.length) { //move prev assests to current assests
            shiftToPrevAssests();
        }
    }, [currentIndex]);

    const showCardInfo = (asset) => {
        return (
            <Stack spacing={2} className={classes.cardInfoContainer}>
                <span className='card_name'>{asset.name}</span>
                <span className='card_description'>{asset.description}</span>
            </Stack>
        );
    };

    const showTags = (asset) => {
        switch (asset.swipe) {
            case 'right':
                return <Box className={classes.like} component="img" src={Like} />;
            case 'left':
                return <Box className={classes.nope} component="img" src={Nope} />;
            default:
                return <></>;
        }
    };

    return (
        <Box>
            <Box className={classes.container}>
                {assets.map(
                    (asset, index) => (index >= currentIndex - 1) && (
                        <Box key={asset.id} style={{ justifyContent: 'center', display: 'flex' }}>
                            <TinderCard
                                ref={childRefs[index]}
                                className={classes.swipe}
                                preventSwipe={['up', 'down']}
                                onSwipe={(dir) => swiped(dir, asset.name, index)}
                                onCardLeftScreen={() => outOfFrame(asset.name, index)}
                                swipeRequirementType="position"
                                swipeThreshold="100"
                                onSwipeRequirementFulfilled={(direction) =>
                                    onSwipeFullfilled(asset, direction)
                                }
                                onSwipeRequirementUnfulfilled={(direction) =>
                                    onSwipeUnFullfilled(asset, direction)
                                }
                            >

                                <Box style={{ backgroundImage: `url(${asset.image_url})`, }} className={classes.card} />

                                {showTag === asset.swipe && showTags(asset)}

                            </TinderCard>

                            {index === currentIndex && showCardInfo(asset)}
                        </Box>
                    )
                )}
            </Box>

            <SwipeButtons
                onRestoreCard={goBack}
                onSwipeLeft={swipeLeft}
                onSwipeRight={swipeRight}
                onAssetInfo={navigateAssetInfo}
            />
        </Box >
    );
}

const useStyles = makeStyles({
    container: {
        display: 'block',
        justifyContent: 'center',
        marginTop: '2.3vh',
        // border: '1px solid red'
    },
    swipe: {
        position: 'absolute',
    },
    card: {
        position: 'relative',
        width: '91.7vw',
        height: '54.9vh',
        padding: 20,
        maxWidth: '85vw',
        borderRadius: 20,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    },
    like: {
        width: '135px',
        height: '60px',
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 1,
        elevation: 1,
        transform: 'rotate(-20deg)',
    },
    nope: {
        width: '135px',
        height: '60px',
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 1,
        elevation: 1,
        transform: 'rotate(20deg)',
    },
    cardInfoContainer: {
        position: 'absolute',
        maxWidth: '100%',
        height: '12vh',
        left: '8vw',
        right: '8vw',
        top: '70vh',
        elevation: 1,
        display: 'flex',
        justifyContent: 'top',
        // border: '1px solid red'
    }
});

export default HomeContainer;
