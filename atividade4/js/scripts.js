let tasks = [];
        Vue.component('input-todo', {
            template: "#input-todo",
            methods: {
                add($event){
                    let task = {};
                    task.value = $event.target.value;
                    task.checked = false;
                    tasks.push(task);
                }
            }
        });

        Vue.component('table-todo', {
            template: "#table-todo",

            props: ['todos'],
        });

        var app = new Vue({
            el: "#app",
            data: {
                tasks: tasks,
            }
        });