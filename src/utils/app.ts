export const getNavigatorType = () => {
    let temp = ''
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        temp = 'Android'
    } else {
        temp = 'ios'
    }
    return temp
}
