import { Course, Coach, GroupBuy } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: '儿童基础体能训练（3-6岁）',
    description: '课程涵盖跑、跳、钻、爬等多项基础动作训练，旨在提高3-6岁儿童的灵敏性、协调性及爆发力。通过科学的阶梯式教学，让孩子在快乐中强健体魄。',
    price: 99,
    originalPrice: 199,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlUadbFZasq8TN5J12TNHoOjEybUnKJivu-WRsEn2C24zsFOuDLJZQCHqL0G-ubT9IPpO9IcT-ao0R1iZlp-IkOXPuiweFxyz779B9P-JjFd3sM0c_68wOus31VyEyTYELa47qb7qLMTVseq8_IQwQSXc5otLQgHpAzakKmb8lK4KkayyVlFdW0S-L_emsKlSQVVJ_TD1sEn9P2I6RGGajIPcUU9-J0V2u29CrX_3-vW11wrZVBiJdiRqusXF1NIrgIYSI2-34yvw',
    tags: ['限时特惠'],
    time: '每周六 10:00-11:30',
    ageRange: '3-6 周岁',
    location: '朝阳区奥森北园少儿体能中心',
    distance: '1.2km',
    groupSize: 5,
    currentJoined: 2,
    isHot: true,
    modules: [
      {
        id: 'm1',
        title: '模块一：灵敏性协调训练',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe2MjjqFq6HVg0JUzYTOWqYZdS1sjy5j9EFuimHShlOYYwrAubmgmaO95ugRjZGovz35D5mgRktPkX9V7tpgCewVfI3oNUAZZWlnW72jVxcxvmBAnhqM706auJx32qXAX8jQMhC-SJSW1nLALgyl1ouJ8VViAQ_QpG_bAybUdYAux5HU4aDYTn1PUZSc85vdhggHYzkUMMZpeR2q2Qm-lsz9pNag7h5YcMftwgKmq1tQnDqBPE_6-STtfLpFglTunPDvIqRwDarFU'
      },
      {
        id: 'm2',
        title: '模块二：平衡感与专注力',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2WKsF9XAkgUMwzWBL2Oy1k_7lp-wBfiOo64xitVfPCRMOQ-HcOgovBivy7tJnXROahpYqqLULUh-GAF05EGkX035VW_oAdhvhn9ULn23rm4V7dLD6gRo19CaSH-ZO7JXZq0kFAwNbJBO8gvOK4D_TKwlVETZiCbFq68SN4XQggYSY830Xn1lcb99XQWUQwlOAbrKaKVe26AqRchPJrth2SR6r9IVllxz1FT7n3Bahsr6nEwoyJ3JYnRM3M3GGMIt1wun9t2Jc0k4'
      }
    ]
  },
  {
    id: '2',
    title: '少儿户外体能·基础开发课',
    description: '在自然环境中进行体能训练，呼吸新鲜空气，提升免疫力。',
    price: 99,
    originalPrice: 199,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHWMTbCRRw2Ki7UAXlyFAglJRL-XITJRhOe4QN650vCrtrPLaG3X1SJajfsUfiukzvsxEcL3TAWSQq4lmEkylM3cLd6TvOM3mRpEFfZQRGKkPRcYcBBQ1H98Sp8lKsMaVh7fEFf_cXxJH2bRoni_6cRbJ4yiuIVEOQAJlA-RO79JAXoVyi1yEvU6Rcge_mJ1k82EjOa5trA1wGOW-fs28jQWcSnf4WILLyy1dgSZ7EVyWLxkzQQAxFVSFpCXHWx7p7qQ_rKyqbgy0',
    tags: ['即将成团'],
    time: '3月25日 周六 10:00-11:00',
    ageRange: '4-8 周岁',
    location: '阳光花园 中心广场',
    distance: '1.2km',
    groupSize: 5,
    currentJoined: 3,
    isHot: true,
    modules: []
  },
  {
    id: '3',
    title: '亲子趣味运动会·周末特辑',
    description: '家长与孩子共同参与，增进亲子关系，享受运动乐趣。',
    price: 129,
    originalPrice: 299,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMlYrcUKCiDUmLaui0nnX_NDske5qpMLBXmsnTi5we6DqCV7Kt9SyeC6-JyPq_lbP-gaSlwnIZPfb9P2VhFtjCYYFy7Lfe8pqF3-GkAv7dv-fMAdh2pAB--wXXaPV6N-0eudEidQn-qvybEHVKbyshb8a5j3TlaRTkVU0H78Lk9A6eDHwNQ7IM3L8RSpRDh2JxKymoDWsFrcQPR7UMa8Afp_ccAIVuItpKZrg79vT3yIUxuvwcBYBpuRjVXVR7Ag2MhQwa0sRUbuA',
    tags: [],
    time: '3月26日 周日 15:30-16:30',
    ageRange: '3-10 周岁',
    location: '香蜜湖 体育公园',
    distance: '0.8km',
    groupSize: 3,
    currentJoined: 1,
    modules: []
  },
  {
    id: '4',
    title: '田径速度专项·冠军公开课',
    description: '由专业田径教练指导，提升爆发力与奔跑速度。',
    price: 159,
    originalPrice: 399,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcdPcSXwpw4AB98JFpx1mQw4t4kQCGanEe-UWPn3JgD5xr_wPrBav7z_WnE7_SnnIl4lQl4BJAmGJV0jwnmn-eluNRHuNJEAL5DXUb8TwfCxrdG3cPOQmOo9J9oMi21hq354dKi0kZcnYbPXdXruB4OHFzLD9EWjRV03eTgtXcgXvMVSnZnPu52iGdjuWxHmA8RNNIcfb5w5wtOa1bK9BqA3rT9LFyY6QvMQ0gvLjDShbkzQz9C2YogduoPXW6AnagkRwekoXolGo',
    tags: ['名师指导'],
    time: '4月1日 周六 09:00-10:30',
    ageRange: '6-12 周岁',
    location: '大运中心 体育场区',
    distance: '2.5km',
    groupSize: 8,
    currentJoined: 5,
    isExpert: true,
    modules: []
  }
];

export const COACH: Coach = {
  id: 'c1',
  name: '王老师',
  title: '国家二级运动员',
  bio: '5年儿童体能教学经验，曾获市级青少年篮球赛优秀指导员。擅长通过游戏激发孩子运动兴趣。',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE14AYuWgMddrh6CL_zHsM-ItDqdvRgY7Vv8v8BiiFAUCIRQXG237Byq7H71nIOSXy1bDOB7iQJdzzWeZuoHNTMgYTNnsCdTzkZiaFZaJ00BJyzwZkZSK9fWLhEgvamPaqEpcE5FVhESM8Ck_0KwlG7zTMlPGhHqICuQiWPy-FkNE5r6TIz4bNoRBdz8k0xP82RtzVD9CNjhupzZZCGmMYX1xqDLfYohaT4M61Twx2hpCL3260Wtl0wu13u_-_zF4jQN-HohTL6CA',
  certificates: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuABvJG9V6gQdti8AhTTgGasjU1F9lWrZQYofBlY6yZGbJ17nYiJFwU0y11FXByghSyJ-JHHOqI6kkPPwX45rorxkIddW93axsi_1bmpvW5sWPMFmvh1s8PMJkqEyOIn5ERrTDtsW6QYMUdi4wcRLw94Jrdaczf1nGVB7UjobKQ2juzJ0DtsLseJp3zc5QpFtD5Bbkw-0jeHki58AOhxVve_FgWva3FBW0m9SZyNB6Pi8P8NEFwWy2HWcsu7cM1PzvT034ZBlq7cQ34',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCgOQk0UBlUer42kPsqXeyPyG6CpBDn3UIiNteHV-98Xq4T5ixe4kfDbOdOx0MThAeUIXQiljFfi9Ejjx4vic9EMOl1rAQx0ahYAUc5-vn34pvkpgh3Gde3UAFHhLOjxxQCGEVCKG1i4ox0-K2vS6AWvBwg8d3WpA_flqEA3ofAt4oBwK545_bnC7PpVUqhipoFtrlwOp3W3BKhYsnCqxxhRPkwOVKR-uouU_m82YaSCspboMBhubZlpydetLOf4taAPJUucW8NT2k'
  ]
};

export const MY_GROUP_BUYS: GroupBuy[] = [
  {
    id: 'gb1',
    courseId: '1',
    courseTitle: '青少年体适能基础课 (周末班)',
    courseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu5sCVTZ3VQXrzqjuzWH9JEj-ude-vN8aVL2RQ_4okr_DIbvBgUakPNaunojSbjlN2COaMiUHK3Z-AX_-7wWp4a59fhTL33MnPCCG3jQcxjK7HJ1gzxgRCQ_p3EKL-p28r3iw8YxQaRFK505CXukfWTfC0azC-Hsew2U6htKZ0SKOl-1DFsgIhotJZ03-xhGaOSh_OUR4BgNdR_iwKxkJfLfN5cpTuf9bbuEd8jfLN_boE0B7A8k21SYO1z1wKbcOgQ152w3SDiYA',
    status: 'ongoing',
    targetCount: 3,
    currentCount: 2,
    endTime: new Date(Date.now() + 86400000).toISOString(),
    leaderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlFCVHJTNvvCvSIDN4OaeGn5RSvKUJ-VRPIFjqzgA94A5SEIGYEs8PkZomMiN5RYHiPVDU5LNKTkuN3SXeo6_X1d9E_iCKQ0P-3qUQ4ATbwvSyvrlfQUr_41OqaEm4CmRH94LrSjgpEWc3LvoTDVv8STCLiogBatMR3DN-vbWqUqvZ3IdivG1fcCsq3ao_tnnoNluL-E_NIIp0Zi34i9s_dSLWqwBadeCqauqddxORdqRmiLWZHAwtg1lcAX5YjJCO28xLkHgPHIQ',
    participants: [],
    price: 99,
    originalPrice: 299,
    coachName: '李嘉豪'
  },
  {
    id: 'gb2',
    courseId: '2',
    courseTitle: '少儿引体向上专项提升课',
    courseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFPCmFT8AU2rhByFX_-Z_AynGSC3sM-SH0mI10h71E6WKIAl3yAEdDhQgTkYqUgYbS78G-PGPIOi8t9fJYUkxzbhatpO-7PzVkcnWalFBsTJpKj4M4yfP6PT3CVeFUg66AsxSUkaLH7uLZWxBleUQRiQTWQCkGmZbpEESYerMoaJThCCQNchyHAwtzXBCLBxdKPF8N6umwsM9z47x2FEqUV7L-LSLjx1EOO0t-O3Zi7MR1q8ZnBpLIr2-Q0-OR60gu4ltD42-YAwI',
    status: 'completed',
    targetCount: 3,
    currentCount: 3,
    endTime: new Date(Date.now() - 86400000).toISOString(),
    leaderAvatar: '',
    participants: [],
    price: 199,
    originalPrice: 299,
    startTime: '2023-11-20'
  },
  {
    id: 'gb3',
    courseId: '3',
    courseTitle: '亲子户外趣味体能营 (秋季特辑)',
    courseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArnORTYS256LZn0TGIb2M0Vdjutk6QiM9n6tFHIXUtS4v1k05q6iwlgtNw-wwy4STPZYqKeNwf7j5Kt9-QRBt50egejlBR0uJ3TK2-Kvv7etD3fp1v2iv7iQxbVAK_4W-2nc4m6i4gA-1DXmkQ6KZFUnmaHD7yYGiDjzSC_Q0sO17Sa3NiadFL2hZsSmSWmY5dREKLhyGij0SYZ8GE_81Qm7dJFaZcfVuN_VdriVWB7bWR3XLbj_eH4IhK8QswCtca_B5nGwHQjO8',
    status: 'failed',
    targetCount: 5,
    currentCount: 2,
    endTime: new Date(Date.now() - 172800000).toISOString(),
    leaderAvatar: '',
    participants: [],
    price: 299,
    originalPrice: 399,
    failReason: '人数未达标'
  }
];
