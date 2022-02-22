/**
 * 图片预览页面
 */
import Taro, { useState, useEffect, useRouter, Config } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './imgPreview.scss'

export const ImgPreview = () => {
	const [list, setList] = useState<Array<string>>([])
	const [current, setCurrent] = useState<number>(0)
	const { params } = useRouter()

	useEffect(() => {
		document.title = '图片预览'
		const data = JSON.parse(decodeURIComponent(params.data))
		console.log('data', data)
		setList(data.list)
		setCurrent(data.current)
	}, [])

	const handleBackClick = () => {
		Taro.navigateBack()
	}

	const handleSwiperClick = e => {
		setCurrent(e.detail.current)
	}

	return list && list.length > 0 ? (
		<View className='imgPreview-page'>
			<View className='img-preview-header'>
				<View className='back' onClick={this.handleBackClick.bind(this)}>
					返回
				</View>
				<View className='title'>
					{current + 1}/{list.length}
				</View>
				<View className='right-actions'></View>
			</View>
			<Swiper
				className='img-preview-swiper'
				indicatorColor='#999'
				indicatorActiveColor='#333'
				current={current}
				onChange={handleSwiperClick}
			>
				{list &&
					list.map(item => {
						return (
							<SwiperItem className='img-preview-swiper-item' key={item}>
								<Image
									src={item}
									onClick={handleBackClick}
									className='img-preview-ele'
									mode='aspectFit'
								/>
							</SwiperItem>
						)
					})}
			</Swiper>
		</View>
	) : null
}

ImgPreview.config = {
	navigationBarTitleText: '图片预览',
} as Config

export default observer(ImgPreview)
