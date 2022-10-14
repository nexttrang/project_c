const ENABLE_LOG = true;

const log = (tag, content) => {
    if (ENABLE_LOG) {
        console.log(`${tag}: ${content}`);
    }
};

export default {
    log,
};