module.exports = {
	head: {
		title: 'nuxt-quill-demo',
		meta: [
            {charset: 'utf-8'},
            {name: 'renderer',content: 'webkit'},
            {'http-equiv': 'X-UA-Compatible',content: 'IE=edge,chrome=1'},
            {hid: 'keywords',name: 'keywords',content: 'vue,nuxt,quill,editor'},
			{hid: 'description',name: 'description',content: 'a nuxt-quill-demo'}
		],
	},
	loading: {
		color: '#3468A3'
    },
	build: {
		extend(config, {isDev,isClient}) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
            }
            if(isClient){
                config.entry['polyfill'] = ['babel-polyfill']
            }
		},
		vendor: [
			'axios',
            '~/plugins/element-ui',
            '~/plugins/nuxt-quill-plugin.js'
        ],
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
        extractCSS: {
            allChunks: true
        }
	},
	plugins: [
        { src: '~/plugins/element-ui', ssr: true },
        { src: '~/plugins/nuxt-quill-plugin.js', ssr: false }
    ],
	css: [
        {src: '~assets/scss/reset.scss',lang: 'scss'},
        'quill/dist/quill.snow.css',
        'quill/dist/quill.bubble.css',
        'quill/dist/quill.core.css'
    ]
}
