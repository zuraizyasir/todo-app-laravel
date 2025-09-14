import { mount } from '@vue/test-utils';
import Dashboard from '../../resources/js/components/Dashboard.vue';
import TodoList from '../../resources/js/components/TodoList.vue';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('Dashboard.vue', () => {
    let wrapper;

    beforeEach(async () => {
        axios.get.mockResolvedValue({
            data: {
                data: [
                    { id: 1, title: 'Test Todo', status: 'pending', due_date: '2025-09-15' },
                ],
                meta: { current_page: 1, last_page: 1, total: 1 },
            },
        });
        wrapper = mount(Dashboard, {
            global: {
                mocks: { $axios: axios },
            },
        });
        await wrapper.vm.$nextTick();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders todos', () => {
        expect(wrapper.findComponent(TodoList).exists()).toBe(true);
        expect(wrapper.text()).toContain('Test Todo');
    });

    it('fetches todos with filters', async () => {
        wrapper.vm.filters.status = 'pending';
        wrapper.vm.filters.due_date = '2025-09-15';
        await wrapper.vm.fetchTodos();
        expect(axios.get).toHaveBeenCalledWith('/todos', {
            params: { page: 1, status: 'pending', due_date: '2025-09-15' },
        });
    });

    it('shows empty state', async () => {
        axios.get.mockResolvedValue({ data: { data: [], meta: { total: 0 } } });
        await wrapper.vm.fetchTodos();
        expect(wrapper.text()).toContain('No Todos Yet');
    });

    it('triggers logout', async () => {
        let resolveAxios;
        axios.post.mockReturnValue(new Promise(resolve => (resolveAxios = resolve)));
        const push = vi.spyOn(wrapper.vm.$router, 'push');
        await wrapper.find('button.bg-gradient-to-r.from-red-500').trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isLoggingOut).toBe(true);
        expect(wrapper.text()).toContain('Logging out...');
        expect(axios.post).toHaveBeenCalledWith('/logout');
        resolveAxios({});
        await wrapper.vm.$nextTick();
        expect(push).toHaveBeenCalledWith({ name: 'login' });
        expect(wrapper.vm.isLoggingOut).toBe(false);
    });
});