import React, {FunctionComponent, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getFoundImages, getArrayId} from './app-selectors'
import _ from 'lodash';
import {TileImageComponent} from "./tile-image-component";
import {Element, scroller} from 'react-scroll';
import clsx from 'clsx';

import './images-list-component.scss'
import {SCROLL_CONTAINER_ID} from "./App";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    ImageList: {
        paddingTop: '10px'
    }
});

export const ImagesListComponent: FunctionComponent<{}> = () => {
    const founded = useSelector(getFoundImages);
    const arrayId = useSelector(getArrayId);
    const selected = founded[arrayId];
    const classes = useStyles();
    useEffect(() => {
        if (selected) {
            scroller.scrollTo(selected.id, {offset: -10, containerId: SCROLL_CONTAINER_ID})
        }
    }, [selected]);
    return (
        <div className={clsx(classes.ImageList, "images-list-component")}>
            {_.map(founded, (i, arrayId) => {
                const title = i.author;
                const info = `${i.width} x ${i.height}`;
                return (
                    <Element name={i.id} key={i.id}>
                        <TileImageComponent
                            id={i.id}
                            downloadUrl={i.imageV300Url}
                            width={i.widthV300}
                            height={300}
                            title={title}
                            info={info}
                            arrayId={arrayId}
                        />
                    </Element>
                )
            })}
        </div>
    )
};
