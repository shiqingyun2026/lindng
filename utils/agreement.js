const userAgreementNodes = [
  {
    name: 'div',
    attrs: {
      style: 'margin-bottom: 32rpx;'
    },
    children: [
      {
        name: 'h3',
        attrs: {
          style: 'margin-bottom: 16rpx; font-size: 32rpx; font-weight: 700; color: #1f2329;'
        },
        children: [{ type: 'text', text: '一、服务说明' }]
      },
      {
        name: 'p',
        attrs: {
          style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
        },
        children: [
          {
            type: 'text',
            text: '邻动体适能小程序当前为测试阶段占位协议内容，后续将替换为正式《用户协议》。用户在使用课程浏览、报名、拼团等服务前，应先完整阅读并确认同意本协议。'
          }
        ]
      },
      {
        name: 'p',
        attrs: {
          style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
        },
        children: [
          {
            type: 'text',
            text: '在正式版本中，这里将补充平台服务范围、用户账号规则、订单与支付条款、退款说明、知识产权及争议解决条款。'
          }
        ]
      }
    ]
  },
  {
    name: 'div',
    attrs: {
      style: 'margin-bottom: 32rpx;'
    },
    children: [
      {
        name: 'h3',
        attrs: {
          style: 'margin-bottom: 16rpx; font-size: 32rpx; font-weight: 700; color: #1f2329;'
        },
        children: [{ type: 'text', text: '二、用户义务' }]
      },
      {
        name: 'ul',
        attrs: {
          style: 'padding-left: 32rpx;'
        },
        children: [
          {
            name: 'li',
            attrs: {
              style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
            },
            children: [{ type: 'text', text: '需确保提交的信息真实、准确、完整。' }]
          },
          {
            name: 'li',
            attrs: {
              style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
            },
            children: [{ type: 'text', text: '应合理使用小程序，不得进行影响平台安全或正常运营的行为。' }]
          },
          {
            name: 'li',
            attrs: {
              style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
            },
            children: [{ type: 'text', text: '下单、拼团、支付等行为将以后续正式协议和平台规则为准。' }]
          }
        ]
      }
    ]
  }
]

const privacyPolicyNodes = [
  {
    name: 'div',
    attrs: {
      style: 'margin-bottom: 32rpx;'
    },
    children: [
      {
        name: 'h3',
        attrs: {
          style: 'margin-bottom: 16rpx; font-size: 32rpx; font-weight: 700; color: #1f2329;'
        },
        children: [{ type: 'text', text: '一、信息收集范围' }]
      },
      {
        name: 'p',
        attrs: {
          style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
        },
        children: [
          {
            type: 'text',
            text: '当前展示内容为《隐私政策》占位文本，后续将替换为正式版本。为实现登录、定位、拼团、支付与客服能力，平台可能收集昵称头像、手机号、地理位置、订单信息等必要数据。'
          }
        ]
      }
    ]
  },
  {
    name: 'div',
    attrs: {
      style: 'margin-bottom: 32rpx;'
    },
    children: [
      {
        name: 'h3',
        attrs: {
          style: 'margin-bottom: 16rpx; font-size: 32rpx; font-weight: 700; color: #1f2329;'
        },
        children: [{ type: 'text', text: '二、信息使用与保护' }]
      },
      {
        name: 'p',
        attrs: {
          style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
        },
        children: [
          {
            type: 'text',
            text: '平台仅在实现产品功能、履行法律义务与提升服务体验的范围内使用信息，并会在正式版本中补充保存期限、第三方共享、用户查询更正删除等条款。'
          }
        ]
      },
      {
        name: 'p',
        attrs: {
          style: 'margin-bottom: 16rpx; color: #3c4655; line-height: 1.8;'
        },
        children: [
          {
            type: 'text',
            text: '如用户不同意本政策，则无法继续使用需要信息处理支持的小程序核心能力。'
          }
        ]
      }
    ]
  }
]

module.exports = {
  userAgreementNodes,
  privacyPolicyNodes
}
