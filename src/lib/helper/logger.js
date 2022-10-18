const ENABLE_LOG = true;

const log = (tag, content) => {
    if (ENABLE_LOG) {
        console.log(`${tag ? tag : ''} ${content ? content : ''}`);
    }
};

export default {
    log,
};