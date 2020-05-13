import React, {FunctionComponent, useState} from 'react'
import classnames from 'classnames';
import {MdDelete, MdZoomOutMap} from 'react-icons/md';

import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import "./tile-image-component.scss"
import {
    deleteImageAsyncAction,
    searchComponentPictureClickAction,
    searchComponentSelectOneImageAction
} from "./app-actions";
import VisibilitySensor from 'react-visibility-sensor';
import {getArrayId, isOneImageShow} from "./app-selectors";

export type TTileImageComponentProps = {
    id: string,
    downloadUrl: string,
    width: number,
    height: number,
    title: string,
    info: string,
    arrayId: number
}

export const TileImageComponent: FunctionComponent<TTileImageComponentProps> = (props) => {

    const {downloadUrl, width, height, title, info, id, arrayId} = props;
    const [isVisible, setVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const oneImageShow = useSelector(isOneImageShow);
    const oneImageArrayId = useSelector(getArrayId);
    const dispatch = useDispatch();
    const onDeleteBtnClick = () => dispatch(deleteImageAsyncAction.request({
        id: id,
        arrayId: oneImageArrayId,
        show: oneImageShow
    }));
    const onZoomOutBtnClick = () => dispatch(searchComponentSelectOneImageAction({arrayId}));
    const onPictureClick = () => dispatch(searchComponentPictureClickAction({arrayId}));

    const onVisibleChangeHandler = (isVisible: boolean) => {
        if (isVisible) {
            setVisible(true);
        }
    };

    if (isVisible) {
        const imgEl = imgRef.current;
        if (imgEl) {
            imgEl.src = downloadUrl;
        }
    }


    return (
        <div className={"tile-image-component"}>
            <VisibilitySensor partialVisibility={true} onChange={onVisibleChangeHandler}>
                <div style={{width: width, height: height}}>
                    <img ref={imgRef} alt={title} onClick={onPictureClick}/>
                </div>
            </VisibilitySensor>
            <div className={"details"}>
                <span className={classnames("details-content", "title")}>{title}</span>
                <span className={classnames("details-content", "info")}>{info}</span>
            </div>
            <div className={"toolbar"}>
                <div className={classnames("toolbar-content", "icon-1")} onClick={onZoomOutBtnClick}><MdZoomOutMap/>
                </div>
                <div className={classnames("toolbar-content", "icon-2")} onClick={onDeleteBtnClick}><MdDelete/>
                </div>
            </div>
        </div>
    );
};
