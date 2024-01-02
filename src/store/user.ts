import { defineStore } from 'pinia'
import { SingleAddress, UserInfo } from '@/apis/types/user.ts'

interface UserInfo_Plus {
    detail_userinfo: UserInfo
    user_id: string | number
}
export const useUserStore = defineStore('User', {
    state: () => ({
        userInfo: {} as UserInfo_Plus | null,
        servicesDetail: '' as string,
        servicesTitle: '' as string,
        address: {},
    }),
    getters: {},
    actions: {
        setUserInfo(userInfo: UserInfo_Plus) {
            this.userInfo = { ...userInfo }
        },
        LogOut() {
            this.userInfo = {} as UserInfo_Plus | null
        },
        changeUserName(value: string) {
            this.userInfo!.detail_userinfo.username = value
        },
        saveServicesDetail(title: string, detail: string) {
            this.servicesDetail = detail
            this.servicesTitle = title
        },
        setAddress(item: SingleAddress) {
            this.address = item
        },
    },
    persist: {
        enabled: true,
    },
})
