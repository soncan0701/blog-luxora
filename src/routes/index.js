const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const mapRouter = require('./map');
const matbangRouter = require('./matbang');
const tienichRouter = require('./tienich');
const giabanRouter = require('./giaban');
const tiendoRouter = require('./tiendo');
const lienheRouter = require('./lienhe');
const customerRouter = require('./customer');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/vi-tri', mapRouter);
    app.use('/mat-bang', matbangRouter);
    app.use('/tien-ich', tienichRouter);
    app.use('/gia-ban', giabanRouter);
    app.use('/tien-do', tiendoRouter);
    app.use('/lien-he', lienheRouter);
    app.use('/', siteRouter);
    app.use('/customer', customerRouter); 

    // app.get('/news', (req, res) => {
    //   res.render('news');
    // });

    app.post('/search', (req, res) => {
        console.log(req.body);
        res.send('');
    });
}
module.exports = route;
