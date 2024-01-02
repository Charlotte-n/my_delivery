export const formate_img_2 = (path: string) => {
    let suffix
    if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
    }
    if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
    } else {
        suffix = '.png'
    }
    let url =
        '/' +
        path.substr(0, 1) +
        '/' +
        path.substr(1, 2) +
        '/' +
        path.substr(3) +
        suffix
    return 'https://fuss10.elemecdn.com' + url
}
export const formate_img = (url: string) => {
    return 'https://elm.cangdu.org/img/' + url
}
