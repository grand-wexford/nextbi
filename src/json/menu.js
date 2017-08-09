export const navItems = [
    {
        id: "home",
        exact: true,
        label: "Home",
        icon: "home",
        type: "home",
        path: "/",
    }, {
        id: "users",
        label: "Пользователи",
        icon: "supervisor_account",
        collapsed: false,
        // expanded: true,
        children: [
            {
                id: "users-list",
                type: "users",
                path: "/users/list",
                label: "Учётные записи",
                action: "list",
            }, {
                id: "user-edit2",
                type: "page-1",
                path: "/page-1",
                label: "Права доступа",
                action: "page-1",

            }, {
                id: "user-edit3",
                type: 'page-2',
                path: '/page-2',
                label: "Список групп",
                action: "page-2",

            }, {
                id: "user-edit4",
                type: "page-3",
                path: "/page-3",
                label: "Список привелегий",
                action: "page-3",
            }
        ]
    }, {
        id: "data",
        label: "Данные",
        icon: "equalizer",
        children: [
            {
                id: "d1",
                type: "d1",
                path: "/d1",
                label: "Загрузка данных",
                action: "page-3",
            }, {
                id: "d2",
                type: "/d2",
                path: "/d2",
                label: "Загрузить конфигурации",
                action: "page-3",
            }, {
                id: "d3",
                type: "d3",
                path: "/d3",
                label: "Типы источников",
                action: "page-3",

            }, {
                id: "d4",
                type: "d4",
                path: "/d4",
                label: "Коннекторы к БД",
                action: "page-3",

            }, {
                id: "d5",
                type: "d5",
                path: "/d5",
                label: "Источники данных",
                action: "page-3",
            }, {
                id: "d6",
                type: "d6",
                path: "/d6",
                label: "Типы данных",
                action: "page-3",
            }
        ]
    }, {
        id: "test",
        type: "users",
        path: "/users/edit",
        label: "Test",
        action: "edit",

    }, {
        id: "remote",
        type: "remote",
        module: 'remoteModule1',
        path: "/remote/remoteModule1",
        label: "RemoteComponent 1",
        action: "remote-action",
    }, {
        id: "remote2",
        type: "remote",
        module: 'remoteModule2',
        path: "/remote/remoteModule2",
        label: "RemoteComponent 2",
        action: "remote-action",
    }
];
export default navItems;