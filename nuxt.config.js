module.exports = {
	head: {
		title: 'nuxt-quill-demo',
		meta: [
			{ charset: 'utf-8' },
			{ hid: 'keywords', name: 'keywords', content: 'vue,nuxt,quill,editor' },
			{ hid: 'description', name: 'description', content: 'a nuxt-quill-demo' },
			{ name: 'renderer', content: 'webkit' },
			{ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
		],
	},
	loading: {
		color: '#3468A3'
	},
	build: {
		babel: {
			"plugins": [
				[
					"component",
					{
						"libraryName": "element-ui",
						"styleLibraryName": "theme-chalk"
					}
				]
			],
			"comments": false
		},
		extractCSS: process.env.NODE_ENV === 'production',
	},
	plugins: [
		'~/plugins/element-ui',
		{ src: '~/plugins/nuxt-quill-plugin.js', mode: 'client' }
	],
	render: {
		resourceHints: false
	},
	css: [
		{ src: '~assets/scss/reset.scss', lang: 'scss' },
		'quill/dist/quill.snow.css',
		'quill/dist/quill.bubble.css',
		'quill/dist/quill.core.css'
	],
	server: {
		port: '8887',
		host: '0.0.0.0'
	},
}
