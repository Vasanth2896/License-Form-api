import React, { useState, useEffect } from 'react';
import { Container, Grid } from "@material-ui/core";
import FormFooter from './Formfooter/FormFooter';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import ProfessionalDetails from './ProfessionalDetails/ProfessionalDetails';
import AddressDetails from './AddressDetails/AddressDetails';
import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../store/appActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NavigationStepper from '../Common/NavigationStepper';
import * as apiAction from '../../apiConfig/apis'
import ServerErrorAlert from "../Common/ServerErrorAlert";
import Loader from '../Common/Loader'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#8080801f'
    },
}));

const FormLayout = (props) => {
    const { state, history, onChange } = props;
    const { personalDetails, addressDetails, qualificationDetails, personalDetailError } = state;
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [errorFree, setErrorFree] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [formLoadingStatus, setFormLoadingStatus] = useState(true);
    const newCompleted = { ...completed };
    const newErrorFree = personalDetailError.nameError || personalDetailError.mailIdError;
    const steps = [
        {
            id: 0,
            name: 'Personal Details',
            routePath: '/layout/PersonalDetails'
        },
        {
            id: 1,
            name: 'Address Details',
            routePath: '/layout/AddressDetails'
        },
        {
            id: 2,
            name: 'Professional Details',
            routePath: '/layout/ProfessionalDetails'
        }
    ];



    const loadSeed = async () => {
        const getStateData = await apiAction.getStates();
        const getGenderData = await apiAction.getGender();
        const getLanguagesData = await apiAction.getLanguages();
        const getQualificationDetailsData = await apiAction.getQualificationDetails();
        const getProfessionalLevelData = await apiAction.getProfessionalLevel();
        const getSalaryPerAnnumData = await apiAction.getSalaryPerAnnum();
        const getKnowledgeSeedData = await apiAction.getKnownViaProducts();
        const getUserRolesData = await apiAction.getUserRoles();
        const getAddressTypeData = await apiAction.getAddressType();
        const getAllUsersData = await apiAction.getAllUsers();

        const allSeedApis = [getStateData, getGenderData, getLanguagesData, getQualificationDetailsData,
            getProfessionalLevelData, getSalaryPerAnnumData, getKnowledgeSeedData, getUserRolesData
            , getAddressTypeData];
        const apiSeedValidation = allSeedApis.some(data => data.request.status !== 200);

        if (apiSeedValidation) {
            setApiError(true);
        }

        const seedHolder = {
            states: getStateData.data,
            gender: getGenderData.data,
            language: getLanguagesData.data,
            qualifcationDetailsSeed: getQualificationDetailsData.data,
            professionalLevel: getProfessionalLevelData.data,
            salary: getSalaryPerAnnumData.data,
            knowledgeSeed: getKnowledgeSeedData.data,
            userRoles: getUserRolesData.data,
            addressType: getAddressTypeData.data
        }
        
        
        onChange('userList', getAllUsersData.data);
        onChange('seed', seedHolder);
        
        setFormLoadingStatus(false);
    }




    useEffect(() => {
        loadSeed();
    }, [])

    function handleBlankSpace(detail) {
        return !detail.toString().replace(/\s/g, '').length <= 0;
    }

    useEffect(() => {
        const { action, location } = history;
        if (action === 'POP') {
            const popStep = steps.find(step => step.routePath === location.pathname);
            setActiveStep(popStep.id);
        }
    }, []);

    const backButtonNavigation = (stepItem) => {
        if (stepItem.id) {
            history.push(steps[stepItem.id - 1].routePath);
            setActiveStep(stepItem.id - 1);
        }
        else {
            history.push('/');
        }
    }

    const handleComplete = (completeflag, currentStep) => {
        newCompleted[currentStep] = completeflag;
        setCompleted({ ...newCompleted });
    };

    function personalDetailsValidator(textFields, objectFields, collectionFields) {
        const collectionValidation = Object.values(collectionFields).every(collection => collection.length);
        const objectValidation = Object.values(objectFields).every(field => field !== null);
        const textValidation = Object.values(textFields).every(detail => handleBlankSpace(detail));
        const otherIsChecked = collectionValidation && objectValidation && textValidation && collectionFields.knownViaProducts.includes(6) && handleBlankSpace(personalDetails.others);
        const otherIsNotChecked = collectionValidation && objectValidation && textValidation && !collectionFields.knownViaProducts.includes(6)

        if (otherIsChecked || otherIsNotChecked) {
            return true;
        }

        return false;
    }


    useEffect(() => {
        const { age, dateOfBirth, knownViaProducts, mailId, mobNo, motherTongueId, name, preferredLanguageId } = personalDetails;
        const personalDetailTextField = { age, mailId, mobNo, name };
        const personalDetailObjectFields = { dateOfBirth, motherTongueId };
        const personalDetailsCollections = { knownViaProducts, preferredLanguageId };
        const personalValidator = personalDetailsValidator(personalDetailTextField, personalDetailObjectFields, personalDetailsCollections);
        handleComplete(personalValidator, 0);
    }, [personalDetails]);

    function addressDetailsValidator(idFields, textFields) {
        const validation = Object.values(idFields).every(id => id !== null) && Object.values(textFields).every(detail => handleBlankSpace(detail));
        return validation;
    }


    useEffect(() => {
        const { stateId, districtId, address, country, pincode } = addressDetails;
        const addressDetailsIdFields = { stateId, districtId };
        const addressDetailsTextField = { address, country, pincode };
        const addressValidator = addressDetailsValidator(addressDetailsIdFields, addressDetailsTextField);
        handleComplete(addressValidator, 1);
    }, [addressDetails])


    useEffect(() => {
        if (qualificationDetails.userRoleId === 3) {
            handleComplete(true, 2);
        }
        else if (qualificationDetails.userRoleId === 2) {
            const { levelId, annumSal } = qualificationDetails;
            const professionalFormFields = { levelId, annumSal };
            handleComplete(Object.values(professionalFormFields).every(field => field !== null), 2);
        }
        else if (qualificationDetails.userRoleId === 1) {
            const { institutionName, institutionAddress, country,
                studyingAt, pincode, userQualificationId, stateId, districtId } = qualificationDetails;
            const studentFormTextFields = { institutionName, institutionAddress, country, studyingAt, pincode }
            const studentFormIdFields = { userQualificationId, stateId, districtId }
            const studentFormValidation = Object.values(studentFormTextFields).every(detail => handleBlankSpace(detail)) &&
                Object.values(studentFormIdFields).every(id => id !== null);
            handleComplete(studentFormValidation, 2)
        }
    }, [qualificationDetails])

    useEffect(() => {
        setErrorFree(newErrorFree);
    }, [newErrorFree]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        history.push(steps[activeStep + 1].routePath);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        history.push(steps[activeStep - 1].routePath);
    };

    const handleStep = (step) => {
        history.push(steps[step].routePath);
        setActiveStep(step);
    };

    return (
        <div>
            {formLoadingStatus? (<Loader />) : (
                !apiError ? (
                    <div>
                        <Container style={{ height: '100vh' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '18%', marginBottom: '20px' }}>
                                <FontAwesomeIcon icon={faArrowLeft} onClick={() => backButtonNavigation(steps[activeStep])} style={{ cursor: 'pointer' }} />
                                <h3>Individual User</h3>
                            </div>
                            <Grid container spacing={7}>
                                <Grid item xs={3} style={{ cursor: errorFree ? 'not-allowed' : 'default' }} >
                                    <NavigationStepper
                                        stepperSteps={steps}
                                        stepperClassname={classes.root}
                                        activeStep={activeStep}
                                        handleStep={handleStep}
                                        completed={completed}
                                        disabled={errorFree}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <div>
                                        <Redirect from='/' to={'/layout/PersonalDetails'} />
                                        <Switch>
                                            <Route path={'/layout/PersonalDetails'} render={() => <PersonalDetails {...props} />} />
                                            <Route path={'/layout/AddressDetails'} render={() => <AddressDetails {...props} />} />
                                            <Route path={'/layout/ProfessionalDetails'} render={() => <ProfessionalDetails {...props} />} />
                                        </Switch>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                        <FormFooter
                            handleNext={handleNext}
                            handleBack={handleBack}
                            setActiveStep={setActiveStep}
                            {...props} />
                    </div>
                ) : (
                        <ServerErrorAlert />
                    ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        errorValidation: appActions.errorValidation,
        onCancel: appActions.onCancel,
        onSave: appActions.onSave,
        onChange: appActions.app_onChange
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLayout);