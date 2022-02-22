import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './hooks.scss'

const Index = () => <View className='index'>hooks</View>

Index.config = {
	navigationBarTitleText: 'hooks',
} as Config

export default observer(Index)
