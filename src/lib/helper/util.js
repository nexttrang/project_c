const refreshPage = () => {
    window.location.reload(false);
};

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const invoke = async (action, ms) => {
    await delay(ms);
    action();
};

export default {
    refreshPage,
    delay,
    invoke
};
