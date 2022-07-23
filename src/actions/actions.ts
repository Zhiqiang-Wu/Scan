import {
    CLOSE_SCAN,
    LIST_VIDEO_INPUT_DEVICES,
    OPEN_SCAN,
} from '@/actions/actionTypes';
import { createAction } from 'redux-actions';

export const listVideoInputDevices = createAction(LIST_VIDEO_INPUT_DEVICES);
export const openScan = createAction(OPEN_SCAN);
export const closeScan = createAction(CLOSE_SCAN);
