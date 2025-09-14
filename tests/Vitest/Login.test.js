import { mount } from '@vue/test-utils';
import Login from '../../resources/js/components/Login.vue';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('Login.vue', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = mount(Login, {
            global: {
                mocks: {
                    $axios: axios,
                    $route: { name: 'login', params: {} },
                },
            },
        });
        await wrapper.vm.$nextTick();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders login form', () => {
        expect(wrapper.find('h1').text()).toBe('Welcome Back');
        expect(wrapper.find('input[placeholder="Enter your email"]').exists()).toBe(true);
        expect(wrapper.find('input[placeholder="Enter your password"]').exists()).toBe(true);
    });

    it('submits login form', async () => {
        axios.post.mockResolvedValue({ data: { token: 'mock-token' } });
        wrapper.vm.form = { email: 'test@example.com', password: 'password' };
        const push = vi.spyOn(wrapper.vm.$router, 'push');
        await wrapper.find('form').trigger('submit.prevent');
        expect(axios.post).toHaveBeenCalledWith('/login', wrapper.vm.form);
        expect(localStorage.getItem('token')).toBe('mock-token');
        expect(push).toHaveBeenCalledWith({ name: 'dashboard' });
    });

    it('shows error on login failure', async () => {
        axios.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Invalid credentials');
    });

    it('toggles password visibility', async () => {
        const passwordInput = wrapper.find('input#password');
        expect(passwordInput.attributes('type')).toBe('password');
        await wrapper.find('button.absolute.right-3').trigger('click');
        expect(wrapper.vm.showPassword).toBe(true);
        expect(passwordInput.attributes('type')).toBe('text');
    });
});