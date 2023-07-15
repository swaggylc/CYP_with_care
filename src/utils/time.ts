// 判断当前时间段的方法
export const getNowTime = () => {
    const now = new Date().getHours();
    if (now >= 6 && now < 9) {
        return '早上好'
    } else if (now >= 9 && now < 12) {
        return '上午好'
    } else if (now >= 12 && now < 14) {
        return '中午好'
    } else if (now >= 14 && now < 18) {
        return '下午好'
    } else if (now >= 18 && now < 24) {
        return '晚上好'
    } else {
        return '凌晨好'
    }
}