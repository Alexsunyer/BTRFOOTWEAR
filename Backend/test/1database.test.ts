import db, { checkConection } from '../src/database/'

test('Check database connection', async () => {
    const conn = await checkConection()
    expect(conn).toBe(true)
})
test('sync dbb', async () => {
    await db.sequelize.sync({ force: true })
    expect(test).not.toBe(null)
})