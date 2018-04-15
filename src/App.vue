<script>
	import { wxRequest } from './api'

	export default {

		created() {
			
		},
		methods: {
			navGo(e) {
				wx.navigateTo({
					url: e
				})
			},
			getstorage(key) {
				wx.getStorage({
					key: key,
					success: function(res) {
						return res
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	html {
		height 100%
	}
</style>