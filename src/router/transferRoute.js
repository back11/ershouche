export default {
    columnChinese: '过户',
    columnEnglish: 'transfer',
    children: [
        {
            cn:'本省车辆过户到本省',
            en: 'b2b',
            co: () => import('../views/transfer/b2b.vue')
        },
        {
            cn: '本省车辆过户到外省',
            en: 'b2w',
            co: () => import('../views/transfer/b2w.vue')
        },
        {
            cn: '外省车辆过户到本省',
            en: 'w2b',
            co: () => import('../views/transfer/w2b.vue')
        }
    ]
}