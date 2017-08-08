export const navItems = [
    {
        exact: true,
        id: "home",
        label: "Home",
        icon: "home",
        to: "/"
    }, {
        id: "users",
        label: "Пользователи",
        icon: "supervisor_account",
        children: [
            {
                id: "users-list",
                to: "/users-list",
                label: "Учётные записи"
            }, {
                id: "user-edit2",
                to: "/page-1",
                label: "Права доступа"

            }, {
                id: "user-edit3",
                to: '/page-2',
                label: "Список групп"

            }, {
                id: "user-edit4",
                to: "/page-3",
                label: "Список привелегий"
            }
        ]
    }, {
        id: "data",
        label: "Данные",
        icon: "equalizer",
        children: [
            {
                id: "d1",
                to: "/d1",
                label: "Загрузка данных"
            }, {
                id: "d2",
                to: "/d2",
                label: "Загрузить конфигурации"
            }, {
                id: "d3",
                to: "/d3",
                label: "Типы источников"

            }, {
                id: "d4",
                to: "/d4",
                label: "Коннекторы к БД"

            }, {
                id: "d5",
                to: "/d5",
                label: "Источники данных"
            }, {
                id: "d6",
                to: "/d6",
                label: "Типы данных"
            }
        ]
    }, {
        id: "test",
        to: "/page-4",
        label: "Test",

    }
];
export default navItems;