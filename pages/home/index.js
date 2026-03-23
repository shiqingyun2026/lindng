const { fetchCourseList } = require('../../utils/course')

const HOME_TABS = [
  { key: 'all', label: '全部课程', sort: 'distance' },
  { key: 'recent', label: '最近开课', sort: 'time' }
]

const DEFAULT_LOCATION = {
  latitude: 39.9042,
  longitude: 116.4074,
  name: '北京市 · 默认位置'
}

const resolveLocationLabel = (latitude, longitude) => {
  if (latitude > 22 && latitude < 23 && longitude > 113 && longitude < 115) {
    return '深圳市 · 南山区'
  }

  if (latitude > 39 && latitude < 41 && longitude > 115 && longitude < 117) {
    return '北京市 · 当前定位'
  }

  return '当前位置'
}

Page({
  data: {
    tabs: HOME_TABS,
    activeTab: 'all',
    locationText: '定位中...',
    locationDenied: false,
    locationTip: '',
    courseList: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    initialLoading: true
  },

  onLoad() {
    this.initLocationAndCourses()
  },

  onReachBottom() {
    if (!this.data.hasMore || this.data.loading) {
      return
    }

    this.loadCourseList({
      page: this.data.page + 1
    })
  },

  async onPullDownRefresh() {
    await this.loadCourseList({
      page: 1,
      showLoading: false
    })
    wx.stopPullDownRefresh()
  },

  async initLocationAndCourses() {
    await this.tryGetLocation()
    await this.loadCourseList({
      page: 1
    })
  },

  tryGetLocation() {
    return new Promise(resolve => {
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          const location = {
            latitude: res.latitude,
            longitude: res.longitude,
            name: resolveLocationLabel(res.latitude, res.longitude)
          }

          getApp().setLocation(location)
          this.setData({
            locationText: location.name,
            locationDenied: false,
            locationTip: ''
          })
          resolve(location)
        },
        fail: error => {
          const denied = /auth deny|auth denied|authorize no response|permission/i.test(error.errMsg || '')
          getApp().setLocation(DEFAULT_LOCATION)
          this.setData({
            locationText: DEFAULT_LOCATION.name,
            locationDenied: denied,
            locationTip: denied
              ? '定位未授权，已按默认位置展示课程，可点击顶部定位栏重新定位或手动选择位置。'
              : '定位获取失败，已按默认位置展示课程。'
          })

          wx.showToast({
            title: denied ? '未开启定位，已按默认位置展示' : '定位失败，已切换默认位置',
            icon: 'none'
          })
          resolve(DEFAULT_LOCATION)
        }
      })
    })
  },

  async loadCourseList({ page = 1, showLoading = true } = {}) {
    const app = getApp()
    const currentTab = this.data.tabs.find(item => item.key === this.data.activeTab) || this.data.tabs[0]
    const currentLocation = app.globalData.location || DEFAULT_LOCATION

    this.setData({
      loading: true,
      initialLoading: page === 1 ? showLoading : this.data.initialLoading
    })

    try {
      const result = await fetchCourseList({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        sort: currentTab.sort,
        page,
        pageSize: this.data.pageSize
      })

      this.setData({
        courseList: page === 1 ? result.list : this.data.courseList.concat(result.list),
        page,
        hasMore: result.hasMore,
        initialLoading: false
      })
    } catch (error) {
      wx.showToast({
        title: '课程加载失败，请稍后再试',
        icon: 'none'
      })
      this.setData({
        initialLoading: false
      })
    } finally {
      this.setData({
        loading: false
      })
    }
  },

  handleTabChange(event) {
    const { key } = event.currentTarget.dataset
    if (!key || key === this.data.activeTab) {
      return
    }

    this.setData({
      activeTab: key
    })

    this.loadCourseList({
      page: 1
    })
  },

  async handleLocationTap() {
    if (this.data.locationDenied) {
      wx.showModal({
        title: '定位未授权',
        content: '当前已按默认位置展示课程。你可以在系统设置中开启定位，或后续使用手动选择位置功能。',
        confirmText: '重新定位',
        cancelText: '手动选择',
        success: async res => {
          if (res.confirm) {
            await this.tryGetLocation()
            await this.loadCourseList({
              page: 1
            })
            return
          }

          wx.showToast({
            title: '手动选择位置功能即将上线',
            icon: 'none'
          })
        }
      })
      return
    }

    await this.tryGetLocation()
    await this.loadCourseList({
      page: 1
    })
  },

  handleManualLocationTip() {
    wx.showToast({
      title: '手动选择位置功能即将上线',
      icon: 'none'
    })
  },

  handleCourseTap(event) {
    const { id } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/course/detail/index?id=${id}`
    })
  }
})
