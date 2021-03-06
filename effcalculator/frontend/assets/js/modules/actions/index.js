/**
 * Created by alvarocbasanez on 25/07/17.
 */


import * as types from './actionTypes';
import axios from 'axios';


function requestData() {
    return {type: types.REQ_DATA}
};

export function openModal() {
    return {type: types.OPEN_MODAL}
};

export function closeModal() {
    return {type: types.CLOSE_MODAL}
};

function receiveData(json) {
    return {
        type: types.RECV_DATA,
        data: json
    }
};

function receiveNew(data) {
    return {
        type: types.RECV_NEW,
        data: data
    }
};

function receiveMeta(data) {
    return {
        type: types.RECV_META,
        data: data
    }
};

function receiveEdit(data) {
    return {
        type: types.RECV_EDIT,
        data: data
    }
};

function receiveError(json) {
    return {
        type: types.RECV_ERROR,
        data: json
    }
};

export function setCurrentDetector(currentDetector) {
    return {
        type: types.SET_CURRENT,
        currentDetector: currentDetector
    }
};

export function selectDetectors(detectorsSelected) {
    return {
        type: types.SELECT_DETECTORS,
        detectorsSelected: detectorsSelected,
        payload:{detectorsSelected}
    }
};

function deleteSuccess(data) {
    return {
        type: types.DELETE_SUCCESS,
        data: data
    }
};

function deleteError(data) {
    return {
        type: types.DELETE_ERROR,
        data: data
    }
};


export function editCurrentDetector(data) {
 console.log('editCurrent')
    return function (dispatch) {
        return axios({
            url: '/api/detectors/' + data.id + '/',
            timeout: 20000,
            method: 'put',
            responseType: 'json',
            data: data
        })
            .then(function (response) {
                console.log('edit sucess')
                dispatch(receiveEdit(response.data));
            })
            .catch(function (response) {
                console.log("edit detector Error")
            })
    }
};


export function createDetector(data) {
    return function (dispatch) {
        console.log(data)
        console.log("nuevodetector")
        dispatch(requestData());
        return axios({
            url: '/api/detectors/',
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: data
        })
            .then(function (response) {
                dispatch(receiveNew(response.data));
            })
            .catch(function (response) {
                console.log("CreateDetector Error")
                //dispatch(receiveError(response.data));
            })
    }
};

export function fetchData() {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: '/api/detectors/',
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(receiveData(response.data));
            })
            .catch(function (response) {
                dispatch(receiveError(response.data));
            })
    }
};


export function requestConverters() {
    return function () {
        return axios({
            url: '/api/converters/',
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then(function (response) {
                console.log('Converters')
                console.log(response)
            })
            .catch(function (response) {
                console.log('No converters')
                console.log(response)
            })
    }
};


export function deleteDetector(data) {
    console.log('delete')
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: '/api/detectors/' + data + '/',
            timeout: 20000,
            method: 'delete',
            responseType: 'json',
            data: data
        })
            .then(function () {
                dispatch(deleteSuccess(data));
            })
            .catch(function () {
                dispatch(deleteError());
            })
    }
};


export function setMetadata(data) {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: '/api/detectors/' + data.id + '/calculate_efficiency/',
            timeout: 90000,
            method: 'put',
            responseType: 'json',
            data: data
        })
            .then(function (response) {
                dispatch(receiveMeta(response.data));
            })
            .catch(function (response) {
                console.log("SetMetadata Error")
                //dispatch(receiveError(response.data));
            })
    }
};

export function optimizeDiffThickness(data) {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: '/api/detectors/' + data.id + '/optimizeDiffThickness/',
            timeout: 90000,
            method: 'put',
            responseType: 'json',
            data: data
        })
            .then(function (response) {
                dispatch(receiveMeta(response.data));
            })
            .catch(function (response) {
                console.log("SetMetadata Error")
                //dispatch(receiveError(response.data));
            })
    }
};

export function optimizeWave(data) {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: '/api/detectors/' + data.id + '/optimizeWave/',
            timeout: 90000,
            method: 'put',
            responseType: 'json',
            data: data
        })
            .then(function (response) {
                dispatch(receiveMeta(response.data));
            })
            .catch(function (response) {
                console.log("SetMetadata Error")
                //dispatch(receiveError(response.data));
            })
    }
};