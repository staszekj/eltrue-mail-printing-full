import {fade, makeStyles} from "@material-ui/core/styles";
import {TThemeReducer} from "../../redux/theme-reducer";
import React, {FunctionComponent} from "react";
import Input, {InputProps} from "@material-ui/core/Input";
import {useSelector} from "react-redux";
import {getTheme} from "../app-selectors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: TThemeReducer) => {
    return {
        root: {
            fontFamily: theme.typography.fontFamily,
            position: 'relative',
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            '& $inputInput': {
                transition: theme.transitions.create('width'),
                width: 120,
                '&:focus': {
                    width: 170,
                },
            },
        },
        search: {
            width: theme.spacing(9),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 9),
        },
    }
});
export const EltrueSearch: FunctionComponent<InputProps> = (props) => {
    const classes = useStyles();
    const theme = useSelector(getTheme);
    const inputRef = React.useRef(null);
    const desktop = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <div className={classes.root} style={{display: desktop ? 'flex' : 'none'}}>
            <div className={classes.search}>
                <SearchIcon/>
            </div>
            <Input
                disableUnderline
                placeholder="Search…"
                inputProps={{
                    'aria-label': 'Search',
                }}
                type="search"
                id="docsearch-input"
                inputRef={inputRef}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                {...props}
            />
        </div>
    );
};
