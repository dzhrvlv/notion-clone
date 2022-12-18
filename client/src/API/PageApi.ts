import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class PageApi {
    async getPageById(id: string) {
        return await axios.get(`${url}/api/blocks/pages/${id}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
            })
    }

    async createPage() {
        return await axios.post(`${url}/api/blocks/pages/create`, null, AuthorizationHeaderConfig)
            .then(res => {
                //console.log(res.data);
                return res.data

            }).catch(e => {
                console.log(e)
            })
    }

    async editPageById(id: string, values: any) {
        return await axios.put(`${url}/api/blocks/pages/${id}`, values, AuthorizationHeaderConfig)
            .then(res => {
                return res.data.page
            })
            .catch(e => {
                console.log(e)
            })
    }

    async deletePageById(id: string) {
        return await axios.delete(`${url}/api/blocks/pages/${id}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
            })
    }

}

export default new PageApi()
