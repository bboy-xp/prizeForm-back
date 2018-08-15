'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/saveAdmin', controller.home.saveAdmin);
  router.post('/adminLogin', controller.home.adminLogin);
  router.post('/addStaff', controller.home.addStaff);
  router.post('/deleteStaff', controller.home.deleteStaff);
  router.post('/getSelectedData', controller.home.getSelectedData);
  router.post('/saveUserData', controller.home.saveUserData);
  router.post('/deleteUserData', controller.home.deleteUserData);
  router.get('/getLinksTableData', controller.home.getLinksTableData);
  router.get('/getOrderTableData', controller.home.getOrderTableData);
  router.get('/getAllStaff', controller.home.getAllStaff);
};
