import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../config/config";

class RowApi {
    async getRowById(id: string) {
        return await axios.get(`${url}/api/blocks/rows/${id}`, AuthorizationHeaderConfig)
            .then(res => {
                return res.data
            })
            .catch(e => {
                console.log(e)
            })
    }

    async createRow(object: string = "text", index: string, parentId: string) {
        return await axios.post(`${url}/api/blocks/rows/create`, {object, index, parentId}, AuthorizationHeaderConfig)
            .then(res => {
                console.log(res.data);
                return res.data
            }).catch(e => {
                console.log(e)
            })
    }

    async editRowById(id: string, values: any) {
        return await axios.put(`${url}/api/blocks/rows/${id}`, values, AuthorizationHeaderConfig)
            .then(res => {
                return res.data.page
            })
            .catch(e => {
                console.log(e)
            })
    }

    async deleteRowById(rowId: string) {
        return await axios.delete(`${url}/api/blocks/rows/${rowId}`, AuthorizationHeaderConfig)
            .then(res => {
                // console.log(res.data)
                return res.data
            })
            .catch(e => {
                console.log(e)
            })
    }

}

export default new RowApi()
