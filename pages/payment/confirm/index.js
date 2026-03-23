const { fetchCourseDetail, fetchGroupDetail, createMockOrder } = require('../../../utils/course')

Page({
  data: {
    courseId: '',
    groupId: '',
    courseDetail: null,
    groupDetail: null,
    agreementChecked: true,
    loading: true,
    paying: false
  },

  async onLoad(options) {
    this._isAlive = true
    this._timers = []

    const courseId = options.courseId || ''
    const groupId = options.groupId || ''

    this.safeSetData({
      courseId,
      groupId
    })

    await this.loadPageData(courseId, groupId)
  },

  onUnload() {
    this._isAlive = false
    this.clearTimers()
  },

  safeSetData(payload) {
    if (!this._isAlive) {
      return
    }

    this.setData(payload)
  },

  clearTimers() {
    ;(this._timers || []).forEach(timerId => clearTimeout(timerId))
    this._timers = []
  },

  async loadPageData(courseId, groupId) {
    if (!courseId) {
      if (!this._isAlive) {
        return
      }

      wx.showToast({
        title: '课程信息不存在',
        icon: 'none'
      })
      return
    }

    this.safeSetData({
      loading: true
    })

    try {
      const tasks = [fetchCourseDetail(courseId)]
      if (groupId) {
        tasks.push(fetchGroupDetail(groupId))
      }

      const [courseDetail, groupDetail] = await Promise.all(tasks)

      if (!this._isAlive) {
        return
      }

      this.safeSetData({
        courseDetail,
        groupDetail: groupDetail || null
      })
    } catch (error) {
      if (!this._isAlive) {
        return
      }

      wx.showToast({
        title: '支付信息加载失败',
        icon: 'none'
      })
    } finally {
      this.safeSetData({
        loading: false
      })
    }
  },

  handleAgreementChange(event) {
    const values = event.detail.value || []
    this.safeSetData({
      agreementChecked: values.includes('agree')
    })
  },

  async handleConfirmPay() {
    if (!this.data.agreementChecked) {
      wx.showToast({
        title: '请先同意课程服务协议',
        icon: 'none'
      })
      return
    }

    if (this.data.paying) {
      return
    }

    this.safeSetData({
      paying: true
    })

    const order = createMockOrder({
      courseId: this.data.courseId,
      groupId: this.data.groupId,
      totalFee: this.data.courseDetail ? parseInt(this.data.courseDetail.groupPriceFen, 10) : 0
    })

    if (!this._isAlive) {
      return
    }

    this.navigateToPaymentResult('success', order.groupId)

    this.safeSetData({
      paying: false
    })
  },

  handleMockFail() {
    if (!this.data.agreementChecked) {
      wx.showToast({
        title: '请先同意课程服务协议',
        icon: 'none'
      })
      return
    }

    const groupId = this.data.groupId || `mock-group-${this.data.courseId}`
    this.navigateToPaymentResult('fail', groupId)
  },

  navigateToPaymentResult(status, groupId) {
    if (!this._isAlive) {
      return
    }

    wx.redirectTo({
      url: `/pages/payment/result/index?status=${status}&courseId=${this.data.courseId}&groupId=${groupId}`
    })
  }
})
