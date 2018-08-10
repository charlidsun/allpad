const Service = require('egg').Service

class HomeService extends Service {
    async musicList (){
        const list = await this.app.mysql.select('song')
        return list
    }
}
module.exports = HomeService