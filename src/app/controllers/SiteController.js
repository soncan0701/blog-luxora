const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /Home
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    isHomePage: true, 
                });
            })

            .catch(next);
    }
   
    


    mapsearch(req, res, next) {
        // Dùng res.render để hiển thị file handlebars 'map.hbs'
        res.render('map'); 
    }
    matbang(req, res, next) {
        // Dùng res.render để hiển thị file handlebars 'map.hbs'
        res.render('matbang'); 
    }
    tienich(req, res, next) {
        // Dùng res.render để hiển thị file handlebars 'map.hbs'
        res.render('tienich'); 
    }
    giaban(req, res, next) {
        // Dùng res.render để hiển thị file handlebars 'map.hbs'
        res.render('giaban'); 
    }
    tiendo(req, res, next) {
        // Dùng res.render để hiển thị file handlebars 'map.hbs'
        res.render('tiendo'); 
    }
    lienhe(req, res, next) {
        // Dùng res.render để hiển thị file handlebars 'map.hbs'
        res.render('lienhe'); 
    }
}

module.exports = new SiteController();
