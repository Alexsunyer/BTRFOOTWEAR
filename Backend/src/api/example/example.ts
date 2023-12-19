import { Router, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import reportError from '../../utils/reportError'
import { return422IfErrors } from '../../utils/auth'
import { createExample, getExampleInstance, updateExample, getAllExamples, deleteExample } from '../../database/agents/example/ExampleAgent'

const routes = Router()

routes.post('/createExample',
    checkSchema({
        field2: {
            isEmpty: {
                negated: true,
                errorMessage: 'Field 2 required',
            },
        },
        field3: {
            isEmpty: {
                negated: true,
                errorMessage: 'Field 3 required'
            },
        },
    }, ['body']),
    return422IfErrors,
    async (req: Request, res: Response) => {
        try {
            let result = await createExample(req.body)
            return res.status(200).send(result)
        } catch (err: Error | any) {
            return reportError(err, 'API - example - createExample', res)
        }
    }
)

routes.post('/updateExample',
    checkSchema({
        id: {
            isNumeric: true,
            isEmpty: {
                negated: true,
                errorMessage: 'Valid id required'
            }
        }
    }),
    return422IfErrors,
    async (req: Request, res: Response) => {
        try {
            let result = await updateExample(req.body)
            return res.status(200).send(result)
        } catch (err: Error | any) {
            return reportError(err, 'API - example - updateExample', res)
        }
    }
)

routes.post('/getExampleInstance',
    checkSchema({
        id: {
            isNumeric: true,
            isEmpty: {
                negated: true,
                errorMessage: 'Valid id required'
            }
        }
    }),
    return422IfErrors,
    async (req: Request, res: Response) => {
        try {
            let result = await getExampleInstance(req.body.id)
            return res.status(200).send(result)
        } catch (err: Error | any) {
            return reportError(err, 'API - example - getExampleInstance', res)
        }
    }
)

routes.post('/getAllExamples',
    async (req: Request, res: Response) => {
        try {
            let result = await getAllExamples(req.body)
            res.status(200).send(result)
        } catch (err: Error | any) {
            return reportError(err, 'API - example - getAllExamples', res)
        }
    }
)

routes.post('/deleteExample',
    checkSchema({
        id: {
            isNumeric: true,
            isEmpty: {
                negated: true,
                errorMessage: 'Valid id required'
            }
        }
    }),
    return422IfErrors,
    async (req: Request, res: Response) => {
        try {
            let result = await deleteExample(req.body.id)
            res.status(200).send(result)
        } catch (err: Error | any) {
            return reportError(err, 'API - example - deleteExample', res)
        }
    }
)
export default routes