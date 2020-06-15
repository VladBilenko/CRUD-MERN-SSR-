import ActionTypes from "../action-types";

const {notation: {LoadAll, SetAll, LoadOne, SetOne, Create, Update, Delete, ClearData}} = ActionTypes;

const NotationActions = {
    getAllNotations,
    setAllNotations,
    getOneNotation,
    setOneNotation,
    creteNotation,
    updateNotation,
    deleteNotation,
    clearData
};

function getAllNotations() {
    return {
        type: LoadAll
    }
}

function setAllNotations(payload) {
    return {
        type: SetAll,
        payload
    }
}

function getOneNotation(payload) {
    return {
        type: LoadOne,
        payload
    }
}

function setOneNotation(payload) {
    return {
        type: SetOne,
        payload
    }
}

function creteNotation(payload) {
    return {
        type: Create,
        payload
    }
}

function updateNotation(payload) {
    return {
        type: Update,
        payload
    }
}

function deleteNotation(payload) {
    return {
        type: Delete,
        payload
    }
}

function clearData() {
    return {
        type: ClearData
    }
}

export default NotationActions;