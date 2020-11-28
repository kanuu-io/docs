var emoji = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/canoe_1f6f6.png'

module.exports = {
    title: 'Kanuu documentation',
    description: 'Documentation for kanuu.io',
    head: [
        ['link', { rel: 'icon', href: emoji }],
    ],
    themeConfig: {
        logo: emoji,
        lastUpdated: 'Last Updated',
        docsRepo: 'kanuu-io/docs',
        editLinks: true,
        editLinkText: 'Edit this page',
        nav: [
            { text: 'Documentation', link: '/' },
        ],
        sidebar: [
            {
                title: 'Getting Started',
                collapsable: false,
                children: [
                    ['/', 'Introduction'],
                    //
                ],
            },
            {
                title: 'Laravel',
                collapsable: false,
                children: [
                    //
                ],
            },
        ],
    },
    domain: 'https://docs.kanuu.io/',
    plugins: {
        'seo': {
            type: _ => 'website',
            description: (_, $site) => $site.description,
            // image: (_, $site) => $site.domain + 'hero.png',
        }
    },
}