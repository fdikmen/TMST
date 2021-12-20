import axios from 'axios'
import { API_BASE } from '../config/env';

export const FETCH_STOCKPROCESS_PENDING = "FETCH_STOCKPROCESS_PENDING"
export const FETCH_STOCKPROCESS_FULFILLED = "FETCH_STOCKPROCESS_FULFILLED"
export const FETCH_STOCKPROCESS_REJECTED = "FETCH_STOCKPROCESS_REJECTED"

export const GET_STOCKPROCESS_PENDING = "GET_STOCKPROCESS_PENDING"
export const GET_STOCKPROCESS_FULFILLED = "GET_STOCKPROCESS_FULFILLED"
export const GET_STOCKPROCESS_REJECTED = "GET_STOCKPROCESS_REJECTED"

export const ADD_STOCKPROCESS_PENDING = "ADD_STOCKPROCESS_PENDING"
export const ADD_STOCKPROCESS_FULFILLED = "ADD_STOCKPROCESS_FULFILLED"
export const ADD_STOCKPROCESS_REJECTED = "ADD_STOCKPROCESS_REJECTED"

export const UPDATE_STOCKPROCESS_PENDING = "UPDATE_STOCKPROCESS_PENDING"
export const UPDATE_STOCKPROCESS_FULFILLED = "UPDATE_STOCKPROCESS_FULFILLED"
export const UPDATE_STOCKPROCESS_REJECTED = "UPDATE_STOCKPROCESS_REJECTED"

export const DELETE_STOCKPROCESS_PENDING = "DELETE_STOCKPROCESS_PENDING"
export const DELETE_STOCKPROCESS_FULFILLED = "DELETE_STOCKPROCESS_FULFILLED"
export const DELETE_STOCKPROCESS_REJECTED = "DELETE_STOCKPROCESS_REJECTED"


//GET ALL
export function fetchStockprocess(){
    return dispatch => {
        dispatch({type:"FETCH_STOCKPROCESS",
        payload:axios.get(`${API_BASE}/stockprocess/all`).then(res=>res.data)})    
    }
}

//GET ANYONE
export function getStockprocess(id){
    return dispatch => {
        dispatch({type:"GET_STOCKPROCESS",
        payload:axios.get(`${API_BASE}/stockprocess/${id}`).then(res=>res.data)})    
    }
}
//DELETE
export function deleteStockprocess(id){
    return dispatch => {
        dispatch({type:"DELETE_STOCKPROCESS",
        payload:axios.delete(`${API_BASE}/stockprocess/${id}`)
        .then(res=>Object.assign({},res.data,{id}))})    
    }
}
//UPDATE
export function updateStockprocess({_id,stockId, quantity, userId, processDate}){
    return dispatch => {
        dispatch(
            {
                type:"UPDATE_STOCKPROCESS",
                payload:axios.put(`${API_BASE}/stockprocess/${_id}`,{StockId:stockId, Quantity:quantity, UserId:userId, ProcessDate:processDate})
            }
        )
    }
}
//ADD
export function addNewStockprocess({stockId, quantity, userId, processDate}){
    return dispatch => {
        dispatch(
            {
                type:"ADD_STOCKPROCESS",
                payload:axios.post(`${API_BASE}/stockprocess`,{StockId:stockId, Quantity:quantity, UserId:userId, ProcessDate:processDate})
            }
        )
    }
}