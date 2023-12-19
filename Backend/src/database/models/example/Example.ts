import Sequelize, { Model, BuildOptions } from 'sequelize'

/*
 *
 * Typescript Models
 *
*/

export interface ExampleModelAdd {
    id?: number
    field1?: string
    field2?: number
    field3?: string
}

export interface ExampleModelType {
    id: number
    field1?: string
    field2: number
    field3: string
}

/*
 *
 * Typescript Properties
 *
*/

export type ExampleModel = ExampleModelType & Sequelize.Model & {
}

export type ExampleModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ExampleModel;
} & { associate: any }

/*
 *
 * Database model
 *
*/
const ExampleFactory = (sequelize: Sequelize.Sequelize): ExampleModelStatic => {
    const Example = <ExampleModelStatic>sequelize.define('Example', {
        field1: {
            type: Sequelize.TEXT
        },
        field2: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        field3: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
    },
    {
        name: {
            singular: 'Example',
            plural: 'Examples'
        },
        modelName: 'Example'
    })

    /*
    *
    * Relations
    *
    */
    Example.associate = () => {
    }

    return Example
}


export default ExampleFactory