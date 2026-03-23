const { fetchCourseDetail, fetchActiveGroup } = require('../../../utils/course')

const formatRemainingTime = totalSeconds => {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  const formatNumber = value => `${value}`.padStart(2, '0')
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
}

Page({
  data: {
    courseId: '',
    courseDetail: null,
    activeGroup: null,
    loading: true,
    showServiceModal: false
  },

  async onLoad(options) {
    const courseId = options.id || ''
    this.setData({
      courseId
    })

    await this.loadPageData(courseId)
  },

  async loadPageData(courseId) {
    if (!courseId) {
      wx.showToast({
        title: '课程信息不存在',
        icon: 'none'
      })
      return
    }

    this.setData({
      loading: true
    })

    try {
      const [courseDetail, activeGroup] = await Promise.all([
        fetchCourseDetail(courseId),
        fetchActiveGroup(courseId)
      ])

      this.setData({
        courseDetail,
        activeGroup: activeGroup
          ? {
              ...activeGroup,
              remainingTimeText: formatRemainingTime(activeGroup.remainingSeconds),
              progressText: `${activeGroup.currentCount}/${activeGroup.targetCount}`,
              progressPercent: `${(activeGroup.currentCount / activeGroup.targetCount) * 100}%`
            }
          : null
      })
    } catch (error) {
      wx.showToast({
        title: '课程详情加载失败',
        icon: 'none'
      })
    } finally {
      this.setData({
        loading: false
      })
    }
  },

  handlePreviewCertificate(event) {
    const { url } = event.currentTarget.dataset
    const { courseDetail } = this.data

    if (!url || !courseDetail || !courseDetail.coach) {
      return
    }

    wx.previewImage({
      current: url,
      urls: courseDetail.coach.certificates
    })
  },

  handleOpenService() {
    this.setData({
      showServiceModal: true
    })
  },

  handleCloseService() {
    this.setData({
      showServiceModal: false
    })
  },

  handleConfirmService() {
    this.setData({
      showServiceModal: false
    })
  },

  handleGoPayment() {
    const { courseId, activeGroup } = this.data
    const groupId = activeGroup ? activeGroup.groupId : ''

    wx.navigateTo({
      url: `/pages/payment/confirm/index?courseId=${courseId}&groupId=${groupId}`
    })
  }
})
