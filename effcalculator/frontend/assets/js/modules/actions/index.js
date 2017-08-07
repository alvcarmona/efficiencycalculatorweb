/**
 * Created by alvarocbasanez on 25/07/17.
 */


import * as types from './actionTypes';
import axios from 'axios';


function requestData() {
    return {type: types.REQ_DATA}
};

function receiveData(json) {
    return {
        type: types.RECV_DATA,
        data: json
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

export function editCurrentDetector(detector) {

    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: '/api/detectors/',
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: detector
        })
            .then(function (response) {
                dispatch(receiveData(response.data));
            })
            .catch(function (response) {
                dispatch(receiveError(response.data));
                dispatch(pushState(null, '/error'));
            })
    }
};

export function createDetector() {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(receiveData(response.data));
            })
            .catch(function (response) {
                dispatch(receiveError(response.data));
                dispatch(pushState(null, '/error'));
            })
    }
};

export function fetchData(url) {
    return function (dispatch) {
        dispatch(requestData());
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(receiveData(response.data));
            })
            .catch(function (response) {
                dispatch(receiveError(response.data));
                dispatch(pushState(null, '/error'));
            })
    }
};
