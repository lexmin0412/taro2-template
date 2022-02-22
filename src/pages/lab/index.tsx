import Taro, { Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtNoticebar, AtTag } from 'taro-ui'

import Tabbar from '~/components/Tabbar/Tabbar'
import QQMapWSService from '~/services/qqMap/ws.service'
import LianouService from '~/services/root/drug.service'
import './index.scss'

const LabIndex = () => {
	const handleJSONPTest = async () => {
		const result = await QQMapWSService.geocoder({
			location: `28.2532,112.87887`,
			get_poi: 0,
		})
		console.log('result', result)
	}

	const handleProxyText = async () => {
		const result = await LianouService.queryDiseaseByDrugName({
			ComName: '阿莫西林胶囊',
		})
		console.log('result', result)
	}

	const handleCustomRoute = () => {
		console.error('into handleCustomRoute')
		Taro.switchTab({
			url: '/pages/lab/index',
		})
	}

	const handleCompTest = type => {
		Taro.navigateTo({
			url: `/pages/lab/comp?type=${type}`,
		})
	}

	return (
		<View className='index'>
			<AtNoticebar>taro-ui组件演示：通告栏</AtNoticebar>
			<AtTag size='small'>taro-ui组件演示：标签</AtTag>
			<Button onClick={handleJSONPTest} className='button-jsonp'>
				jsonp 演示
			</Button>
			<Button onClick={handleProxyText}>本地代理 演示</Button>
			<Button onClick={handleCustomRoute}>自定义路由 演示</Button>
			<Button onClick={handleCustomRoute} className='sass-test'>
				sass文件全局注册 演示
			</Button>
			<Button className='iconfont-test iconfont down'>
				iconfont 演示
				<Text>&#xe63d;</Text>
			</Button>
			<Button onClick={() => handleCompTest('image')}>图片组件演示</Button>
			<Button onClick={() => handleCompTest('card')}>卡片组件演示</Button>
			<Button onClick={() => handleCompTest('default')}>缺省组件演示</Button>
			<Button onClick={() => handleCompTest('paging')}>分页组件演示</Button>
			<Button onClick={() => handleCompTest('modal')}>弹窗组件演示</Button>
			<Button onClick={() => handleCompTest('button')}>按钮组件演示</Button>
			<Button onClick={() => handleCompTest('countdown')}>
				倒计时组件演示
			</Button>
			<Button onClick={() => handleCompTest('imgUploader')}>
				图片上传组件演示
			</Button>
			<Button onClick={() => handleCompTest('formValidate')}>
				表单验证演示
			</Button>
			<Button onClick={() => handleCompTest('tabs')}>tab标签页演示</Button>
			<Tabbar />
		</View>
	)
}

LabIndex.config = {
	navigationBarTitleText: '首页',
} as Config

export default observer(LabIndex)
