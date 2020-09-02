import { apiInstance } from './index';
import * as apiRoutes from './apiRoutes';
import * as appActions from '../store/appActions'
import { store } from "../store/store";


export const getAddressType = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.addressType);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false))
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }
}

export const getGender = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.gender);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false))
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true))
        return err;
    }
}

export const getLanguages = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.languages);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false));
        return response
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }
}

export const getStates = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.states);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false));
        return response
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true))
        return err;
    }
}

export const getDistricts = async (stateId) => {
    try {
        const response = await apiInstance.get(`${apiRoutes.districts + stateId}`);
        store.dispatch(appActions.app_onChange('apiError',false));
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('apiError',true))
        return err;
    }
}

export const getQualificationDetails = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.qualification);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false))
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }
}

export const getProfessionalLevel = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.professionalLevel);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false));
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }
}

export const getSalaryPerAnnum = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.annumSalary);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false));
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }

}

export const getKnownViaProducts = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.knownviaproducts);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }
}

export const getUserRoles = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.userRoles);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false));
        return response;
    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }
}



export const getAllUsers = async () => {
    store.dispatch(appActions.app_onChange('loadingStatus', true));
    try {
        const response = await apiInstance.get(apiRoutes.allUsers);
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',false));
        return response;

    }
    catch (err) {
        store.dispatch(appActions.app_onChange('loadingStatus', false));
        store.dispatch(appActions.app_onChange('apiError',true));
        return err;
    }
}

export const createUser = async (user) => {
    try {
        const response = await apiInstance.post(apiRoutes.createUsers, {
            ...user
        });
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getUserById = async (editId) => {
    try {
        const response = await apiInstance.get(`${apiRoutes.UsersById + editId}`);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const updateUser = async (user, updateId) => {
    try {
        const response = await apiInstance.put(apiRoutes.updateUser + `${updateId}`, { ...user });
        return response;
    }
    catch (err) {
        return err;
    }
}

export const deleteUserById = async (deleteId) => {
    try {
        const response = await apiInstance.delete(`${apiRoutes.deleteUserById + deleteId}`);
        return response;
    }
    catch (err) {
        return err;
    }
}











