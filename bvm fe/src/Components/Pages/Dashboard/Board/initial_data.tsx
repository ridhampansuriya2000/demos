const initData : any = {
    list: {
        "list_1": {
            id: "list_1",
            title: "To Start",
            taskList: []
        },
        "list_2": {
            id: "list_2",
            title: "In Progress",
            taskList: ["task_5", "task_3", "task_2"]
        },
        "list_3": {
            id: "list_3",
            title: "Done",
            taskList: ["task_4"]
        },
        "list_4": {
            id: "list_4",
            title: "Tomorrow",
            taskList: ["task_1"]
        },
    },
    task1: {
        task_1: {
            id: "task_1",
            priority: "Low",
            content: "You agree to our Terms of Service and Privacy Policy.",
            date: 'December 12, 2023',
            done: "100",
            tag: "",
            description: "",
            assignUser: ["user1", "user2"],
            todoList: [],
            doneList: [],
            comments: []
        },
        task_2: {
            id: "task_2",
            priority: "Mid",
            content: "You agree to our Terms of Service and Privacy Policy.",
            date: 'December 12, 2023',
            done: "22",
            tag: "",
            description: "",
            assignUser: ["user1"],
            todoList: [],
            doneList: [],
            comments: []
        },
        task_3: {
            id: "task_3",
            priority: "High",
            content: "You agree to our Terms of Service and Privacy Policy.",
            date: 'December 12, 2023',
            done: "55",
            tag: "",
            description: "",
            assignUser: [],
            todoList: [],
            doneList: [],
            comments: []
        },
        task_4: {
            id: "task_4",
            priority: "Low",
            content: "You agree to our Terms of Service and Privacy Policy.",
            date: 'December 12, 2023',
            done: "74",
            tag: "",
            description: "",
            assignUser: ["user3"],
            todoList: [],
            doneList: [],
            comments: []
        },

        task_5: {
            id: "task_5",
            priority: "High",
            content: "You agree to our Terms of Service and Privacy Policy.",
            date: 'December 12, 2023',
            done: "20",
            tag: "",
            description: "",
            assignUser: ["user1"],
            todoList: [],
            doneList: [],
            comments: []
        }
    },
    boards: {
        board1: {
            title: "My First Board",
            list_order: ["list_1", "list_2", "list_3", "list_4"],
            openFlag: "true"
        },
        board2: {
            title: "My Second Board",
            list_order: ["list_5", "list_6", "list_7"],
            openFlag: "true"
        }
    },
    boardList: ["board1", "board2"]
};

export default initData;
