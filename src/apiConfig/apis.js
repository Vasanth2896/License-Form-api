import { instance } from './index';

export async function getLanguages() {
    try {
        const response = await instance.get('/languages');
        return response;
    }
    catch (err) {
        return err;
    }
}

export async function getStates() {
    try {
        const response = await instance.get('/states');
        return response;
    }
    catch (err) {
        return err;
    }
}

export async function getQualificationDetails() {
    try {
        const response = await instance.get('/qualification');
        return response;
    }
    catch (err) {
        return err;
    }
}


export async function getProfessionalLevel() {
    try {
        const response = await instance.get('/professionalLevel');
        return response;
    }
    catch (err) {
        return err;
    }
}

export async function getSalaryPerAnnum() {
    try {
        const response = await instance.get('/annumSalary');
        return response;
    }
    catch (err) {
        return err;
    }
}







