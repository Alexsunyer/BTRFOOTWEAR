import fs from 'fs'
import { Response } from 'express'
const reportError = (err: Error, nameFunction: string, res?: Response): any => {
    try {
        let datetime = new Date()
        let day = ('0' + datetime.getDate()).slice(-2) + '-' + ('0' + (datetime.getMonth() + 1)).slice(-2) + '-' + ('0' + datetime.getFullYear()).slice(-2)
        let filepath = 'logs/' + day + '.log'
        let hour = ('0' + datetime.getHours()).slice(-2) + ':' + ('0' + datetime.getMinutes()).slice(-2) + ':' + ('0' + datetime.getSeconds()).slice(-2)
        let error = '[' + hour + ' - ' + nameFunction + '] Error : ' + err + '\n'
        let lines = 1
        fs.openSync(filepath, 'a')
        fs.appendFileSync(filepath, error)
        if (res) {
            return res.status(422).json({
                errors: [{
                    value: "Error",
                    msg: 'Uknown error ' + '#' + (lines + 100),
                    param: "support",
                    location: "body"
                }]
            });
        }
        throw new Error('Uknown error') 
    } catch (err: Error | any) {
        if(res){
            return res.status(422).json({
                errors: [{
                    value: "Error",
                    msg: 'Uknown error',
                    param: "support",
                    location: "body"
                }]
            });
        }
        throw new Error('Uknown error') 
    }
}
export default reportError