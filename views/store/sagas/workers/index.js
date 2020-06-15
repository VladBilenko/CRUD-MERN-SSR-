import authWorkers from "./auth.worker";
import notationWorkers from "./notation.workers";

const workers =  {
    auth: authWorkers,
    notation: notationWorkers
};

export default workers;