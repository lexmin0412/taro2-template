import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import Tabbar from '~/components/Tabbar/Tabbar'
import './index.scss'

/**
 * 页面props
 */
type PageStateProps = {
	counter: any
}

/**
 * 页面state
 */
type PageState = {}

interface UserIndex {
	props: PageStateProps
	state: PageState
}

@inject('counter')
@observer
class UserIndex extends Component {
	config: Config = {
		navigationBarTitleText: '我的',
	}

	componentDidMount() {}

	render() {
		return (
			<View className='index'>
				user index page
				<Tabbar />
			</View>
		)
	}
}

export default UserIndex as ComponentType
