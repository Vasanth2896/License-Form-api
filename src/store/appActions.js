import _ from 'lodash';
import * as apiAction from "../apiConfig/apis";
export const UPDATE_STATE = "UPDATE_STATE";

export const initialState = {
    personalDetails: {
        name: '',
        genderId: 1,
        dateOfBirth: null,
        age: '',
        mailId: '',
        mobNo: '',
        motherTongueId: null,
        preferredLanguageId: [],
        knownViaProducts: [],
        others: ''
    },
    addressDetails: {
        address: "",
        stateId: null,
        districtId: null,
        pincode: "",
        country: "",
        type: 1
    },
    qualificationDetails: {
        userRoleId: 1,
        userQualificationId: null,
        institutionName: "",
        institutionAddress: "",
        country: "",
        studyingAt: "",
        stateId: null,
        districtId: null,
        pincode: "",
        levelId: null,
        annumSal: null
    },
    personalDetailError: {
        nameError: false,
        mailIdError: false,
        nameHelperText: '',
        mailIdHelperText: '',
    },
    editFlag: false,
    editId: null,
    userList: [],
    user: {},
    seed: {},
}

export function app_onChange(name, value) {
    return { type: UPDATE_STATE, payload: { name: name, value: value } };
}

export function errorValidation() {
    return (dispatch, getState) => {
        const { personalDetails, userList, personalDetailError, editId } = getState().appReducer;
        const { name, mailId } = personalDetails;
        const mailIdRegex = /^([A-Z a-z][\w\d . _ -]+)@([\w\d _-]+).([a-z]{2,20})(\.[a-z]{2,10})$/;
        const newUserList = editId !== null ? userList.filter((user) => { return editId !== user.id }) : userList;
        const emailDuplicateFlag = newUserList.some(user => user.mailId === mailId);

        if (emailDuplicateFlag) {
            personalDetailError.mailIdError = true;
            personalDetailError.mailIdHelperText = 'The mail id already exists';
        }

        if (name === '' || name.toString().replace(/\s/g, '').length <= 0) {

            personalDetailError.nameError = true;
            personalDetailError.nameHelperText = 'Please enter the name';
        }

        if (mailId === '') {
            personalDetailError.mailIdError = true;
            personalDetailError.mailIdHelperText = 'Please enter the mail id';
        }

        if (mailId !== '' && !mailIdRegex.test(mailId)) {
            personalDetailError.mailIdError = true;
            personalDetailError.mailIdHelperText = 'invalid email ID';
        }

        dispatch(app_onChange('personalDetailError', personalDetailError));
        if (personalDetailError.nameError || personalDetailError.mailIdError) {
            return false;
        }
        else {
            return true
        }
    }
}


export function onCancel() {
    return (dispatch) => {
        const restoreInitialState = _.cloneDeep(initialState);
        const { personalDetails, addressDetails, qualificationDetails } = restoreInitialState;
        dispatch(app_onChange('personalDetails', personalDetails));
        dispatch(app_onChange('addressDetails', addressDetails));
        dispatch(app_onChange('qualificationDetails', qualificationDetails));
        dispatch(app_onChange('personalDetailError', { nameError: false, mailIdError: false, nameHelperText: "", mailIdHelperText: "" }));
        dispatch(app_onChange('editFlag', false));
        dispatch(app_onChange('editUserId', null));
    }
}

export function onSave() {
    return (dispatch, getState) => {
        const { personalDetails, addressDetails, qualificationDetails, user, editFlag, editId } = getState().appReducer;
        Object.assign(user, {
            personalDetails: personalDetails,
            addressDetails: addressDetails,
            qualificationDetails: qualificationDetails
        })
        if (editFlag) {
            apiAction.updateUser(user, editId);
        }
        else {
           return  apiAction.createUser(user);
        }
        dispatch(app_onChange('editFlag', false));
        dispatch(app_onChange('user', {}));
    }
}

export function onDelete(deleteUser) {
    return (dispatch, getState) => {
        const { userList } = getState().appReducer;
        apiAction.deleteUserById(deleteUser.id);
        const newUserList = userList.filter(user => deleteUser.id !== user.id);
        dispatch(app_onChange('userList', newUserList));
    }
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATE:
            return { ...state, [action.payload.name]: action.payload.value };
        default:
            return state;
    }
};