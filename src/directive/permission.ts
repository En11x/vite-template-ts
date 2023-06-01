import { Directive, DirectiveBinding } from 'vue';

export const hasPermission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const roles = 'admin';
    const permissions = ['user:add'];
    if (roles.includes('superadmin')) {
      return true;
    }

    const { value } = binding;
    if (!value) {
      throw new Error('no permission code');
    }

    const hasPermission = permissions.some((perm) => value.includes(perm));

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
