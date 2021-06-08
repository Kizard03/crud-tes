const menus = {
    landing: [ 
        {
        title: 'beranda',
        name: 'index',
        path: '/'
    },
    {
        title: 'login',
        name: 'login',
        path: '/login'
    },
    {
        title: 'register',
        name: 'register',
        path: '/register'
    }
],
    user: [
        {
            title: 'anggota',
            name: 'anggota',
            path: '/anggota'
        },
        {
            title: 'anggotaedit',
            name: 'anggotaedit',
            path: '/anggota/edit'
        },
        {
            title: 'barang',
            name: 'barang',
            path: '/barang'
        },
        {
            title: 'quotes',
            name: 'quotes',
            path: '/quotes'
        },
        {
            title: 'quotes-show',
            name: 'quotes-show',
            path: '/quotes/:quote'
        }
    ],
    admin: [
        {
            title: 'databarang',
            name: 'databarang',
            path: '/databarang'
        },
        {
            title: 'barangupdate',
            name: 'barangupdate',
            path: '/barang/update'
        },
        {
            title: 'barangcreate',
            name: 'barangcreate',
            path: '/barang/create'
        }
    ]
}

export default menus;