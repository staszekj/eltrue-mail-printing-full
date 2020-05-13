import React, {ChangeEvent, FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getSearchComponentInputString, getTheme} from "./app-selectors";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';

import './search-component.scss'
import {searchComponentTypingAction} from "./app-actions";
import {TThemeReducer} from "../redux/theme-reducer";
import {EltrueSearch} from "./widgets/eltrue-search";

const useStyles = makeStyles((theme: TThemeReducer) => {
    return {
        appBar: {
            color: theme.palette.type === 'dark' ? '#fff' : '',
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.level2 : '',
            transition: theme.transitions.create('width'),
        }
    }
});


type SearchCompomentCmpProp = {
    className?: string;
}
export const SearchCompoment: FunctionComponent<SearchCompomentCmpProp> = () => {
    const dispatch = useDispatch();
    const value = useSelector(getSearchComponentInputString);
    const theme = useSelector(getTheme);
    const classes = useStyles(theme);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchComponentTypingAction({inputString: e.target.value}))
    };

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <EltrueSearch value={value} onChange={onChangeHandler}/>
                </Toolbar>
            </AppBar>
        </div>
    );
};
