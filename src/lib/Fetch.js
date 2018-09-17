import Utils from './utils'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.defaults.headers.token = sessionStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJvcmdJZFwiOlwiaGVuYW56aG9uZ3lhblwiLFwiYXBwaWRcIjpcInd4NGExOTMzMGEwYzRjODE2Y1wiLFwib3BlbmlkXCI6XCJvVjMybDBWaWtZOHNQRkFRRXhUTHd3UjRzeE13XCIsXCJ1bmlvbmlkXCI6XCJvRmpVTHdDejZPQnd3LU9tOWUwTXJGaGxnTVNzXCIsXCJsb2dpblRpbWVcIjoxNTM3MTc1OTYwOTQ2LFwidGFnXCI6XCIxNTM3MTc1OTU1Mzc1NkFHOTFaMlhCT05WWUlDXCIsXCJ1c2VySWRcIjoxNTM2MDU0OTU5Mjc2MjM2NzN9IiwiZXhwIjoxNTM3NDM1MTYwfQ.fK0V3TrtG3uyQIazn0oeQgU9Eq_ykhubHrCdeZGQvaU';

function formatRequest(method, url, data) {
    if (method === 'get') {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: url,
                cancelToken: source.token,
                params: data
            }).then(res => {
                if (res.status == 200 && res.data != null) {
                    resolve(res.data)
                }
            }).catch(e => {
                reject(e)
                    // Message.error()
            })
        })
    } else if (method === 'post') {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: url,
                cancelToken: source.token,
                data: qs.stringify(data)
            }).then(res => {
                if (res.status == 200 && res.data != null) {
                    resolve(res.data)
                }
            }).catch(e => {
                reject(e)
                    // Message.error()
            })
        })
    }
}

const Fetch = {
    get(url, query) {
        return formatRequest('get', url, query)
    },
    post(url, data) {
        return formatRequest('post', url, data)
    }
}

export default Fetch