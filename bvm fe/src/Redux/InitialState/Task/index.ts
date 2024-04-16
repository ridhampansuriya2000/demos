interface Itask {
    id: string;
    priority: "Low" | "Mid" | "High" | "Critical";
    content: string;
    createDate: string;
    done: string;
    tag: string;
    description: string;
}

const task = () => ({

    task_1: {
        id: "task_1",
            priority: "Low",
            content: "You agree to our Terms of Service and Privacy Policy.",
            createDate: 'December 12, 2023',
            type : 'Front-End'
    },
    task_2: {
        id: "task_2",
            priority: "Mid",
            content: "You agree to our Terms of Service and Privacy Policy.",
            createDate: 'December 12, 2023',
            type : 'Front-End'
    },
    task_3: {
        id: "task_3",
            priority: "High",
            content: "You agree to our Terms of Service and Privacy Policy.",
            createDate: 'December 12, 2023',
            type : 'Front-End'
    },
    task_4: {
        id: "task_4",
            priority: "Low",
            content: "You agree to our Terms of Service and Privacy Policy.",
            createDate: 'December 12, 2023',
            type : 'Front-End'
    },

    task_5: {
        id: "task_5",
            priority: "High",
            content: "You agree to our Terms of Service and Privacy Policy.",
            createDate: 'December 12, 2023',
            type : 'Front-End'
    }
});

export {task};
export type { Itask };
