before(async () => {
    const app = await setupApp();
    global.app = app;
    global.request = sutertest(app)
})

after(async () => await app.database.connection.close());