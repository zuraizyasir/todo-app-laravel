import { mount } from '@vue/test-utils';
import TodoForm from '../../resources/js/components/TodoForm.vue';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('TodoForm.vue', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = mount(TodoForm, {
            global: {
                mocks: {
                    $axios: axios,
                    $route: { name: 'todo.create', params: {} },
                },
            },
        });
        await wrapper.vm.$nextTick();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders create form', () => {
        expect(wrapper.find('h1').text()).toBe('Create Todo');
        expect(wrapper.find('input[placeholder="Enter a clear and concise title for your task"]').exists()).toBe(true);
    });

    it('submits new todo', async () => {
        axios.post.mockResolvedValue({});
        wrapper.vm.form = { title: 'Test Todo', status: 'pending', due_date: '2025-09-15' };
        const push = vi.spyOn(wrapper.vm.$router, 'push');
        await wrapper.find('form').trigger('submit.prevent');
        expect(axios.post).toHaveBeenCalledWith('/todos', wrapper.vm.form);
        expect(push).toHaveBeenCalledWith({ name: 'dashboard' });
    });

    it('shows error on submit failure', async () => {
        axios.post.mockRejectedValue({ response: { data: { message: 'Invalid data' } } });
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Invalid data');
    });
});