import BetterScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import PullUp from '@better-scroll/pull-up'
import { useMixStore } from '@/store/mix.ts'

BetterScroll.use(PullDown)
BetterScroll.use(ObserveDOM)
BetterScroll.use(MouseWheel)
BetterScroll.use(PullUp)

export const PullDownMix = (
    element: any,
    pullingDownHandler: () => void,
    pullingUpHandler?: () => any,
) => {
    const MixStore = useMixStore()
    const bs = new BetterScroll(element, {
        click: true,
        //下拉刷新
        pullDownRefresh: {
            stop: 60, //回弹停止的地方
            threshold: 30, //下拉多少距离触发下拉刷新
        },
        mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300,
        },
        //上拉加载
        pullUpLoad: true,
        observeDOM: true,
    })
    // 上拉加载
    if (pullingUpHandler) {
        bs.on('pullingUp', async () => {
            MixStore.changeGetMore()
            await pullingUpHandler()
            MixStore.changeGetMoreFalse()
            setTimeout(() => {
                bs.finishPullUp()
            }, 2000)
        })
    }
    // 下拉刷新事件
    bs.on('pullingDown', async () => {
        MixStore.changePullRefresh()
        await pullingDownHandler()
        MixStore.changePullRefreshFalse()
        console.log(MixStore.pullUpRefresh)
        setTimeout(() => {
            bs.finishPullDown()
        }, 200)
    })
    // 监听开始滚动事件
    // bs.on('beforeScrollStart', () => {
    //     console.log('开始滚动')
    // })
    // // 监听滚动事件，有默认参数
    // bs.on('scroll', (e: any) => {
    //     console.log('滚动中', e)
    // })
    // // 监听滚动结束事件
    // bs.on('scrollEnd', () => {
    //     console.log('滚动结束')
    // })
    //返回bs实例
    return bs
}

//移动端监听返回事件
export const backPhone = (watchReturn: () => void) => {
    // 如果支持 popstate 一般移动端都支持了
    // 往历史记录里面添加一条新的当前页面的url
    history.pushState(null, '', document.URL)
    // 给 popstate 绑定一个方法 监听页面刷新
    window.addEventListener('popstate', watchReturn, false) //false阻止默认事件
}
export const cancelBack = (watchReturn: () => void) => {
    window.removeEventListener('popstate', watchReturn, false) //false阻止默认事件
}
