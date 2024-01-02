const listenBottom = (
    isShow: any,
    getShoppingRestaurantApi: () => void,
    container?: any,
) => {
    return (): any => {
        const scrollTop =
            container?.scrollTop ||
            document.documentElement.scrollTop ||
            document.body.scrollTop
        const clientHeight =
            container?.clientHeight || document.documentElement.clientHeight
        const scrollHeight =
            container?.scrollHeight || document.documentElement.scrollHeight
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            if (!isShow.value) {
                //没数据就触发请求
                getShoppingRestaurantApi()
            }
            return
        }
    }
}
export default listenBottom
