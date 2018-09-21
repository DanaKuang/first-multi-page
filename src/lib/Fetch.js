import Utils from './utils'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.defaults.headers.token = sessionStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJvcmdJZFwiOlwiaGVuYW56aG9uZ3lhblwiLFwiYXBwaWRcIjpcInd4NGExOTMzMGEwYzRjODE2Y1wiLFwib3BlbmlkXCI6XCJvVjMybDBid09lTVlYZ1F5elZFRERsNzNRZEVZXCIsXCJ1bmlvbmlkXCI6XCJvRmpVTHdJdUkyYXJvZVRLNEtMQk5YWmNSd21JXCIsXCJsb2dpblRpbWVcIjoxNTM3NDQyMDIxNzEzLFwidGFnXCI6XCIxNTM3NDQyMDE2Njc4NUpHS0xRUEdDTDFHT0Y2XCIsXCJ1c2VySWRcIjoxNTM3MTgyNDgwNzc0NzY3MDd9IiwiZXhwIjoxNTM3NzAxMjIxfQ.MXunn2n-3tVV7lehNumcaICg1RlRFvzfzcOi11XSWGY';

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