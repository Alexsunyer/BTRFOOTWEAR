const db = require('../database/environment').default
const checkConection = require('../database/environment').checkConection
test('Check database connection', async () => {
    const conn = await checkConection()
    expect(conn).toBe(true)
})
test('sync dbb', async () => {
    await db.sequelize.sync({ force: true })
    expect(test).not.toBe(null)
})