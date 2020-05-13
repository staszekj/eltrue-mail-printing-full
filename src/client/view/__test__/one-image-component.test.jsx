import * as React from 'react';
import {shallow} from 'enzyme'
import {useDispatch, useSelector} from 'react-redux';
import {getNextArrayId, getPrevArrayId, isAuthorUpdateRequestPending, getNextArrayIdAfterDelete, isShowAfterDelete} from "../app-selectors";
import {OneImageComponent} from "../one-image-component";

jest.mock('react-redux', () => {
    return {
        useSelector: jest.fn(),
        useDispatch: jest.fn()
    }
});

describe('<OneImageComponent/>', () => {

    const useRefSpy = jest.spyOn(React, "useRef");
    const useStateSpy = jest.spyOn(React, "useState");
    const useEffectSpy = jest.spyOn(React, "useEffect");

    const setStateSpy = jest.fn();
    const dispatchSpy = jest.fn();

    const useSelectorMap = {
        [getNextArrayId]: 1,
        [getPrevArrayId]: 2,
        [isAuthorUpdateRequestPending]: false,
        [getNextArrayIdAfterDelete]: 0,
        [isShowAfterDelete]: false
    };

    beforeEach(() => {
        jest.useFakeTimers();

        useRefSpy.mockReturnValue({current: {}} );
        useStateSpy.mockImplementation((initValue) => [initValue, setStateSpy]);
        useSelector.mockImplementation((selectorfn) => useSelectorMap[selectorfn]);
        useDispatch.mockImplementation(() => dispatchSpy);

        jest.clearAllMocks();
    });

    const props = {
        image: {
            id: "abc",
            author: "fake_author",
            width: 1280,
            height: 1024
        }
    };

    it('should be rendered', () => {
        //when
        const oneImageComponentEl = shallow(<OneImageComponent {...props}/>);

        //then
        expect(oneImageComponentEl).toMatchSnapshot();
    });

    it('should handle useEffect', () => {
        //TODO
        //To mock "new Image()" we should create "export const getNewImage = () => new Image()"
        //function in other module
        //then that module should be mocked here

        //given
        shallow(<OneImageComponent {...props}/>);
        const useEffectHandleFn = useEffectSpy.mock.calls[0][0];

        //when
        useEffectHandleFn();
        const setTimeoutHandler = setTimeout.mock.calls[0][0];
        setTimeoutHandler();

        //then
        expect(setStateSpy).toHaveBeenCalledWith(expect.any(Number));
    })
});
