import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import Tabbar from '~/components/Tabbar/Tabbar'
import './index.scss'

export const UserIndex = () => {
	return (
		<View className='index'>
			user index page
			<Tabbar />
		</View>
	)
}

UserIndex.config = {
	navigationBarTitleText: '我的',
} as Config

export default observer(UserIndex)
