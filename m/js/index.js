new Vue({
  el: '#app',
  data: {
    hoolaiCmsAPI: new hoolaiCmsAPI(3, false),
    listData: [],
    listName: '',
    more_href: '',
    zuixin: false,
    xinwen: false,
    gonggao: false,
    gonglue: false,
    huodong: false,
    article_title: '',
    article_content: '',
    article_time: '',
    clickNum: 1,
    download_url: ''
  },
  created: function() {
    if (isMobile.apple.device) {
      this.download_url = 'https://itunes.apple.com/cn/app/id1239313319'
    }
    if (isMobile.android.device) {
      this.download_url = 'http://huleshikongres-10034783.cossh.myqcloud.com/newjjfishing/res/xinjiejibuyu18.apk'
    }
    this.initData();
  },
  methods: {
    initData: function() {
      var that = this;
      var tag = window.location.hash.substr(1);
      console.log(tag)
      var locationHrefArr = window.location.href.split("#");

      if (locationHrefArr.length == 1) {
        // 首页
        that.goGetList('最新', 1);
      } else {
        console.log('二级页')
        // 二级页
        if (tag == 'zuixin') {
          that.goGetList('最新', 1, 5);
        } else if (tag == 'xinwen') {
          that.goGetList('新闻', 1, 5);
        } else if (tag == 'gonggao') {
          that.goGetList('公告', 1, 5);
        } else if (tag == 'gonglue') {
          that.goGetList('攻略', 1, 5);
        } else if (tag == 'huodong') {
          that.goGetList('活动', 1, 5);
        } else {
          console.log('三级页')
          // 三级页
          that.goGetByID(tag);
        }
      }

    },
    goGetList: function(str, num, rows, cNum) {
      var that = this;
      if (cNum){
        that.clickNum = cNum
      }
      console.log(that.clickNum)
      if (str == '最新') {
        that.more_href = 'list.html#' + 'zuixin';
        that.listName = '最新';
        that.zuixin = true;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '新闻') {
        that.more_href = 'list.html#' + 'xinwen';
        that.listName = '新闻';
        that.zuixin = false;
        that.xinwen = true;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '公告') {
        that.more_href = 'list.html#' + 'gonggao';
        that.listName = '公告';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = true;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '攻略') {
        that.more_href = 'list.html#' + 'gonglue';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = true;
        that.huodong = false;
        that.listName = '攻略';
      } else if (str == '活动') {
        that.more_href = 'list.html#' + 'huodong';
        that.zuixin = false;
        that.listName = '活动';
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = true;
      }

      var params = {};
      // 1: 获取推荐的文章
      // params.isRecommend = 1;
      // 2: 获取某个类型的所有文章
      params.categoryName = str;
      // 3: 分页 page 默认显示第1页
      // params.page = 1;
      params.page = num;
      // 4: 每页显示多少个 默认10个
      if (rows) {
        params.rows = rows;
      } else {
        params.rows = 3;
      }
      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        listData.forEach(function(item) {
          item.updated = item.created.substr(0, 10);
          item.hrefVal = 'article.html#' + item.id;
        })
        that.listData = listData;
        console.log(that.listData);
      })
    },
    showMore: function(){
      var that = this;
      that.clickNum = that.clickNum + 1;
      if (that.zuixin === true) {
        // 最新
        that.goGetList('最新', 1, 5*(that.clickNum))
      }else if (that.xinwen === true) {
        // 新闻
        that.goGetList('新闻', 1, 5*(that.clickNum))
      }else if (that.gonggao === true) {
        // 公告
        that.goGetList('公告', 1, 5*(that.clickNum))
      }else if (that.gonglue === true) {
        // 攻略
        that.goGetList('攻略', 1, 5*(that.clickNum))
      }
      else if (that.huodong === true) {
        // 活动
        that.goGetList('活动', 1, 5*(that.clickNum))
      }
    },
    goGetByID: function(articleTag) {
      var that = this;
      console.log(articleTag);
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        that.article_title = result.data.title;
        that.article_time = result.data.updated;
        that.article_content = result.data.content;
      }, 'json')
    },
    goBack: function(){
      window.history.back();
    }

  }
})
