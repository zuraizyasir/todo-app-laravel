import { mount } from '@vue/test-utils';
import Register from '../../resources/js/components/Register.vue';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('Register.vue', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = mount(Register, {
            global: {
                mocks: {
                    $axios: axios,
                    $route: { name: 'register', params: {} },
                },
            },
        });
        await wrapper.vm.$nextTick();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders register form', () => {
        expect(wrapper.find('h1').text()).toBe('Create Account');
        expect(wrapper.find('input[placeholder="Enter your full name"]').exists()).toBe(true);
        expect(wrapper.find('input[placeholder="Enter your email"]').exists()).toBe(true);
        expect(wrapper.find('input[placeholder="Enter your password"]').exists()).toBe(true);
        expect(wrapper.find('input[placeholder="Confirm your password"]').exists()).toBe(true);
    });

    it('submits register form', async () => {
        axios.post.mockResolvedValue({ data: { token: 'mock-token' } });
        wrapper.vm.form = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
            password_confirmation: 'password',
        };
        const push = vi.spyOn(wrapper.vm.$router, 'push');
        await wrapper.find('form').trigger('submit.prevent');
        expect(axios.post).toHaveBeenCalledWith('/register', wrapper.vm.form);
        expect(localStorage.getItem('token')).toBe('mock-token');
        expect(push).toHaveBeenCalledWith({ name: 'dashboard' });
    });

    it('shows error on register failure', async () => {
        axios.post.mockRejectedValue({ response: { data: { message: 'Registration failed' } } });
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Registration failed');
    });

    it('toggles password visibility', async () => {
        const passwordInput = wrapper.find('input#password');
        expect(passwordInput.attributes('type')).toBe('password');
        await wrapper.findAll('button.absolute.right-3')[0].trigger('click');
        expect(wrapper.vm.showPassword).toBe(true);
        expect(passwordInput.attributes('type')).toBe('text');
    });

    it('toggles confirm password visibility', async () => {
        const confirmInput = wrapper.find('input#password_confirmation');
        expect(confirmInput.attributes('type')).toBe('password');
        await wrapper.findAll('button.absolute.right-3')[1].trigger('click');
        expect(wrapper.vm.showConfirmPassword).toBe(true);
        expect(confirmInput.attributes('type')).toBe('text');
    });
});