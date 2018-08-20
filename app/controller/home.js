'use strict';

const Controller = require('egg').Controller;
const { readFileSync } = require('fs');
const { resolve } = require('path');

class HomeController extends Controller {
  async index() {
    const data = readFileSync(resolve(__dirname, '../public/index.html'), 'utf8');
    this.ctx.body = data;
  }
  saveAdmin() {
    const ctx = this.ctx;
    const Admin = ctx.model.Admin;
    const admin = new Admin({
      account: 'admin',
      password: '123',
    });
    await admin.save();
    ctx.body = "ok";
  }
  async adminLogin() {
    const ctx = this.ctx;
    const account = ctx.request.body.account;
    const password = ctx.request.body.password;
    // console.log(account, password);
    const Admin = ctx.model.Admin;
    const findAdmin = await Admin.find({ account: account }).sort({ '_id': -1 });
    // console.log(findAdmin);
    if (findAdmin.length !== 0) {
      if (findAdmin[0].password === password) {
        ctx.body = "success";
      } else {
        ctx.body = "fail";
      }
    }else {
      ctx.body = "fail";
    }
  }
  async addStaff() {
    const ctx = this.ctx;
    const Staff = ctx.model.Staff;
    //临时方法: 用表中的长度代替id
    // const getAllStaff = await Staff.find();
    // const id = getAllStaff.length;

    //解决了用length充当id的bug
    const getAllStaff = await Staff.find();
    // console.log(allUserData);
    let id;
    if(getAllStaff.length == 0) {
      id = 0;
    }else {
      id = getAllStaff[0].id + 1;
    }

    const adminId = ctx.request.body.adminId;
    const staffId = ctx.request.body.staffId;
    const formUrl = "http://sxp.topsxp.top:7002/#/form?id=" + id + "&staffId=" + staffId;
    const searchUrl = "http://sxp.topsxp.top:7002/#/admin/staff/search?id=" + id + "&staffId=" + staffId;
    const hasStaff = await Staff.find({staffId: staffId});
    if(hasStaff.length == 0) {
      const staff = new Staff({
        adminId: adminId,
        staffId: staffId,
        id: id,
        formUrl: formUrl,
        searchUrl: searchUrl
      })
      await staff.save();
      ctx.body = "success";
    }else {
      ctx.body = "exist"
    }
  }
  async getLinksTableData() {
    const ctx = this.ctx;
    const Staff = ctx.model.Staff;
    // 根据_id排序
    const allStaffData = await Staff.find().sort({ '_id': -1 });
    ctx.body = allStaffData;
  }
  async saveUserData() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const User = ctx.model.User;
    //解决了用length充当num的bug
    const allUserData = await User.find();
    // console.log(allUserData);
    let num;
    if(allUserData.length == 0) {
      num = 0;
    }else {
      num = allUserData[0].num + 1;
    }
    //判断电话号是否存在
    const hasUser = await User.find({"phoneNum": data.phoneNum});
    if(hasUser.length == 0) {
      const user = new User({
        id: data.id,
        staffId: data.staffId,
        product: data.product,
        phoneCardType: data.phoneCardType,
        name: data.name,
        phoneNum: data.phoneNum,
        province: data.province,
        city: data.city,
        area: data.area,
        address: data.address,
        isAccept: data.isAccept,
        num: num
      });
      await user.save();
      ctx.body = "success";
    }else {
      ctx.body = "exist";
    }
  }
  async getOrderTableData() {
    const ctx = this.ctx;
    const User = ctx.model.User;
    const getAllUser = await User.find().sort({ 'num': -1 });
    // console.log(getAllUser);
    ctx.body = getAllUser;
  }
  async deleteUserData() {
    const ctx = this.ctx;
    // console.log(ctx.request.body);
    const _id = ctx.request.body._id;
    const User = ctx.model.User;
    // 删除操作
    await User.remove({"_id": _id});
    const newGetAlUser = await User.find();
    ctx.body = newGetAlUser;
  }
  async deleteStaff() {
    const ctx = this.ctx;
    // console.log(ctx.request.body);
    const _id = ctx.request.body._id;
    const Staff = ctx.model.Staff;
    // 删除操作
    await Staff.remove({"_id": _id});
    const newGetAlStaff = await Staff.find();
    ctx.body = newGetAlStaff;
  }
  async getSelectedData() {
    const ctx = this.ctx;
    // console.log(ctx.request.body);
    const selectedStaffId = ctx.request.body.selectedStaffId;
    const User = ctx.model.User;
    const getSelectUser = await User.find({"staffId": selectedStaffId});
    ctx.body = getSelectUser;
  }
  async getAllStaff() {
    const ctx = this.ctx;
    // console.log(ctx.request.body);
    const Staff = ctx.model.Staff;
    const getAllStaff = await Staff.find();
    ctx.body = getAllStaff;
  }
}

module.exports = HomeController;
