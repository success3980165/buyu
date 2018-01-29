new Vue({
  el: '#app',
  data: {
    postsId: '',
    result: '',
    hoolaiCmsAPI: new hoolaiCmsAPI(3, true),
    listData: [],
    listName: '',
    more_href: '',
    article_title: '',
    article_time: '',
    article_content: '',
    all: 8, //总页数
    cur: 1, //当前页码
    video_play: false,
    cover: false, //蒙层
    hd_bg: false, //高清图
    isChecked: 1,
    listDataTime: '',
    more1: true,
    hq_pic: '',
    nav_zixun: false,
    nav_xiazai: false,
    dl_bg: false,
    contact_bg: false,
  },
  watch: {
    cur: function(oldValue, newValue) {
      console.log(arguments);
    }
  },
  beforeCreate: function() {
    this.cover = false;
    this.video_play = false;
  },
  created: function() {
    this.cover = false;
    this.video_play = false;
    this.initData();

  },
  computed: {
    indexs: function() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2
          right = this.cur + 2
        } else {
          if (this.cur <= 3) {
            left = 1
            right = 5
          } else {
            right = this.all
            left = this.all - 4
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    dlbgUp: function() {
      this.cover = true;
      this.dl_bg = true;
    },
    dlbgOff: function() {
      this.cover = false;
      this.dl_bg = false;
      this.contact_bg = false;
    },
    //导航
    zixunUp: function() {
      this.nav_zixun = true
    },
    zixunClose: function() {
      this.nav_zixun = false
    },
    zixinUpOn: function() {
      this.nav_xiazai = true
    },
    zixunCloseOff: function() {
      this.nav_xiazai = false
    },
    //视频播放
    videoClick: function() {
      this.video_play = true
      this.cover = true
    },
    //视频关闭
    videoClose: function() {
      this.video_play = false
      this.cover = false
      this.hd_bg = false
    },
    expect: function() {
      this.cover = true;
      this.contact_bg = true;
    },
    expectOff: function() {
      this.cover = false;
      this.contact_bg = false;
    },
    //高清图
    // showGQ: function(num) {
    //   // this.hd_bg = true
    //   // this.cover = true
    //   // console.log(num)
    //   // debugger
    //   // if (num == 1) {
    //   //   this.hq_pic = "img/homepage/bottomD_1pic.jpg"
    //   // } else if (num == 2) {
    //   //   this.hq_pic = "img/homepage/bottomD_2pic.jpg"
    //   // } else if (num == 3) {
    //   //   this.hq_pic = "img/homepage/bottomD_3pic.jpg"
    //   // } else if (num == 4) {
    //   //   this.hq_pic = "img/homepage/bottomD_4pic.jpg"
    //   // } else if (num == 5) {
    //   //   this.hq_pic = "img/homepage/bottomD_5pic.jpg"

    //   // }
    // },
    //关闭高清图
    closeHd: function() {
      this.cover = false
      this.hd_bg = false
    },
    btnClick: function(indexVal) { //页码点击事件
      console.log(indexVal);
      if (indexVal != this.cur) {
        this.cur = indexVal
      }
      this.goGetList(this.listName, indexVal);
    },
    // pageClick: function() {
    //   var num = this.cur;
    //   this.goGetList('最新', num);
    //   // console.log('现在在' + this.cur + '页');
    // },
    initData: function() {
      var that = this;
      var tag = window.location.hash.substr(1);
      console.log(tag);

      var locationHrefArr = window.location.href.split("#");
      if (locationHrefArr.length == 1) {
        that.goGetList('最新', 1);
      } else {
        if (tag == 442) { // 二级页
          that.goGetList('最新', 1);
        } else if (tag == 441) {
          that.goGetList('新闻', 1);
        } else if (tag == 440) {
          that.goGetList('公告', 1);
        } else if (tag == 443) {
          that.goGetList('活动', 1);
        } else if (tag == 445) {
          that.goGetList('游戏资料', 1);
        } else if (tag == 444) {
          that.goGetList('游戏攻略', 1);
        } else if (tag == 446) {
          that.goGetList('攻略', 1);
        } { // 文章页
          that.goGetById(tag);
        }
      }

    },
    clean: function() {
      this.result = "";
    },
    goGetList: function(str, num, curVal) {
      if (curVal) {
        this.cur = curVal;
      }
      if (str == '最新') {
        this.isChecked = 1; //添加class样式
        this.more_href = 'newsInformation.html#' + '442'
        console.log(this.in)
      } else if (str == '新闻') {
        this.isChecked = 2;
        this.more_href = 'newsInformation.html#' + '441'
      } else if (str == '公告') {
        this.isChecked = 3;
        this.more_href = 'newsInformation.html#' + '440'
      } else if (str == '活动') {
        this.isChecked = 4;
        this.more_href = 'newsInformation.html#' + '443'
      } else if (str == '攻略') {
        this.isChecked = 5;
        this.more_href = 'newsInformation.html#' + '446'
      } else if (str == '游戏资料') {
        this.more_href = 'newsList.html#' + '445'
      } else if (str == '游戏攻略') {
        this.more_href = 'newsList.html#' + '444'
      }

      var that = this;
      that.clean();
      var params = {};
      // 1: 获取推荐的文章
      // params.isRecommend = 1;
      // 2: 获取某个类型的所有文章
      params.categoryName = str;
      // 3: 分页 page 默认显示第1页
      // params.page = 1;
      params.page = num;
      // 4: 每页显示多少个 默认10个
      params.rows = 5;
      that.listName = str;


      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        if (listData.length < 5 && num == 1) {
          that.more1 = false;
        } else {
          that.more1 = true;
        }

        that.listData = result.rows;
        console.log(that.listData)


        listData.forEach(function(item) {
          item.listDataTime = moment(item.updated).format('YYYY-MM-DD');
          item.hrefVal = 'article.html#' + item.id;
        })

        // 总页数
        that.all = Math.ceil(result.total / params.rows);
      })
    },
    goGetById: function(articleTag) {
      var that = this;
      that.clean();
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        // console.log(JSON.stringify(result));
        // that.result = JSON.stringify(result);
        that.article_title = result.data.title;
        that.article_time = result.data.updated;
        that.article_content = result.data.content;
      }, 'json')
    },
  }
})