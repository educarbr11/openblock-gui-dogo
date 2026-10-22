const SET_NAME = 'scratch-gui/connection-modal/setName';
const CLEAR_NAME = 'scratch-gui/connection-modal/clearName';
const SET_REALTIME_PROTOCAL_CONNECTION = 'scratch-gui/connection-modal/setRealtimeConnection';
const SET_LIST_ALL = 'scratch-gui/connection-modal/setListAll';
const SET_DEVICE_ID = 'scratch-gui/connection-modal/setDeviceId';
const CLEAR_DEVICE_ID = 'scratch-gui/connection-modal/clearDeviceId';
const SET_CONNECTION_TYPE = 'scratch-gui/connection-modal/setConnectionType';

const initialState = {
    peripheralName: null,
    realtimeConnection: false,
    isListAll: false,
    connectionType: 'auto',
    deviceId: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_NAME:
        return Object.assign({}, state, {
            peripheralName: action.peripheralName
        });
    case CLEAR_NAME:
        return Object.assign({}, state, {
            peripheralName: null
        });
    case SET_REALTIME_PROTOCAL_CONNECTION:
        return Object.assign({}, state, {
            realtimeConnection: action.isConnected
        });
    case SET_LIST_ALL:
        return Object.assign({}, state, {
            isListAll: action.isListAll
        });
    case SET_DEVICE_ID:
        return Object.assign({}, state, {
            deviceId: action.deviceId
        });
    case SET_CONNECTION_TYPE:
        return Object.assign({}, state, {
            connectionType: action.connectionType
        });
    case CLEAR_DEVICE_ID:
        return Object.assign({}, state, {
            deviceId: null
        });
    default:
        return state;
    }
};

const setConnectionModalPeripheralName = function (peripheralName) {
    return {
        type: SET_NAME,
        peripheralName: peripheralName
    };
};

const clearConnectionModalPeripheralName = function () {
    return {
        type: CLEAR_NAME
    };
};

const setRealtimeConnection = function (isConnected) {
    return {
        type: SET_REALTIME_PROTOCAL_CONNECTION,
        isConnected: isConnected
    };
};

const setListAll = function (isListAll) {
    return {
        type: SET_LIST_ALL,
        isListAll: isListAll
    };
};

const setConnectionModalDeviceId = function (deviceId) {
    return {
        type: SET_DEVICE_ID,
        deviceId: deviceId
    };
};

const setConnectionType = function (connectionType) {
    return {
        type: SET_CONNECTION_TYPE,
        connectionType: connectionType
    };
};

const clearConnectionModalDeviceId = function () {
    return {
        type: CLEAR_DEVICE_ID
    };
};

export {
    reducer as default,
    initialState as connectionModalInitialState,
    setConnectionModalPeripheralName,
    clearConnectionModalPeripheralName,
    setRealtimeConnection,
    setListAll,
    setConnectionType,
    setConnectionModalDeviceId,
    clearConnectionModalDeviceId
};
