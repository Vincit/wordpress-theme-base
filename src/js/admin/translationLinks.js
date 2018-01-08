import { el } from 'redom';

export default function translationLinks() {
  const manageTranslationsNav = document.querySelector('#string-translation .tablenav.bottom');
  const manageLink = document.querySelector('#vincit-manage-translations');

  console.log(manageTranslationsNav);

  if (manageTranslationsNav) {
    manageTranslationsNav.insertBefore(
      el('a', {
        href: '/wp-admin/admin.php?page=acf-options-translatable-strings',
        style: { display: 'inline-block', marginTop: '10px' },
      }, 'Add new translatable strings'),
      manageTranslationsNav.children[manageTranslationsNav.children.length - 1]
    );
  }

  if (manageLink) {
    manageLink.href = '/wp-admin/admin.php?page=mlang_strings';
  }
}
