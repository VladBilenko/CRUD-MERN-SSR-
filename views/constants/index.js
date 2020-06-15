import actions from "../store/actions";

const {notation: {updateNotation, creteNotation}} = actions;

export const NotationsFormStrategyTypes = {
    create: 'create',
    update: 'update'
};

export const NotationFormStrategies = {
    [NotationsFormStrategyTypes.create]: {
        action: creteNotation,
        title: 'Create notation',
        isNeedHash: false,
        isDeleteButton: false
    },
    [NotationsFormStrategyTypes.update]: {
        action: updateNotation,
        title: 'Update notation',
        isNeedHash: true,
        isDeleteButton: true
    }
};