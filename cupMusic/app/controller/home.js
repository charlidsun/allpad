'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const list = await this.ctx.service.homeService.musicList()
    //this.ctx.body = list;
    await this.ctx.render('index.tpl',{list:list})
  }
}

module.exports = HomeController;
