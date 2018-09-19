import Utils from './utils'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.defaults.headers.token = sessionStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJvcmdJZFwiOlwiaGVuYW56aG9uZ3lhblwiLFwiYXBwaWRcIjpcInd4NGExOTMzMGEwYzRjODE2Y1wiLFwib3BlbmlkXCI6XCJvVjMybDBmT0NlUVpuU0swaVFjRTZ6c3BPckF3XCIsXCJ1bmlvbmlkXCI6XCJvRmpVTHdPbTA4RnNSWGNRNUJaRk4zWHNqU0Z3XCIsXCJsb2dpblRpbWVcIjoxNTM3MzU3NjY3NzE3LFwidGFnXCI6XCIxNTM3MzU3NjY0MzYzWFIyUk5SNVE3MTRWTk5ZXCIsXCJ1c2VySWRcIjoxNTM3MzQyODY5MTU4NzkwODl9IiwiZXhwIjoxNTM3NjE2ODY3fQ.WOoXl_leG0c30hwQzH3deTWJmq9PPAgi4F6yk9ca84E';

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