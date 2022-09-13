export const CustomDialog = {
    title: '',
    content: '',
    open: false,
    positiveButton: '',
    negativeButton: '',
    onPositive: () => { },
    onNegative: () => { },
};

export const DialogErrorRegister = {
    ...CustomDialog,
    title: 'Error',
    content:
    'Email is invalid or password is weak or confirm password is not matched',
    positiveButton: 'Got it',
};

export const DialogErrorCommon = {
    ...CustomDialog,
    title: 'Error',
    content: '',
    positiveButton: 'Got it',
};

export const DialogRegisterSuccess = {
    ...CustomDialog,
    title: 'Congratulation',
    content: 'You registered successfully',
    positiveButton: 'OK',
};

export const DialogSiginSuccess = {
    ...CustomDialog,
    title: 'Welcome',
    content: 'We miss you',
    positiveButton: 'OK',
};
