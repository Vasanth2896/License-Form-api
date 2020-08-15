import { apiInstance } from './index';
import * as apiRoutes from './apiRoutes';

export const getAddressType = () => {
    try {
        const response = apiInstance.get(apiRoutes.addressType);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getGender = () => {
    try {
        const response = apiInstance.get(apiRoutes.gender);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getLanguages = () => {
    try {
        const response = apiInstance.get(apiRoutes.languages);
        return response
    }
    catch (err) {
        return err;
    }
}

export const getStates = () => {
    try {
        const response = apiInstance.get(apiRoutes.states);
        return response
    }
    catch (err) {
        return err;
    }
}

export const getDistricts = (stateId) => {
    try {
        const response = apiInstance.get(`${apiRoutes.districts + stateId}`);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getQualificationDetails = () => {
    try {
        const response = apiInstance.get(apiRoutes.qualification);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getProfessionalLevel = () => {
    try {
        const response = apiInstance.get(apiRoutes.professionalLevel);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getSalaryPerAnnum = () => {
    try {
        const response = apiInstance.get(apiRoutes.annumSalary);
        return response;
    }
    catch (err) {
        return err;
    }

}

export const getKnownViaProducts = () => {
    try {
        const response = apiInstance.get(apiRoutes.knownviaproducts);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getUserRoles = () => {
    try {
        const response = apiInstance.get(apiRoutes.userRoles);
        return response;
    }
    catch (err) {
        return err;
    }
}

export const getAllUsers = () => {
    try {
        const response = apiInstance.get(apiRoutes.allUsers);
        return response;
    }
    catch (err) {
        return err;
    }
}


export const createUser = (user) => {
    try {
        const response = apiInstance.post(apiRoutes.createUsers, {
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

export const updateUser = (user, updateId) => {
    try {
        const response = apiInstance.put(apiRoutes.updateUser + `${updateId}`, {...user});
        return response;
    }
    catch (err) {
        return err;
    }
}

export const deleteUserById = (deleteId) => {
    try {
        const response = apiInstance.delete(`${apiRoutes.deleteUserById + deleteId}`);
        return response;
    }
    catch (err) {
        return err;
    }
}











