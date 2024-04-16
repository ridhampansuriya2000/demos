
const BACKEND_BASE_URL = process.env.API_BASE_URL;

const fetchData = async ({ method = 'GET', endPoint, header = {}, onSuccess = e => e, onFail = e => e, payload = null, token='' }) => {


    try {
        const url = `${BACKEND_BASE_URL}${endPoint}`;
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':  `Bearer ${token}`,
                ...header
            }
        };

        if (method !== 'GET' && method !== 'HEAD') {
            options.body = JSON.stringify(payload);
        }

        const response = await fetch(url, options);

        let result = await response.json();
        onSuccess(result);
        return {...result, statusCode : result?.statusCode ? result?.statusCode : response?.status};
    } catch (error) {
        onFail(error);
        console.log("error in https action", error);
        // throw new Error(error); // rethrow the caught error
    }
};

export default fetchData;
