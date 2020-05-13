import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import classnames from 'classnames';
import {MdArrowBack, MdArrowForward, MdClose, MdEdit, MdDelete} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';

import "./one-image-component.scss"
import {TImageMeta} from "../../common/search-endpoint";
import {
    authorUpdateAsyncAction,
    deleteImageAsyncAction,
    oneImageComponentBackwardClickAction,
    oneImageComponentCloseClickAction,
    oneImageComponentForwardClickAction
} from "./app-actions";
import {
    getNextArrayId,
    getNextArrayIdAfterDelete,
    getPrevArrayId,
    isAuthorUpdateRequestPending,
    isShowAfterDelete
} from "./app-selectors";
import {EditableText} from "./widgets/editable-text-widget";

export interface TOneImageComponentProp {
    image: TImageMeta;
}

export const OneImageComponent: FunctionComponent<TOneImageComponentProp> = ({image}) => {

    const imgRef = useRef<HTMLImageElement>(null);

    const [isAuthorEditMode, setAuthorEditMode] = useState<boolean>(false);
    const [isImageFullyLoaded, setImageFullyLoaded] = useState<boolean>(false);
    const [currentAuthor, setCurrentAuthor] = useState<string>(image.author);
    const [currentTimeout, setCurrentTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [currentId, setCurrentId] = useState<string>(image.id);

    const prevArrayId = useSelector(getPrevArrayId);
    const nextArrayId = useSelector(getNextArrayId);
    const arrayIdAfterDelete = useSelector(getNextArrayIdAfterDelete);
    const showAfterDelete = useSelector(isShowAfterDelete);
    const isRequestPending = useSelector(isAuthorUpdateRequestPending);

    const dispatch = useDispatch();

    const onCloseBtnClick = () => dispatch(oneImageComponentCloseClickAction());
    const onDeleteBtnClickHandler = () => dispatch(deleteImageAsyncAction.request({
        id: image.id,
        arrayId: arrayIdAfterDelete,
        show: showAfterDelete
    }));
    const onForwardBtnClick = () => dispatch(oneImageComponentForwardClickAction({arrayId: nextArrayId}));
    const onPrevBtnClick = () => dispatch(oneImageComponentBackwardClickAction({arrayId: prevArrayId}));

    const openEditMode = () => {
        if (isAuthorEditMode){
            return;
        }
        setCurrentAuthor(image.author);
        setAuthorEditMode(true);
    };
    const onEnterTitle = () => {
        setAuthorEditMode(false);
        dispatch(authorUpdateAsyncAction.request({id: image.id, author: currentAuthor}));
    };

    const editableTextString = isAuthorEditMode || isRequestPending ? currentAuthor : image.author;
    const editButtonWithClickHandlerEl = (<div key={"editButtonWithClickHandler"} className={classnames("edit-icon")} onClick={() => openEditMode()}><MdEdit/></div>);
    const editButtonWithoutClickHandlerEl = (<div key={"editButtonWithoutClickHandler"} className={classnames("edit-icon")}><MdEdit/></div>);
    const editButtonEl = isAuthorEditMode ? editButtonWithoutClickHandlerEl : editButtonWithClickHandlerEl;
    const spinnerEl = !isImageFullyLoaded ? (
        <div className={classnames("spinner-icon")}>
            <div className={"spinner"}/>
        </div>) : null;

    if (currentId !== image.id) {
        setAuthorEditMode(false);
        setImageFullyLoaded(false);
        setCurrentId(image.id);
    }

    useEffect(() => {
        if (currentTimeout) {
            clearTimeout(currentTimeout)
        }
        const delayedFullImageLoading = setTimeout(() => {
            const imageLoader = new Image();
            imageLoader.src = image.downloadUrl;
            imageLoader.onload = () => {
                const imageRef = imgRef.current;
                if (imageRef && imageRef.src === image.imageV300Url) {
                    imageRef.src = imageLoader.src;
                    setImageFullyLoaded(true);
                }
            };
        }, 500);
        setCurrentTimeout(delayedFullImageLoading)
    }, [image.id]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"one-image-component"}>
            <div className={"one-image"}>
                <div className={classnames("toolbar")}>
                    <div className={classnames("close-icon")} onClick={() => onCloseBtnClick()}><MdClose/></div>
                    {editButtonEl}
                    <div className={classnames("delete-icon")} onClick={() => onDeleteBtnClickHandler()}><MdDelete/>
                    </div>
                    {spinnerEl}
                </div>
                <img ref={imgRef} src={image.imageV300Url} alt={image.author}/>
                <div className={"details"}>
                    <EditableText text={editableTextString} isInput={isAuthorEditMode || isRequestPending}
                                  isReadOnly={isRequestPending}
                                  isSpinner={isRequestPending}
                                  classNames={classnames("details-content", "title")}
                                  onEnter={onEnterTitle}
                                  onChange={(text) => setCurrentAuthor(text)}
                                  onTextClick={() => openEditMode()}>
                    </EditableText>
                    <span className={classnames("details-content", "info")}>{`${image.width} x ${image.height}`}</span>
                </div>
                <div className={"right-toolbar"}>
                    <div className={classnames("right-toolbar-content", "icon-1")} onClick={() => onForwardBtnClick()}>
                        <MdArrowForward/></div>
                </div>
                <div className={"left-toolbar"}>
                    <div className={classnames("left-toolbar-content", "icon-1")} onClick={() => onPrevBtnClick()}>
                        <MdArrowBack/></div>
                </div>
            </div>
        </div>
    );
};
