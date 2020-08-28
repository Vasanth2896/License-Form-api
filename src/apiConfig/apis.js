import { apiInstance } from './index';
import * as apiRoutes from './apiRoutes';

export const getAddressType = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.addressType);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getGender = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.gender);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getLanguages = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.languages);
        return response
    }
    catch (err) {
        return err;
    }
}

export const getStates = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.states);
        return response
    }
    catch (err) {
        return err;
    }
}

export const getDistricts = async (stateId) => {
    try {
        const response = await apiInstance.get(`${apiRoutes.districts + stateId}`);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getQualificationDetails = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.qualification);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getProfessionalLevel = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.professionalLevel);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getSalaryPerAnnum = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.annumSalary);
        return response;
    }
    catch (err) {
        return err;
    }

}

export const getKnownViaProducts = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.knownviaproducts);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getUserRoles = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.userRoles);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await apiInstance.get(apiRoutes.allUsers);
        return response;
    }
    catch (err) {
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











