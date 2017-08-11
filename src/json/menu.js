export const navItems = [
    {
        id: "home",
        label: "Home",
        icon: "home",
        component: "Home",
    }, {
        id: "users",
        label: "Пользователи",
        icon: "supervisor_account",
        collapsed: false,
        children: [
            {
                id: "users-list",
                label: "Учётные записи",
                component: "UsersList",
                action: "list",
            }, {
                id: "user-edit2",
                component: "Page1",
                label: "Права доступа",
                action: "page-1",

            }, {
                id: "user-edit3",
                component: "Page2",
                label: "Список групп",
                action: "page-2",

            }, {
                id: "user-edit4",
                component: "Page3",
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
                component: "Page3",
                label: "Загрузка данных",
                action: "page-3",
            }, {
                id: "d2",
                component: "Page3",
                label: "Загрузить конфигурации",
                action: "page-3",
            }, {
                id: "d3",
                component: "Page3",
                label: "Типы источников",
                action: "page-3",

            }, {
                id: "d4",
                component: "Page3",
                label: "Коннекторы к БД",
                action: "page-3",

            }, {
                id: "d5",
                component: "Page3",
                label: "Источники данных",
                action: "page-3",
            }, {
                id: "d6",
                component: "Page3",
                label: "Типы данных",
                action: "page-3",
            }
        ]
    }, {
        id: "test",
        component: "UserEdit",
        label: "Test",
        action: "edit",

    }, {
        id: "remote",
        component: 'remoteModule1',
        label: "RemoteComponent 1",
        action: "remote-action",
    }, {
        id: "remote2",
        component: 'remoteModule2',
        label: "RemoteComponent 2",
        action: "remote-action",
    }
];
export default navItems;