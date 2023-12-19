import { FindOptions } from 'sequelize'
import db from '../../'
import reportError from '../../../utils/reportError'
import { ExampleModel, ExampleModelAdd } from '../../models/example/Example'


export const createExample = async (params: ExampleModelAdd): Promise<ExampleModel | false> => {
    try {
        const res = await db.Example.create({
            ...params,
        })
        return res
    } catch (err: Error | any) {
        return reportError(err, 'createExample- ExampleAgent')
    }
}

export const getExampleInstance = async (id: number): Promise<ExampleModel | false | null> => {
    try {
        let result = await db.Example.findByPk(id)
        return result
    } catch (err: Error | any) {
        return reportError(err, 'getExampleInstance- ExampleAgent')
    }
}
export const updateExample = async (params: ExampleModelAdd): Promise<boolean> => {
    try {
        if (params.id) {
            let Example = await db.Example.update(
                {
                    ...params
                },
                {
                    where: {
                        id: params.id
                    }
                })
            if (Example[0] > 0) {
                return true
            }
        }
        return false
    } catch (err: Error | any) {
        return reportError(err, 'updateExample- ExampleAgent')
    }
}

export const getAllExamples = async (params: FindOptions): Promise<ExampleModel[] | false> => {
    try {
        return await db.Example.findAll({
            ...params
        })
    } catch (err: Error | any) {
        return reportError(err, 'getAllExamples- ExampleAgent')
    }
}

export const deleteExample = async (id: number): Promise<boolean> => {
    try {
        let Example = await getExampleInstance(id)
        if (Example) {
            await Example.destroy()
            return true
        }
        return false
    } catch (err: Error | any) {
        return reportError(err, 'deleteExample- ExampleAgent')
    }
}