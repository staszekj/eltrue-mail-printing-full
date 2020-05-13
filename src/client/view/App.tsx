import React, {FunctionComponent, useEffect} from 'react';
import {SearchCompoment} from './search-component'
import {ImagesListComponent} from './images-list-component'
import {useDispatch, useSelector} from "react-redux";

import {appInitAction} from "./app-actions";
import {OneImageComponent} from "./one-image-component";
import {getOneImage, getTheme, isOneImageShow} from "./app-selectors";
import {Element} from 'react-scroll';

import './app.scss'
import {makeStyles} from "@material-ui/core/styles";
import {TThemeReducer} from "../redux/theme-reducer";

const useStyles = makeStyles((theme: TThemeReducer) => {
    return {
        MainVertical: {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 20px)'
        },
        Header: {
            height: '70px',
        },
        Main: {
            flex: 1,
            position: 'relative',
            backgroundColor: theme.palette.background.level2
        },
        ScrollContainer: {
            position: 'absolute',
            height: '100%',
            overflowY: 'auto'
        },
        FooterContent: {
            paddingTop: '10px',
            paddingLeft: '10px',
            fontSize: '10px',
            fontWeight: 200
        }
    }
});

export const SCROLL_CONTAINER_NAME = "SCROLL_CONTAINER_NAME";
export const SCROLL_CONTAINER_ID = "SCROLL_CONTAINER_ID";

const App: FunctionComponent<{}> = () => {

    const oneImage = useSelector(getOneImage);
    const showOneImage = useSelector(isOneImageShow);
    const theme = useSelector(getTheme);
    const classes = useStyles(theme);


    if (oneImage && showOneImage) {
        return (
            <OneImageComponent image={oneImage}/>
        )
    }

    return (
        <div className={classes.MainVertical}>
            <div className={classes.Header}>
                <SearchCompoment/>
            </div>
            <div className={classes.Main}>
                <Element className={classes.ScrollContainer} name={SCROLL_CONTAINER_NAME} id={SCROLL_CONTAINER_ID}>
                    <ImagesListComponent/>
                </Element>
            </div>
            <div className={classes.FooterContent}>
                {"Version: 0.0.2"}
            </div>
        </div>
    )
};

export default App;
